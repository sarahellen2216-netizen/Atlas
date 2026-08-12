import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, Truck, WalletCards, ShoppingCart,
  UserRoundCog, ShieldCheck, FileText, LogOut, Menu
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import "../styles/global.css";

const items = [
  ["/", "Dashboard", LayoutDashboard],
  ["/products", "Produtos", Package],
  ["/clients", "Clientes", Users],
  ["/suppliers", "Fornecedores", Truck],
  ["/finance", "Financeiro", WalletCards],
  ["/sales", "Vendas", ShoppingCart],
  ["/employees", "Equipe", UserRoundCog],
  ["/quality", "Qualidade", ShieldCheck],
  ["/reports", "Relatórios", FileText]
] as const;

export function AppLayout() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function exit() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "" : "collapsed"}`}>
        <div className="brand">
          <div className="brand-mark">A</div>
          {open && <div><strong>Atlas Gestão</strong><small>Gestão inteligente</small></div>}
        </div>
        <nav>
          {items.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} className="nav-item">
              <Icon size={19} />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
        <button className="logout" onClick={exit}><LogOut size={18}/>{open && "Sair"}</button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-button" onClick={() => setOpen(v => !v)}><Menu size={21}/></button>
          <div className="user-area">
            <span>{user?.name}</span>
            <small>{user?.role}</small>
          </div>
        </header>
        <section className="content"><Outlet /></section>
      </main>
    </div>
  );
}
