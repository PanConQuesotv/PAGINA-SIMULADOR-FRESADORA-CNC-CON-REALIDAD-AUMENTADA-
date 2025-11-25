"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
      setErrorMsg("No se pudo obtener el rol");
      setLoading(false);
      return;
    }

    if (profile.role === "teacher") router.push("/teacher");
    else router.push("/student");

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#0d3b2e", // verde oscuro
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#ffffff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 0 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Iniciar Sesión</h1>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 6
            }}
          />

          <label>Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 6
            }}
          />

          {errorMsg && (
            <p style={{ color: "red", marginBottom: 12 }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: "#0d3b2e",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
