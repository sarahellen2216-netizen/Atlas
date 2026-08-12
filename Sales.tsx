import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Sales() {
  const [products, setProducts] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [clientId, setClientId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PIX");

  async function load() {
    const [p,c,s] = await Promise.all([api.get("/products"), api.get("/clients"), api.get("/sales")]);
    setProducts(p.data); setClients(c.data); setRows(s.data);
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!productId) return;
    await api.post("/sales", {
      clientId: clientId ? Number(clientId) : undefined,
      paymentMethod,
      items: [{ productId: Number(productId), quantity: Number(quantity) }]
    });
    setProductId(""); setQuantity(1); load();
  }

  return <>
    <div className="page-title"><div><h1>Vendas</h1><p>Registre vendas e atualize o estoque automaticamente.</p></div></div>
    <div className="panel"><form className="form-grid" onSubmit={submit}>
      <label>Cliente<select value={clientId} onChange={e=>setClientId(e.target.value)}><option value="">Consumidor</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label>Produto<select value={productId} onChange={e=>setProductId(e.target.value)} required><option value="">Selecione</option>{products.map(p=><option key={p.id} value={p.id}>{p.name} — estoque {p.stock}</option>)}</select></label>
      <label>Quantidade<input type="number" min="1" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}/></label>
      <label>Pagamento<select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}><option>PIX</option><option>Cartão</option><option>Dinheiro</option><option>Boleto</option></select></label>
      <button className="primary">Registrar venda</button>
    </form></div>
    <div className="panel table-wrap"><table><thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Pagamento</th><th>Status</th><th>Data</th></tr></thead><tbody>
      {rows.map(r=><tr key={r.id}><td>#{r.id}</td><td>{r.client?.name ?? "Consumidor"}</td><td>R$ {Number(r.total).toFixed(2)}</td><td>{r.paymentMethod}</td><td>{r.status}</td><td>{new Date(r.date).toLocaleDateString("pt-BR")}</td></tr>)}
    </tbody></table></div>
  </>;
}
