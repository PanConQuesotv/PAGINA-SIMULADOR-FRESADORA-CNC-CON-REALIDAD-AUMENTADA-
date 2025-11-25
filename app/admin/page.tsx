"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  // --- VERIFICAR QUE EL USUARIO SEA ADMIN ---
  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (!session) return router.push("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return router.push("/login");
    }

    loadUsers();
  };

  // --- CARGAR USUARIOS ---
  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role");

    if (!error) setUsers(data || []);
    setLoading(false);
  };

  // --- CAMBIAR ROL ---
  const updateRole = async (id: string, newRole: string) => {
    await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);

    loadUsers();
  };

  // --- CERRAR SESIÓN ---
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        Cargando...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b2f26",
        padding: "40px",
        color: "white",
      }}
    >
      <div
        style={{
          background: "white",
          color: "black",
          padding: 30,
          borderRadius: 12,
          maxWidth: 900,
          margin: "0 auto",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 25 }}>
          Panel de Administración
        </h1>

        <button
          onClick={logout}
          style={{
            marginBottom: 20,
            padding: "10px 18px",
            background: "#c62828",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>

        <h2 style={{ marginBottom: 10 }}>Usuarios del Sistema</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e0e0e0" }}>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Rol Actual</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{user.full_name || "(Sin nombre)"}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  {["student", "teacher", "admin"].map((role) => (
                    <button
                      key={role}
                      style={btnRole}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#2f6b4a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#4caf7c")
                      }
                      onClick={() => updateRole(user.id, role)}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* BOTONES ADICIONALES */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <button
            style={mainBtn}
            onClick={() => router.push("/teacher/classes")}
          >
            Gestionar Clases
          </button>

          <button
            style={mainBtn}
            onClick={() => router.push("/teacher/assignments")}
          >
            Gestionar Asignaciones
          </button>

          <button
            style={mainBtn}
            onClick={() => router.push("/admin/attempts")}
          >
            Ver Respuestas
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- ESTILOS ----
const thStyle = {
  padding: 10,
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: 10,
  borderBottom: "1px solid #ccc",
};

const btnRole = {
  padding: "6px 12px",
  marginRight: 5,
  background: "#4caf7c",
  border: "none",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  transition: "0.2s",
};

const mainBtn = {
  padding: "12px 20px",
  background: "#0d3b2e",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s",
};

