"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Demande, StatutDemande } from "@/types/demandes";

export const dynamic = "force-dynamic";

export default function AdminDemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    const fetchDemandes = async () => {
      const { data, error } = await supabase
        .from("demandes_integration")
        .select(`
          id,
          statut,
          created_at,
          user_id,
          profiles ( nom, prenom, sexe ),
          departements ( id, nom ),
          filieres ( id, nom )
        `)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setError("Impossible de charger les demandes.");
      } else {
        setDemandes((data ?? []) as Demande[]);
      }

      setLoading(false);
    };

    fetchDemandes();
    return () => {
      active = false;
    };
  }, []);

  const updateStatut = async (
    demande: Demande,
    statut: Exclude<StatutDemande, "en attente" | null>
  ) => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("demandes_integration").update({ statut }).eq("id", demande.id);

    await supabase.from("audit_demandes").insert({
      demande_id: demande.id,
      action: statut,
      acteur_id: data.user.id,
    });

    await supabase.from("notifications").insert({
      user_id: demande.user_id,
      titre: "Mise à jour de votre demande",
      message:
        statut === "accepte"
          ? "Votre demande d’intégration a été acceptée."
          : "Votre demande d’intégration a été refusée.",
    });

    setDemandes((prev) =>
      prev.map((d) => (d.id === demande.id ? { ...d, statut } : d))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Demandes d’intégration</h1>

      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {demandes.map((demande) => {
        const p = demande.profiles?.[0];
        const d = demande.departements?.[0];
        const f = demande.filieres?.[0];

        return (
          <div key={demande.id} className="p-4 bg-white shadow rounded">
            <p className="font-medium">
              {p?.prenom ?? "—"} {p?.nom ?? ""}
            </p>
            <p className="text-sm text-gray-600">
              Département : {d?.nom ?? "—"} | Filière : {f?.nom ?? "—"}
            </p>

            {demande.statut === "en attente" && (
              <div className="mt-2 flex gap-2">
                <button onClick={() => updateStatut(demande, "accepte")}>Accepter</button>
                <button onClick={() => updateStatut(demande, "refuse")}>Refuser</button>
              </div>
            )}

            <Link
              href={`/demandes/${demande.id}/historique`}
              className="text-sm text-blue-600"
            >
              Historique
            </Link>
          </div>
        );
      })}
    </div>
  );
}