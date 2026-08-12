import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";

export function Login() {
  const [email, setEmail] = useState("admin@atlas.local");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Não foi possível entrar.");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark big">A</div>
        <h1>Atlas Gestão</h1>
        <p>Gestão Inteligente para Empresas Modernas</p>
        {error && <div className="alert">{error}</div>}
        <label>E-mail<input value={email} onChange={e => setEmail(e.target.value)} type="email"/></label>
        <label>Senha<input value={password} onChange={e => setPassword(e.target.value)} type="password"/></label>
        <button className="primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}
