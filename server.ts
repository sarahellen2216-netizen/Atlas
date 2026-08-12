import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { authRoutes } from "./modules/auth/auth.routes";
import { productRoutes } from "./modules/products/product.routes";
import { clientRoutes } from "./modules/clients/client.routes";
import { supplierRoutes } from "./modules/suppliers/supplier.routes";
import { employeeRoutes } from "./modules/employees/employee.routes";
import { financeRoutes } from "./modules/finance/finance.routes";
import { saleRoutes } from "./modules/sales/sale.routes";
import { qualityRoutes } from "./modules/quality/quality.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { reportRoutes } from "./modules/reports/report.routes";

const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Atlas Gestão API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/quality", qualityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Atlas API rodando em http://localhost:${env.port}`);
});
