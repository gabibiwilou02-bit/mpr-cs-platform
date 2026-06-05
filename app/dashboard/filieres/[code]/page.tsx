"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const filieres = {
  GK: {
    nom: "GK Citation",
    description: "Production et diffusion de citations spirituelles.",
    logo: "/logos/gk.png",
  },
  MPS: {
    nom: "Majesty Printing Services",
    description: "Services d’impression et supports visuels.",
    logo: "/logos/majesty.png",
  },
};

export default function FiliereDetailPage() {
  const params = useParams();
  const router = useRouter();

  const code = params.code as string;
  const filiere = filieres[code as keyof typeof filieres];

  if (!filiere) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">
          Filière introuvable.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">

        {/* LOGO */}
        <div className="flex justify-center">
          <Image
            src={filiere.logo}
            alt={`Logo ${filiere.nom}`}
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        {/* TITRE */}
        <h1 className="text-3xl font-bold text-center text-blue-700">
          {filiere.nom}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-700 text-center">
          {filiere.description}
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/demande-integration"
            className="bg-green-600 text-white px-6 py-2 rounded-md text-center hover:bg-green-700 transition"
          >
            Demande d’intégration
          </Link>

          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Retour
          </button>
        </div>
      </div>
    </main>
  );
}