
import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login inválido");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          Login - Painel Clima
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}
