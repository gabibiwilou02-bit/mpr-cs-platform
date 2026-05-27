"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";
import type { DemandeUser } from "@/types/demandes";

/* =========================
   OUTILS UI
========================= */
const statutStyle = (statut: string | null) => {
  switch (statut) {
    case "accepte":
      return "bg-green-100 text-green-800";
    case "refuse":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* =========================
   PAGE
========================= */
export default function MesDemandesPage() {
  const [demandes, setDemandes] = useState<DemandeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===== FETCH ===== */
  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("demandes_integration")
        .select(`
          id,
          statut,
          created_at,
          departements ( nom ),
          filieres ( nom )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError("Impossible de charger vos demandes.");
      } else {
        setDemandes(data ?? []);
      }

      setLoading(false);
    };

    fetchDemandes();
  }, []);

  /* ===== NOTIFICATION SI ACCEPTÉE ===== */
  useEffect(() => {
    const accepted = demandes.find(d => d.statut === "accepte");
    if (accepted) {
      alert("🎉 Votre demande a été acceptée !");
    }
  }, [demandes]);

  /* ===== SUPPRESSION AUTO SI REFUSÉE ===== */
  useEffect(() => {
    const refused = demandes.filter(d => d.statut === "refuse");
    if (refused.length === 0) return;

    const timer = setTimeout(async () => {
      const ids = refused.map(d => d.id);

      await supabase
        .from("demandes_integration")
        .delete()
        .in("id", ids);

      setDemandes(prev =>
        prev.filter(d => d.statut !== "refuse")
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [demandes]);

  /* ===== PDF ===== */
  const generatePDF = (demande: DemandeUser) => {
    const pdf = new jsPDF();

    const departement = demande.departements?.[0];
    const filiere = demande.filieres?.[0];

    pdf.text("Demande d’intégration", 20, 20);
    pdf.text(`Statut : ${demande.statut ?? "en attente"}`, 20, 40);
    pdf.text(`Date : ${formatDate(demande.created_at)}`, 20, 50);
    pdf.text(`Département : ${departement?.nom ?? "—"}`, 20, 60);
    pdf.text(`Filière : ${filiere?.nom ?? "—"}`, 20, 70);

    pdf.save(`demande-${demande.id}.pdf`);
  };

  /* ===== RENDER ===== */
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && demandes.length === 0 && (
        <p>Aucune demande trouvée.</p>
      )}

      <div className="space-y-4">
        {demandes.map((demande) => {
          const departement = demande.departements?.[0];
          const filiere = demande.filieres?.[0];

          return (
            <div
              key={demande.id}
              className="p-4 bg-white rounded shadow space-y-2"
            >
              <p className="text-sm text-gray-600">
                Département : {departement?.nom ?? "—"}
              </p>

              <p className="text-sm text-gray-600">
                Filière : {filiere?.nom ?? "—"}
              </p>

              <p className="text-sm text-gray-500">
                Soumise le {formatDate(demande.created_at)}
              </p>

              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${statutStyle(
                  demande.statut
                )}`}
              >
                {demande.statut ?? "en attente"}
              </span>

              <div>
                <button
                  onClick={() => generatePDF(demande)}
                  className="text-sm text-blue-600 underline mt-2"
                >
                  Télécharger le PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}