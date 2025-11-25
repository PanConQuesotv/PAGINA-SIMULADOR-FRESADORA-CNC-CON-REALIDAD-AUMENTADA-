"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0b2f26", // verde oscuro elegante
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          padding: 30,
          borderRadius: 14,
          boxShadow: "0 0 25px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10, color: "#000" }}>
          SIMULADOR DE FRESADORA CNC
        </h1>

        <h2
          style={{
            fontSize: 18,
            opacity: 0.8,
            marginBottom: 35,
            lineHeight: 1.3,
            color: "#000",
          }}
        >
          CON REALIDAD AUMENTADA PARA LA UNIVERSIDAD DE CUNDINAMARCA
        </h2>

        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <button
            style={{
              padding: "12px 26px",
              background: "#4caf7c", // verde claro
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#2f6b4a") // hover oscuro
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#4caf7c")
            }
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            style={{
              padding: "12px 26px",
              background: "#4caf7c",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#2f6b4a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#4caf7c")
            }
            onClick={() => router.push("/register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
