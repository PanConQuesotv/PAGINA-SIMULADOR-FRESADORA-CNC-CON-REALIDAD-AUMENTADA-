"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        background: "#0b2f26",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: 20,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fondo con logo */}
      <img
        src="/logotipo.png"
        alt="Logo"
        style={{
          position: "absolute",
          width: "300px",
          opacity: 0.2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 10, zIndex: 10 }}>
        SIMULADOR DE FRESADORA CNC
      </h1>

      <h2 style={{ fontSize: 20, opacity: 0.9, marginBottom: 40, zIndex: 10 }}>
        CON REALIDAD AUMENTADA PARA LA UNIVERSIDAD DE CUNDINAMARCA
      </h2>

      <div style={{ display: "flex", gap: 20, zIndex: 10 }}>
        <button
          style={{
            padding: "12px 24px",
            background: "#1a5c4a",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
          onClick={() => router.push("/login")}
        >
          Login
        </button>

        <button
          style={{
            padding: "12px 24px",
            background: "#2e8a6a",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
          onClick={() => router.push("/register")}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
