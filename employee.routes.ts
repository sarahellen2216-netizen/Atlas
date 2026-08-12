import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { auth, allow } from "../../middleware/auth";

export const employeeRoutes = Router();
employeeRoutes.use(auth);

const schema = z.object({
  name: z.string().min(1),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  position: z.string().optional(),
  department: z.string().optional(),
  salary: z.number().nonnegative().optional(),
  admissionDate: z.string().datetime().optional()
});

employeeRoutes.get("/", async (_req, res) => res.json(await prisma.employee.findMany({ orderBy: { id: "desc" } })));
employeeRoutes.post("/", allow("ADMIN", "MANAGER"), async (req, res) => res.status(201).json(await prisma.employee.create({ data: schema.parse(req.body) })));
employeeRoutes.put("/:id", allow("ADMIN", "MANAGER"), async (req, res) => res.json(await prisma.employee.update({ where: { id: +req.params.id }, data: schema.partial().parse(req.body) })));
employeeRoutes.delete("/:id", allow("ADMIN"), async (req, res) => {
  await prisma.employee.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});
