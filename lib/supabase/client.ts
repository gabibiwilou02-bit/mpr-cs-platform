// lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

/**
 * Client Supabase côté navigateur UNIQUEMENT
 */
export function getSupabaseClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient called on server");
  }

  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      throw new Error("Supabase env vars missing");
    }

    supabase = createBrowserClient(url, anon);
  }

  return supabase;
}