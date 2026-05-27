"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Demande = {
  id: string;
  statut: string | null;
  created_at: string;
  user_id: string;
  profiles: {
    nom: string | null;
    prenom: string | null;
    sexe: string | null;
  }[] | null;
};

export default function DemandesDepartement() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      const { data, error } = await supabase
        .from("demandes_integration")
        .select(`
          id,
          statut,
          created_at,
          user_id,
          profiles (
            nom,
            prenom,
            sexe
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError("Impossible de charger les demandes.");
      } else {
        setDemandes(data ?? []);
      }

      setLoading(false);
    };

    fetchDemandes();
  }, []);

  const updateStatut = async (
    id: string,
    statut: "accepte" | "refuse"
  ) => {
    const { error } = await supabase
      .from("demandes_integration")
      .update({ statut })
      .eq("id", id);

    if (!error) {
      setDemandes((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, statut } : d
        )
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">
          Demandes d’intégration
        </h2>
        <p className="text-gray-600">
          Demandes à traiter par le comité et le DODV.
        </p>
      </header>

      {loading && (
        <p className="text-gray-500">
          Chargement des demandes…
        </p>
      )}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && demandes.length === 0 && (
        <p className="text-gray-500">
          Aucune demande pour le moment.
        </p>
      )}

      <div className="space-y-4">
        {demandes.map((demande) => {
          const profile = demande.profiles?.[0];

          return (
            <div
              key={demande.id}
              className="p-4 bg-white rounded shadow flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {profile?.prenom ?? "—"} {profile?.nom ?? ""}
                </p>
                <p className="text-sm text-gray-600">
                  Sexe : {profile?.sexe ?? "—"} — Statut :{" "}
                  <span className="font-semibold">
                    {demande.statut || "en attente"}
                  </span>
                </p>
              </div>

              {demande.statut !== "accepte" &&
                demande.statut !== "refuse" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateStatut(demande.id, "accepte")
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() =>
                        updateStatut(demande.id, "refuse")
                      }
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Refuser
                    </button>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}