import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 3333),
  jwtSecret: process.env.JWT_SECRET ?? "development-secret",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
};
