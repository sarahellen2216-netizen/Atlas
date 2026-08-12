import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Quality() {
  const [products, setProducts] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState({ productId:"", lot:"", result:"CONFORMING", description:"", correctiveAction:"" });

  async function load() {
    const [p, q] = await Promise.all([api.get("/products"), api.get("/quality")]);
    setProducts(p.data); setRows(q.data);
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await api.post("/quality", {...form, productId:Number(form.productId)});
    setForm({ productId:"", lot:"", result:"CONFORMING", description:"", correctiveAction:"" });
    load();
  }

  return <>
    <div className="page-title"><div><h1>Garantia da Qualidade</h1><p>Inspeções e não conformidades.</p></div></div>
    <div className="panel"><form className="form-grid" onSubmit={submit}>
      <label>Produto<select value={form.productId} onChange={e=>setForm({...form,productId:e.target.value})} required><option value="">Selecione</option>{products.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
      <label>Lote<input value={form.lot} onChange={e=>setForm({...form,lot:e.target.value})}/></label>
      <label>Resultado<select value={form.result} onChange={e=>setForm({...form,result:e.target.value})}><option value="CONFORMING">Conforme</option><option value="NON_CONFORMING">Não conforme</option></select></label>
      <label>Descrição<input value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
      <label>Ação corretiva<input value={form.correctiveAction} onChange={e=>setForm({...form,correctiveAction:e.target.value})}/></label>
      <button className="primary">Registrar inspeção</button>
    </form></div>
    <div className="panel table-wrap"><table><thead><tr><th>Produto</th><th>Lote</th><th>Resultado</th><th>Descrição</th><th>Data</th></tr></thead><tbody>
      {rows.map(r=><tr key={r.id}><td>{r.product?.name}</td><td>{r.lot ?? "-"}</td><td>{r.result}</td><td>{r.description ?? "-"}</td><td>{new Date(r.date).toLocaleDateString("pt-BR")}</td></tr>)}
    </tbody></table></div>
  </>;
}
