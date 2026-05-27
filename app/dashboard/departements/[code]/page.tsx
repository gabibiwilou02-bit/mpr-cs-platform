"use client";

import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";

const departements = {
  DODV: {
    nom: "Département Opérationnel de la Vision de MPR & CS",
    description:
      "Département administratif central chargé de la vision, de la gouvernance et de la supervision.",
    integrable: false,
  },
  CS: {
    nom: "Département du Club des Semeurs",
    description:
      "Formation, mobilisation et accompagnement des semeurs du Royaume.",
    integrable: true,
  },
  GSV: {
    nom: "Département des Guerriers Spirituels Victorieux",
    description:
      "Combat spirituel, intercession stratégique et délivrance.",
    integrable: true,
  },
  PROCES: {
    nom: "Département de la Promulgation du Royaume des Cieux par l’Evangélisation Stratégique",
    description:
      "Évangélisation stratégique et missions.",
    integrable: true,
  },
  DPFE: {
    nom: "Département de la Prière Fervente et Efficace",
    description:
      "Vie de prière profonde, fervente et structurée.",
    integrable: true,
  },
  MBS: {
    nom: "Département de la Mission le Bon Samaritain",
    description:
      "Actions sociales et humanitaires.",
    integrable: true,
  },
  DLAS: {
    nom: "Département de la Louange et l’Adoration Sacrificielles",
    description:
      "Louange, adoration et ministère musical.",
    integrable: true,
  },
  DST: {
    nom: "Département du Service Technique",
    description:
      "Support technique, médias, diffusion et technologies.",
    integrable: true,
  },
  BNP: {
    nom: "Bibliothèque de la Nouvelle Pensée",
    description:
      "Publications, livres et ressources spirituelles.",
    integrable: true,
  },
  DOE: {
    nom: "Département des Organisateurs d’Évènements",
    description:
      "Organisation et coordination des programmes.",
    integrable: true,
  },
  DFBR: {
    nom: "Département des Femmes qui Brillent pour le Royaume",
    description:
      "Encadrement et édification des femmes.",
    integrable: true,
  },
  ME: {
    nom: "Département de la Maison d’Édition de MPR & CS",
    description:
      "Édition, impression et diffusion des œuvres.",
    integrable: true,
  },
};

export default function DepartementDetailPage() {
  const params = useParams();
  const router = useRouter();

  const code = params.code as string;
  const departement = departements[code as keyof typeof departements];

  if (!departement) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-blue-700">
          {departement.nom}
        </h1>

        <p className="text-gray-700">
          {departement.description}
        </p>

        {departement.integrable ? (
          <Link
            href="/demande-integration"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Demande d’intégration
          </Link>
        ) : (
          <p className="text-red-600 font-medium">
            Ce département est réservé à l’administration (DODV).
          </p>
        )}

        <button
          onClick={() => router.back()}
          className="block text-sm text-gray-500 hover:underline"
        >
          ← Retour
        </button>
      </div>
    </main>
  );
}