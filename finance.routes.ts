import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth } from "../../middleware/auth";

export const financeRoutes = Router();
financeRoutes.use(auth);

const schema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().datetime().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional()
});

financeRoutes.get("/", async (_req, res) => {
  res.json(await prisma.financial.findMany({ orderBy: { date: "desc" } }));
});

financeRoutes.post("/", async (req: any, res) => {
  const data = schema.parse(req.body);
  res.status(201).json(await prisma.financial.create({
    data: { ...data, date: data.date ? new Date(data.date) : new Date(), userId: req.user.id }
  }));
});

financeRoutes.delete("/:id", async (req, res) => {
  await prisma.financial.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});
