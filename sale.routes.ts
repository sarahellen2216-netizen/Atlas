import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth, allow } from "../../middleware/auth";

export const saleRoutes = Router();
saleRoutes.use(auth);

const itemSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().positive()
});

const saleSchema = z.object({
  clientId: z.number().int().optional(),
  discount: z.number().nonnegative().default(0),
  tax: z.number().nonnegative().default(0),
  paymentMethod: z.string().min(1),
  items: z.array(itemSchema).min(1)
});

saleRoutes.get("/", async (_req, res) => {
  res.json(await prisma.sale.findMany({
    include: { client: true, seller: true, items: { include: { product: true } } },
    orderBy: { date: "desc" }
  }));
});

saleRoutes.post("/", async (req: any, res) => {
  const data = saleSchema.parse(req.body);

  const result = await prisma.$transaction(async (tx) => {
    let subtotal = 0;
    const prepared = [];

    for (const item of data.items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Produto ${item.productId} não encontrado.`);
      if (product.stock < item.quantity) throw new Error(`Estoque insuficiente para ${product.name}.`);

      subtotal += Number(product.salePrice) * item.quantity;
      prepared.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.salePrice
      });
    }

    const total = subtotal - data.discount + data.tax;

    const sale = await tx.sale.create({
      data: {
        clientId: data.clientId,
        sellerId: req.user.id,
        discount: data.discount,
        tax: data.tax,
        total,
        paymentMethod: data.paymentMethod,
        items: { create: prepared }
      },
      include: { items: true }
    });

    for (const item of data.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    await tx.financial.create({
      data: {
        type: "INCOME",
        category: "Vendas",
        description: `Venda #${sale.id}`,
        amount: total,
        userId: req.user.id
      }
    });

    return sale;
  });

  res.status(201).json(result);
});

saleRoutes.patch("/:id/cancel", allow("ADMIN", "MANAGER"), async (req, res) => {
  const id = +req.params.id;
  const result = await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id }, include: { items: true } });
    if (!sale) throw new Error("Venda não encontrada.");
    if (sale.status === "CANCELED") return sale;

    for (const item of sale.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } }
      });
    }

    return tx.sale.update({ where: { id }, data: { status: "CANCELED" } });
  });

  res.json(result);
});
