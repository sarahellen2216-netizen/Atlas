import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AppLayout } from "./layouts/AppLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Clients } from "./pages/Clients";
import { Suppliers } from "./pages/Suppliers";
import { Finance } from "./pages/Finance";
import { Sales } from "./pages/Sales";
import { Employees } from "./pages/Employees";
import { Quality } from "./pages/Quality";
import { Reports } from "./pages/Reports";

export default function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/quality" element={<Quality />} />
      <Route path="/reports" element={<Reports />} />
    </Route>
  </Routes></BrowserRouter></AuthProvider>;
}
