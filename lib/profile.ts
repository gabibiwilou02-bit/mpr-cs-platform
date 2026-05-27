import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";

export async function createProfileIfNotExists(user: User) {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!data) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      prenom: user.user_metadata?.prenom ?? "",
      nom: user.user_metadata?.nom ?? "",
    });
  }
}