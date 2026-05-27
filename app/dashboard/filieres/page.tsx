"use client";

import Link from "next/link";

const filieres = [
  {
    code: "GK",
    nom: "GK Citation",
    description: "Production et diffusion de citations inspirées.",
  },
  {
    code: "MPS",
    nom: "Majesty Printing Services",
    description: "Services d’impression et de supports visuels.",
  },
];

export default function FilieresPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Filières
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {filieres.map((fil) => (
            <div
              key={fil.code}
              className="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {fil.nom}
                </h2>
                <p className="text-gray-600 mb-4">
                  {fil.description}
                </p>
              </div>

              <Link
                href={`/dashboard/filieres/${fil.code}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Accéder à la filière
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}