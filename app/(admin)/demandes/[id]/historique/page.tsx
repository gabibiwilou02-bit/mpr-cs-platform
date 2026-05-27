"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";

/* =======================
   TYPES
======================= */
type HistoriqueStatut = {
  id: string;
  ancien_statut: string | null;
  nouveau_statut: string | null;
  created_at: string;
  profiles: {
    nom: string | null;
    prenom: string | null;
  }[];
};

export default function HistoriqueDemandePage() {
  const params = useParams<{ id: string }>();
  const demandeId = params.id;

  const [historique, setHistorique] = useState<HistoriqueStatut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =======================
     FETCH HISTORIQUE
  ======================= */
  useEffect(() => {
    const fetchHistorique = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("demandes_historique")
        .select(`
          id,
          ancien_statut,
          nouveau_statut,
          created_at,
          profiles (
            nom,
            prenom
          )
        `)
        .eq("demande_id", demandeId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError("Impossible de charger l’historique.");
      } else {
        setHistorique((data ?? []) as HistoriqueStatut[]);
      }

      setLoading(false);
    };

    if (demandeId) {
      fetchHistorique();
    }
  }, [demandeId]);

  /* =======================
     EXPORT PDF
  ======================= */
  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(14);
    pdf.text("Historique de la demande", 10, 15);

    pdf.setFontSize(10);
    let y = 30;

    historique.forEach((item, index) => {
      const auteur = item.profiles?.[0];

      const ligne = `${index + 1}. ${
        auteur?.prenom ?? ""
      } ${auteur?.nom ?? ""} : ${
        item.ancien_statut ?? "—"
      } → ${item.nouveau_statut ?? "—"}`;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(ligne, 10, y);
      y += 8;
    });

    pdf.save(`historique-demande-${demandeId}.pdf`);
  };

  /* =======================
     RENDER
  ======================= */
  if (loading) return <p>Chargement…</p>;

  if (error) {
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Historique des statuts
        </h1>

        {historique.length > 0 && (
          <button
            onClick={exportPDF}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Exporter PDF
          </button>
        )}
      </header>

      {historique.length === 0 && (
        <p className="text-gray-500">
          Aucun changement enregistré.
        </p>
      )}

      <div className="space-y-3">
        {historique.map((item) => {
          const auteur = item.profiles?.[0];

          return (
            <div
              key={item.id}
              className="p-3 bg-white rounded shadow"
            >
              <p className="text-sm">
                <strong>
                  {auteur?.prenom ?? "—"}{" "}
                  {auteur?.nom ?? ""}
                </strong>{" "}
                : {item.ancien_statut ?? "—"} →{" "}
                <span className="font-semibold">
                  {item.nouveau_statut ?? "—"}
                </span>
              </p>

              <p className="text-xs text-gray-400">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}