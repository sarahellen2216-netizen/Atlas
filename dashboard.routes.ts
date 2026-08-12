import { Router } from "express";
import { prisma } from "../../database/prisma";
import { auth } from "../../middleware/auth";

export const dashboardRoutes = Router();
dashboardRoutes.use(auth);

dashboardRoutes.get("/", async (_req, res) => {
  const [products, clients, suppliers, employees, sales, finance, inspections] =
    await Promise.all([
      prisma.product.count(),
      prisma.client.count(),
      prisma.supplier.count(),
      prisma.employee.count(),
      prisma.sale.findMany({ where: { status: "COMPLETED" }, select: { total: true } }),
      prisma.financial.findMany({ select: { type: true, amount: true } }),
      prisma.inspection.findMany({ select: { result: true } })
    ]);

  const revenue = sales.reduce((sum, s) => sum + Number(s.total), 0);
  const income = finance.filter(x => x.type === "INCOME").reduce((s, x) => s + Number(x.amount), 0);
  const expense = finance.filter(x => x.type === "EXPENSE").reduce((s, x) => s + Number(x.amount), 0);

  res.json({
    products, clients, suppliers, employees,
    salesToday: sales.length,
    revenue,
    income,
    expense,
    profit: income - expense,
    nonConformities: inspections.filter(i => i.result === "NON_CONFORMING").length
  });
});
