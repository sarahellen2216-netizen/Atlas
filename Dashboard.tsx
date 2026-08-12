import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MetricCard } from "../components/MetricCard";

type DashboardData = {
  products:number; clients:number; suppliers:number; employees:number;
  salesToday:number; revenue:number; income:number; expense:number;
  profit:number; nonConformities:number;
};

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => { api.get("/dashboard").then(r => setData(r.data)); }, []);

  if (!data) return <p>Carregando dashboard...</p>;

  const money = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
      <div className="page-title"><div><h1>Dashboard</h1><p>Resumo geral da empresa.</p></div></div>
      <div className="metrics">
        <MetricCard label="Receita" value={money(data.revenue)} />
        <MetricCard label="Lucro" value={money(data.profit)} />
        <MetricCard label="Produtos" value={data.products} />
        <MetricCard label="Estoque / vendas" value={`${data.products} / ${data.salesToday}`} />
        <MetricCard label="Clientes" value={data.clients} />
        <MetricCard label="Fornecedores" value={data.suppliers} />
        <MetricCard label="Funcionários" value={data.employees} />
        <MetricCard label="Não conformidades" value={data.nonConformities} />
      </div>
      <div className="dashboard-grid">
        <div className="panel"><h2>Financeiro</h2><p>Receitas: <b>{money(data.income)}</b></p><p>Despesas: <b>{money(data.expense)}</b></p><p>Saldo: <b>{money(data.profit)}</b></p></div>
        <div className="panel"><h2>Ações rápidas</h2><div className="quick-actions">
          <a href="/products">Novo produto</a><a href="/clients">Novo cliente</a><a href="/sales">Nova venda</a><a href="/finance">Nova movimentação</a>
        </div></div>
      </div>
    </>
  );
}
