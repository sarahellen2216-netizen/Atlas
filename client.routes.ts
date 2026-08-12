import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth, allow } from "../../middleware/auth";

export const clientRoutes = Router();
clientRoutes.use(auth);

const schema = z.object({
  name: z.string().min(1),
  cpfCnpj: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  notes: z.string().optional()
});

clientRoutes.get("/", async (_req, res) => res.json(await prisma.client.findMany({ orderBy: { id: "desc" } })));
clientRoutes.post("/", async (req, res) => res.status(201).json(await prisma.client.create({ data: schema.parse(req.body) })));
clientRoutes.put("/:id", async (req, res) => res.json(await prisma.client.update({ where: { id: +req.params.id }, data: schema.partial().parse(req.body) })));
clientRoutes.delete("/:id", allow("ADMIN", "MANAGER"), async (req, res) => {
  await prisma.client.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});
