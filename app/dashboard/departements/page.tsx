"use client";

import Link from "next/link";

const departements = [
  {
    code: "DODV",
    nom: "Département Opérationnel de la Vision de MPR & CS",
    description: "Département administratif central.",
    integrable: false,
  },
  {
    code: "CS",
    nom: "Département du Club des Semeurs",
    description: "Formation et mobilisation des semeurs du Royaume.",
    integrable: true,
  },
  {
    code: "GSV",
    nom: "Département des Guerriers Spirituels Victorieux",
    description: "Combat spirituel et intercession.",
    integrable: true,
  },
  {
    code: "PROCES",
    nom: "Département de la Promulgation du Royaume des Cieux par l’Evangélisation Stratégique",
    description: "Evangélisation stratégique et missionnaire.",
    integrable: true,
  },
  {
    code: "DPFE",
    nom: "Département de la Prière Fervente et Efficace",
    description: "Vie de prière intense et structurée.",
    integrable: true,
  },
  {
    code: "MBS",
    nom: "Département de la Mission le Bon Samaritain",
    description: "Action sociale et compassion chrétienne.",
    integrable: true,
  },
  {
    code: "DLAS",
    nom: "Département de la Louange et l’Adoration Sacrificielles",
    description: "Louange, adoration et ministère musical.",
    integrable: true,
  },
  {
    code: "DST",
    nom: "Département du Service Technique",
    description: "Support technique, médias et technologies.",
    integrable: true,
  },
  {
    code: "BNP",
    nom: "Bibliothèque de la Nouvelle Pensée",
    description: "Publications, livres et ressources spirituelles.",
    integrable: true,
  },
  {
    code: "DOE",
    nom: "Département des Organisateurs d’Evènements",
    description: "Organisation des programmes et évènements.",
    integrable: true,
  },
  {
    code: "DFBR",
    nom: "Département des Femmes qui Brillent pour le Royaume",
    description: "Ministère dédié aux femmes.",
    integrable: true,
  },
  {
    code: "ME",
    nom: "Département de la Maison d’Edition de MPR & CS",
    description: "Edition, impression et diffusion des œuvres.",
    integrable: true,
  },
];

export default function DepartementsPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Départements
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {departements.map((dep) => (
            <div
              key={dep.code}
              className="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {dep.nom}
                </h2>
                <p className="text-gray-600 mb-4">
                  {dep.description}
                </p>
              </div>

              {dep.integrable ? (
                <Link
                  href={`/dashboard/departements/${dep.code}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Accéder au département
                </Link>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Réservé à l’administration
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}