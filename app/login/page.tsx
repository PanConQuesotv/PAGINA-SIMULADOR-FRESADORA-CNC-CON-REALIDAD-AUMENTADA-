"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    // Obtener perfil para saber el rol
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

if (!profile) {
  alert("No se encontró el perfil del usuario.");
  return;
}

if (profile.role === "teacher") router.push("/teacher");
else router.push("/student");

  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPass(e.target.value)} />
      <button onClick={signIn}>Entrar</button>
    </div>
  );
}
