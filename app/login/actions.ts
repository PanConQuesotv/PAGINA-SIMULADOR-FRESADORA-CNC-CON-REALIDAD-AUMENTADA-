"use server";

import { supabase } from "@/lib/supabase";

export async function login(email: string, password: string) {
  // Autenticación
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: "Credenciales incorrectas." };
  }

  const user = authData.user;

  // Obtener el rol desde profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error obteniendo rol:", profileError);
    return { error: "No se pudo obtener el rol." };
  }

  return {
    id: user.id,
    email: user.email,
    role: profile.role,
    full_name: profile.full_name,
  };
}
