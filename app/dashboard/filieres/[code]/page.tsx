"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const filieres = {
  GK: {
    nom: "GK Citation",
    description:
      "Production et diffusion de citations spirituelles.",
  },
  MPS: {
    nom: "Majesty Printing Services",
    description:
      "Services d’impression et supports visuels.",
  },
};

export default function FiliereDetailPage() {
  const { code } = useParams();
  const router = useRouter();

  const filiere = filieres[code as keyof typeof filieres];

  if (!filiere) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Filière introuvable.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-blue-700">
          {filiere.nom}
        </h1>

        <p className="text-gray-700">
          {filiere.description}
        </p>

        <Link
          href="/demande-integration"
          className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Demande d’intégration
        </Link>

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