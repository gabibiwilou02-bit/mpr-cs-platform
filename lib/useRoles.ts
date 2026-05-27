"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* =========================
   Types
   ========================= */

export type UserRole =
  | "DODV"
  | "DEPARTEMENT_COMITE"
  | "MEMBRE"
  | null;

interface UseRolesResult {
  loading: boolean;
  role: UserRole;
  departementId: string | null;
}

/* =========================
   Hook
   ========================= */

export function useRoles(): UseRolesResult {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>(null);
  const [departementId, setDepartementId] = useState<string | null>(null);

  useEffect(() => {
    const loadRoles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      /**
       * Convention que nous utilisons :
       * user_metadata.role = "DODV" | "DEPARTEMENT_COMITE" | "MEMBRE"
       * user_metadata.departement_id = uuid | null
       */

      const metadata = user.user_metadata as {
        role?: UserRole;
        departement_id?: string;
      };

      setRole(metadata.role ?? null);
      setDepartementId(metadata.departement_id ?? null);
      setLoading(false);
    };

    loadRoles();
  }, []);

  return {
    loading,
    role,
    departementId,
  };
}