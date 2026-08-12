import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth } from "../../middleware/auth";

export const qualityRoutes = Router();
qualityRoutes.use(auth);

const schema = z.object({
  productId: z.number().int(),
  lot: z.string().optional(),
  date: z.string().datetime().optional(),
  result: z.enum(["CONFORMING", "NON_CONFORMING"]),
  description: z.string().optional(),
  correctiveAction: z.string().optional()
});

qualityRoutes.get("/", async (_req, res) => {
  res.json(await prisma.inspection.findMany({
    include: { product: true, responsible: true },
    orderBy: { date: "desc" }
  }));
});

qualityRoutes.post("/", async (req: any, res) => {
  const data = schema.parse(req.body);
  res.status(201).json(await prisma.inspection.create({
    data: { ...data, date: data.date ? new Date(data.date) : new Date(), responsibleId: req.user.id }
  }));
});

qualityRoutes.put("/:id", async (req, res) => {
  res.json(await prisma.inspection.update({
    where: { id: +req.params.id },
    data: schema.partial().parse(req.body)
  }));
});
