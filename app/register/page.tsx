"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    alert("Cuenta creada. Ahora inicia sesión.");
    router.push("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#0d3b2e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
          color: "#000",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "#000" }}>
          Crear Cuenta
        </h1>

        <form onSubmit={handleRegister}>
          <label style={{ color: "#000" }}>Nombre Completo</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 12,
              border: "1px solid #ccc",
              borderRadius: 6,
              color: "#000",
            }}
          />

          <label style={{ color: "#000" }}>Email</label>
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
              borderRadius: 6,
              color: "#000",
            }}
          />

          <label style={{ color: "#000" }}>Contraseña</label>
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
              borderRadius: 6,
              color: "#000",
            }}
          />

          <label style={{ color: "#000" }}>Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 20,
              border: "1px solid #ccc",
              borderRadius: 6,
              color: "#000",
            }}
          >
            <option value="student">Estudiante</option>
            <option value="teacher">Docente</option>
          </select>

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
              fontWeight: "bold",
            }}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}
