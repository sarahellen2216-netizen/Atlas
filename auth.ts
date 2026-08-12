import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type AuthRequest = Request & {
  user?: { id: number; role: "ADMIN" | "MANAGER" | "EMPLOYEE" };
};

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Token não informado." });

  try {
    const payload = jwt.verify(token, env.jwtSecret) as {
      id: number;
      role: "ADMIN" | "MANAGER" | "EMPLOYEE";
    };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

export function allow(...roles: Array<"ADMIN" | "MANAGER" | "EMPLOYEE">) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Sem permissão." });
    }
    next();
  };
}
