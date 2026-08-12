import { useState } from "react";
import { api } from "../services/api";

export function Reports() {
  const [report, setReport] = useState<any>(null);
  async function generate() {
    const { data } = await api.get("/reports/summary");
    setReport(data);
  }
  return <>
    <div className="page-title"><div><h1>Relatórios</h1><p>Resumo consolidado dos módulos.</p></div></div>
    <div className="panel"><button className="primary" onClick={generate}>Gerar relatório</button></div>
    {report && <div className="metrics">
      <div className="metric-card"><span>Produtos</span><strong>{report.products.length}</strong></div>
      <div className="metric-card"><span>Clientes</span><strong>{report.clients.length}</strong></div>
      <div className="metric-card"><span>Fornecedores</span><strong>{report.suppliers.length}</strong></div>
      <div className="metric-card"><span>Vendas</span><strong>{report.sales.length}</strong></div>
      <div className="metric-card"><span>Financeiro</span><strong>{report.finance.length}</strong></div>
      <div className="metric-card"><span>Inspeções</span><strong>{report.inspections.length}</strong></div>
    </div>}
  </>;
}
