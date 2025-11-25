"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 🔹 Crear usuario en Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // El trigger usará esto
          },
        },
      });

      if (error) throw error;

      // 🔹 Todo salió bien, no necesitamos insertar en profiles manualmente
      alert("Cuenta creada. Revisa tu correo para confirmar e inicia sesión.");
      router.push("/login");
    } catch (err: any) {
      console.error("Register error:", err);
      setErrorMsg(err.message || "Error desconocido al registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Crear Cuenta</h1>

        <form onSubmit={handleRegister}>
          <label>Nombre Completo</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label>Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {errorMsg && <p style={{ color: "red", marginBottom: 12 }}>{errorMsg}</p>}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== ESTILOS ====================
const containerStyle: React.CSSProperties = {
  height: "100vh",
  background: "#0d3b2e",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const formContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  background: "#ffffff",
  padding: 30,
  borderRadius: 12,
  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
  color: "#000",
};

const titleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 20 };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  border: "1px solid #ccc",
  borderRadius: 6,
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  background: "#0d3b2e",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
};
