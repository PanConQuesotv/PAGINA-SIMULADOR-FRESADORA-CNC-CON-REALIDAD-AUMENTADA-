"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Función de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Autenticar con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // 2. Obtener el perfil para saber el rol
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
      setErrorMsg("No se pudo obtener el rol del usuario.");
      setLoading(false);
      return;
    }

    // 3. Redirigir según rol
    if (profile.role === "teacher") {
      router.push("/teacher");
    } else if (profile.role === "student") {
      router.push("/student");
    } else {
      setErrorMsg("Rol desconocido.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 20,
        borderRadius: 10,
        background: "#f0f0f0"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        {errorMsg && (
          <p style={{ color: "red", marginBottom: 10 }}>{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
