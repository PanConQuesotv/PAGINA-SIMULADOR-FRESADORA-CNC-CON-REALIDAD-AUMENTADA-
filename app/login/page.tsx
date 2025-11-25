"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Login normal
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Obtener el rol del perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", signInData.user.id)
      .single();

    if (profileError || !profile) {
      setError("No se pudo obtener el rol del usuario");
      return;
    }

    // Redirigir según rol
    if (profile.role === "admin") router.push("/admin");
    else if (profile.role === "teacher") router.push("/teacher/classes");
    else router.push("/student");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b2f26",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#0d3b2e" }}>
          Iniciar Sesión
        </h1>

        {error && (
          <div
            style={{
              background: "#ffdddd",
              color: "#a70000",
              padding: 10,
              borderRadius: 6,
              marginBottom: 15,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ color: "#0d3b2e" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 15,
              borderRadius: 8,
              border: "1px solid #ccc",
              color: "black", // ← FIX
            }}
          />

          <label style={{ color: "#0d3b2e" }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 20,
              borderRadius: 8,
              border: "1px solid #ccc",
              color: "black", // ← FIX
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#0d3b2e",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
