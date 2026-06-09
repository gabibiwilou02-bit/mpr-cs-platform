"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Demande, StatutDemande } from "@/types/demandes";

export default function AdminDemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchDemandes = async () => {
      setLoading(true);
      setError(null);

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
        console.error(error);
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // 1️⃣ Mise à jour du statut
    const { error } = await supabase
      .from("demandes_integration")
      .update({ statut })
      .eq("id", demande.id);

    if (error) {
      console.error(error);
      return;
    }

    // 2️⃣ Audit
    await supabase.from("audit_demandes").insert({
      demande_id: demande.id,
      action: statut,
      acteur_id: user.id,
    });

    // 3️⃣ Notification utilisateur
    await supabase.from("notifications").insert({
      user_id: demande.user_id,
      titre: "Mise à jour de votre demande",
      message:
        statut === "accepte"
          ? "Votre demande d’intégration a été acceptée."
          : "Votre demande d’intégration a été refusée.",
    });

    // 4️⃣ Mise à jour locale optimiste
    setDemandes((prev) =>
      prev.map((d) =>
        d.id === demande.id ? { ...d, statut } : d
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          Demandes d’intégration
        </h1>
        <p className="text-gray-600">
          Gestion des demandes par le comité et le DODV
        </p>
      </header>

      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {demandes.map((demande) => {
          const profile = demande.profiles?.[0];
          const departement = demande.departements?.[0];
          const filiere = demande.filieres?.[0];

          return (
            <div
              key={demande.id}
              className="p-4 bg-white rounded shadow flex justify-between gap-4"
            >
              <div>
                <p className="font-medium">
                  {profile?.prenom ?? "—"}{" "}
                  {profile?.nom ?? ""}
                </p>

                <p className="text-sm text-gray-600">
                  Sexe : {profile?.sexe ?? "—"} <br />
                  Département : {departement?.nom ?? "—"} <br />
                  Filière : {filiere?.nom ?? "—"}
                </p>

                <p className="text-sm mt-1">
                  Statut :{" "}
                  <span className="font-semibold">
                    {demande.statut ?? "en attente"}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2 min-w-[140px]">
                {demande.statut === "en attente" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatut(demande, "accepte")
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                    >
                      Accepter
                    </button>

                    <button
                      onClick={() =>
                        updateStatut(demande, "refuse")
                      }
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Refuser
                    </button>
                  </>
                )}

                <Link
                  href={`/demandes/${demande.id}/historique`}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm text-center"
                >
                  Historique
                </Link>
              </div>
            </div>
          );
        })}

        {!loading && demandes.length === 0 && (
          <p className="text-gray-500">
            Aucune demande enregistrée.
          </p>
        )}
      </div>
    </div>
  );
}