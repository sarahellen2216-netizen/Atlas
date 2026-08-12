import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";

type Field = { key: string; label: string; type?: string };

export function DataPage({
  title, endpoint, fields, columns
}: {
  title: string;
  endpoint: string;
  fields: Field[];
  columns: string[];
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});

  async function load() {
    const { data } = await api.get(endpoint);
    setRows(data);
  }

  useEffect(() => { load(); }, [endpoint]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form };
    for (const field of fields) {
      if (field.type === "number" && payload[field.key] !== "") payload[field.key] = Number(payload[field.key]);
    }
    await api.post(endpoint, payload);
    setForm({});
    load();
  }

  async function remove(id: number) {
    if (!confirm("Excluir este registro?")) return;
    await api.delete(`${endpoint}/${id}`);
    load();
  }

  return (
    <>
      <div className="page-title"><div><h1>{title}</h1><p>Cadastro e gerenciamento.</p></div></div>
      <div className="panel">
        <form className="form-grid" onSubmit={submit}>
          {fields.map(f => (
            <label key={f.key}>{f.label}
              <input
                type={f.type ?? "text"}
                value={form[f.key] ?? ""}
                onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                required={!["description","phone","email","address","contact","notes","position","department"].includes(f.key)}
              />
            </label>
          ))}
          <button className="primary" type="submit">Cadastrar</button>
        </form>
      </div>

      <div className="panel table-wrap">
        <table>
          <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}<th>Ações</th></tr></thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                {columns.map(c => <td key={c}>{String(row[c] ?? "-")}</td>)}
                <td><button className="danger-link" onClick={() => remove(row.id)}>Excluir</button></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={columns.length + 1}>Nenhum registro.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
