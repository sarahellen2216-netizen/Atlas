import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { env } from "../../config/env";

export const authRoutes = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]).default("EMPLOYEE")
});

authRoutes.post("/register", async (req, res) => {
  const data = registerSchema.parse(req.body);
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) return res.status(409).json({ message: "E-mail já cadastrado." });

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, passwordHash, role: data.role }
  });

  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

authRoutes.post("/login", async (req, res) => {
  const data = z.object({
    email: z.string().email(),
    password: z.string()
  }).parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || user.status !== "ACTIVE") {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Credenciais inválidas." });

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "8h" });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});
