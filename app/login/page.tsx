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

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !signInData.user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", signInData.user.id)
      .single();

    if (profileError || !profile) {
      setError("No se pudo obtener el rol del usuario");
      return;
    }

    if (profile.role === "admin") router.push("/admin");
    else if (profile.role === "teacher") router.push("/teacher/classes");
    else router.push("/student");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A3A32", // verde oscuro más bonito
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: 30,
          borderRadius: 14,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#0A3A32",
            fontWeight: "bold",
          }}
        >
          Iniciar Sesión
        </h1>

        {error && (
          <div
            style={{
              background: "#ffe0e0",
              color: "#b00000",
              padding: 10,
              borderRadius: 6,
              marginBottom: 15,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ color: "#0A3A32", fontWeight: 500 }}>Email</label>
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
              border: "1px solid #aac4c0",
            }}
          />

          <label style={{ color: "#0A3A32", fontWeight: 500 }}>
            Contraseña
          </label>
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
              border: "1px solid #aac4c0",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#116149",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#0d4f3a")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#116149")
            }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
