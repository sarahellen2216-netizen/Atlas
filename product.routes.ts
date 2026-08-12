import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth, allow } from "../../middleware/auth";

export const productRoutes = Router();
productRoutes.use(auth);

const schema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  stock: z.number().int().nonnegative().default(0),
  minimumStock: z.number().int().nonnegative().default(0),
  purchasePrice: z.number().nonnegative(),
  salePrice: z.number().nonnegative(),
  supplierId: z.number().int().optional(),
  image: z.string().optional()
});

productRoutes.get("/", async (_req, res) => {
  res.json(await prisma.product.findMany({ include: { supplier: true }, orderBy: { id: "desc" } }));
});

productRoutes.post("/", allow("ADMIN", "MANAGER"), async (req, res) => {
  const data = schema.parse(req.body);
  res.status(201).json(await prisma.product.create({ data }));
});

productRoutes.put("/:id", allow("ADMIN", "MANAGER"), async (req, res) => {
  const data = schema.partial().parse(req.body);
  res.json(await prisma.product.update({ where: { id: Number(req.params.id) }, data }));
});

productRoutes.delete("/:id", allow("ADMIN"), async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});
