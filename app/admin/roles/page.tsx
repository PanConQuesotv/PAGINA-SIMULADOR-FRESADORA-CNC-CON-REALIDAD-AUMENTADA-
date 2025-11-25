"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface AllowedTeacher {
  id: string;
  email: string;
  created_at: string;
}

export default function ManageRolesPage() {
  const [email, setEmail] = useState("");
  const [list, setList] = useState<AllowedTeacher[]>([]);
  const [loading, setLoading] = useState(false);

  const loadList = async () => {
    const { data } = await supabase.from("allowed_teachers").select("*");
    setList(data || []);
  };

  const addTeacher = async () => {
    if (!email) return;
    setLoading(true);

    await supabase.from("allowed_teachers").insert({ email });

    setEmail("");
    await loadList();
    setLoading(false);
  };

  const removeTeacher = async (id: string) => {
    setLoading(true);

    await supabase.from("allowed_teachers").delete().eq("id", id);

    await loadList();
    setLoading(false);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d3b2e",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 0 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#000",
            fontSize: 26,
          }}
        >
          Gestión de Docentes
        </h1>

        {/* Formulario */}
        <div style={{ marginBottom: 25 }}>
          <label style={{ color: "#000", fontWeight: "bold" }}>
            Correo del docente
          </label>

          <input
            type="email"
            placeholder="docente@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginTop: 8,
              marginBottom: 15,
              color: "#000",
            }}
          />

          <button
            onClick={addTeacher}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#1e8c4a")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#2ecc71")
            }
          >
            {loading ? "Procesando..." : "Agregar Docente"}
          </button>
        </div>

        {/* Lista */}
        <h2
          style={{
            color: "#000",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Docentes autorizados
        </h2>

        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#000",
            }}
          >
            <thead>
              <tr style={{ background: "#e8e8e8" }}>
                <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                  Correo
                </th>
                <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                  Acción
                </th>
              </tr>
            </thead>

            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
                    {t.email}
                  </td>
                  <td style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => removeTeacher(t.id)}
                      disabled={loading}
                      style={{
                        padding: "6px 12px",
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#b93a2f")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "#e74c3c")
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    style={{ padding: 15, textAlign: "center", color: "#666" }}
                  >
                    No hay docentes autorizados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
