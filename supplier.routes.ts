import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth, allow } from "../../middleware/auth";

export const supplierRoutes = Router();
supplierRoutes.use(auth);

const schema = z.object({
  company: z.string().min(1),
  contact: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional()
});

supplierRoutes.get("/", async (_req, res) => res.json(await prisma.supplier.findMany({ include: { products: true }, orderBy: { id: "desc" } })));
supplierRoutes.post("/", allow("ADMIN", "MANAGER"), async (req, res) => res.status(201).json(await prisma.supplier.create({ data: schema.parse(req.body) })));
supplierRoutes.put("/:id", allow("ADMIN", "MANAGER"), async (req, res) => res.json(await prisma.supplier.update({ where: { id: +req.params.id }, data: schema.partial().parse(req.body) })));
supplierRoutes.delete("/:id", allow("ADMIN"), async (req, res) => {
  await prisma.supplier.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});
