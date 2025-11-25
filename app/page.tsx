"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0b2f26", // verde oscuro
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* CAJA BLANCA QUE FALTABA */}
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 0 30px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#000",
            lineHeight: 1.2,
          }}
        >
          SIMULADOR DE FRESADORA CNC
        </h1>

        <h2
          style={{
            fontSize: 16,
            color: "#000",
            opacity: 0.9,
            marginBottom: 35,
            lineHeight: 1.3,
          }}
        >
          CON REALIDAD AUMENTADA PARA LA UNIVERSIDAD DE CUNDINAMARCA
        </h2>

        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
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
