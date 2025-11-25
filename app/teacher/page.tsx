"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TeacherPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"assignments" | "classes" | "responses">("assignments");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);

  // --- VERIFICAR QUE EL USUARIO SEA DOCENTE ---
  useEffect(() => {
    checkTeacher();
  }, []);

  const checkTeacher = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (!session) return router.push("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.role !== "teacher") {
      return router.push("/login");
    }

    loadData();
  };

  const loadData = async () => {
    const { data: aData } = await supabase.from("assignments").select("*");
    const { data: cData } = await supabase.from("classes").select("*");
    const { data: rData } = await supabase.from("responses").select("*");

    setAssignments(aData || []);
    setClasses(cData || []);
    setResponses(rData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        Cargando...
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Panel Docente</h1>

      {/* --- Navegación de Secciones --- */}
      <div style={tabBarStyle}>
        <button style={tabButton(tab === "assignments")} onClick={() => setTab("assignments")}>
          Crear Asignaciones
        </button>
        <button style={tabButton(tab === "classes")} onClick={() => setTab("classes")}>
          Crear Clases
        </button>
        <button style={tabButton(tab === "responses")} onClick={() => setTab("responses")}>
          Ver Respuestas
        </button>
      </div>

      {/* --- Secciones --- */}
      <div style={{ marginTop: 20 }}>
        {tab === "assignments" && <AssignmentsSection assignments={assignments} />}
        {tab === "classes" && <ClassesSection classes={classes} />}
        {tab === "responses" && <ResponsesSection responses={responses} />}
      </div>
    </div>
  );
}

// =================== COMPONENTES DE SECCIONES ===================
function AssignmentsSection({ assignments }: { assignments: any[] }) {
  return (
    <div>
      <h2 style={sectionTitle}>Asignaciones</h2>
      <button style={actionBtn}>Crear Nueva Asignación</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Imagen RA</th>
            <th style={thTdStyle}>Intentos</th>
            <th style={thTdStyle}>Situación Problema</th>
            <th style={thTdStyle}>Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td style={thTdStyle}><a href={a.image_url} target="_blank" rel="noreferrer">Ver Imagen</a></td>
              <td style={thTdStyle}>{a.attempts}</td>
              <td style={thTdStyle}>{a.problem}</td>
              <td style={thTdStyle}>{a.solution}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClassesSection({ classes }: { classes: any[] }) {
  return (
    <div>
      <h2 style={sectionTitle}>Clases</h2>
      <button style={actionBtn}>Crear Nueva Clase</button>
      <ul>
        {classes.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

function ResponsesSection({ responses }: { responses: any[] }) {
  return (
    <div>
      <h2 style={sectionTitle}>Respuestas de Estudiantes</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Estudiante</th>
            <th style={thTdStyle}>Asignación</th>
            <th style={thTdStyle}>Respuesta</th>
            <th style={thTdStyle}>Correcta</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id}>
              <td style={thTdStyle}>{r.student_name}</td>
              <td style={thTdStyle}>{r.assignment_name}</td>
              <td style={thTdStyle}>{r.answer}</td>
              <td style={thTdStyle}>{r.correct ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// =================== ESTILOS ===================
const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: 40,
  background: "#0b2f26",
  color: "white",
};

const titleStyle: React.CSSProperties = { textAlign: "center", marginBottom: 25 };
const tabBarStyle: React.CSSProperties = { display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 };
const tabButton = (active: boolean): React.CSSProperties => ({
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  background: active ? "#4caf7c" : "#2f6b4a",
  color: "white",
  transition: "0.2s",
});

const sectionTitle: React.CSSProperties = { fontSize: 18, marginBottom: 10 };
const actionBtn: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 6,
  background: "#4caf7c",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: 10,
};

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse" };
const thTdStyle: React.CSSProperties = { padding: 10, border: "1px solid #ccc", textAlign: "left" };

const loadingStyle: React.CSSProperties = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" };
