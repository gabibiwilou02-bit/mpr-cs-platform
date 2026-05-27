"use client";

import { useState } from "react";
import Image from "next/image";

type Item = {
  id: string;
  nom: string;
  type: "departement" | "filiere";
  logo?: string;
  role: string;
  objectifs: string[];
  taches: string[];
};

const items: Item[] = [
  // ================== DEPARTEMENTS ==================

  {
    id: "dodv",
    nom: "Département Opérationnel de la Vision de MPR & CS (DODV)",
    type: "departement",
    logo: "/logos/dodv.png",
    role:
      "Autorité suprême du ministère. Gardien de la vision divine, organe de gouvernance, d’orientation et de discernement spirituel.",
    objectifs: [
      "Préserver la vision originale donnée par Dieu",
      "Assurer l’unité doctrinale et stratégique",
      "Superviser tous les départements et filières",
    ],
    taches: [
      "Orientation spirituelle et stratégique",
      "Validation des projets",
      "Nomination et promotion des responsables",
    ],
  },

  {
    id: "bnp",
    nom: "Bibliothèque de la Nouvelle Pensée (BNP)",
    type: "departement",
    logo: "/logos/bnp.png",
    role: "Diffuser la pensée renouvelée par la Parole à travers des ouvrages édifiants.",
    objectifs: [
      "Former l’intelligence spirituelle",
      "Encourager la lecture chrétienne",
    ],
    taches: [
      "Publication de livres",
      "Lecture en ligne et hors ligne",
    ],
  },

  {
    id: "cs",
    nom: "Département du Club des Semeurs (CS)",
    type: "departement",
    logo: "/logos/cs.png",
    role:
      "Former et rassembler des croyants engagés pour semer dans le Royaume de Dieu.",
    objectifs: [
      "Développer la culture de la semence",
      "Encourager l’engagement",
    ],
    taches: [
      "Formations",
      "Actions communautaires",
    ],
  },

  {
    id: "gsv",
    nom: "Département des Guerriers Spirituels Victorieux (GSV)",
    type: "departement",
    logo: "/logos/gsv.png",
    role: "Former des croyants fermes et victorieux dans le combat spirituel.",
    objectifs: ["Fortifier la foi", "Former au combat spirituel"],
    taches: ["Intercession", "Veillées", "Jeûnes"],
  },

  {
    id: "dpfe",
    nom: "Département de la Prière Fervente et Efficace (DPFE)",
    type: "departement",
    logo: "/logos/dpfe.png",
    role: "Soutenir le ministère par une prière stratégique et constante.",
    objectifs: ["Maintenir un autel de prière"],
    taches: ["Intercession", "Formations à la prière"],
  },

  {
    id: "dlas",
    nom: "Département de la Louange et de l’Adoration Sacrificielles (DLAS)",
    type: "departement",
    logo: "/logos/dlas.png",
    role: "Établir l’adoration comme fondement spirituel du ministère.",
    objectifs: ["Former des adorateurs"],
    taches: ["Louange", "Formation musicale"],
  },

  {
    id: "proces",
    nom: "Département de l’Évangélisation Stratégique (PROCES)",
    type: "departement",
    logo: "/logos/proces.png",
    role: "Diffuser l’Évangile du Royaume de manière stratégique.",
    objectifs: ["Atteindre les âmes"],
    taches: ["Évangélisation terrain et digitale"],
  },

  {
    id: "mbs",
    nom: "Mission le Bon Samaritain (MBS)",
    type: "departement",
    logo: "/logos/mbs.png",
    role: "Manifester l’amour de Christ par des actions sociales.",
    objectifs: ["Aide aux vulnérables"],
    taches: ["Actions humanitaires"],
  },

  {
    id: "dfbr",
    nom: "Département des Femmes qui Brillent pour le Royaume (DFBR)",
    type: "departement",
    logo: "/logos/dfbr.png",
    role: "Former des femmes solides et influentes pour le Royaume.",
    objectifs: ["Leadership féminin chrétien"],
    taches: ["Mentorat", "Enseignements"],
  },

  {
    id: "doe",
    nom: "Département des Organisateurs d’Évènements (DOE)",
    type: "departement",
    logo: "/logos/doe.png",
    role: "Organiser des événements spirituels structurés.",
    objectifs: ["Excellence organisationnelle"],
    taches: ["Logistique", "Coordination"],
  },

  {
    id: "dst",
    nom: "Département du Service Technique (DST)",
    type: "departement",
    logo: "/logos/dst.png",
    role: "Assurer le soutien technique du ministère.",
    objectifs: ["Qualité technique"],
    taches: ["Sonorisation", "Streaming"],
  },

  {
    id: "edition",
    nom: "Département de la Maison d’Édition de MPR & CS",
    type: "departement",
    logo: "/logos/edition.png",
    role: "Produire et diffuser des œuvres écrites inspirées.",
    objectifs: ["Valoriser les auteurs"],
    taches: ["Édition", "Publication"],
  },

  // ================== FILIERES ==================

  {
    id: "gk-citation",
    nom: "GK Citation",
    type: "filiere",
    logo: "/logos/gk.png",
    role: "Diffuser des citations inspirées pour l’édification quotidienne.",
    objectifs: ["Évangélisation digitale"],
    taches: ["Création de visuels", "Publications"],
  },

  {
    id: "majesty",
    nom: "Majesty Printing Services",
    type: "filiere",
    logo: "/logos/majesty.png",
    role: "Filière économique stratégique d’impression et de design.",
    objectifs: ["Excellence professionnelle"],
    taches: ["Impression", "Design graphique"],
  },
];

export default function DepartementsPage() {
  const [selected, setSelected] = useState<Item | null>(null);

  const departements = items.filter(i => i.type === "departement");
  const filieres = items.filter(i => i.type === "filiere");

  const Card = ({ item }: { item: Item }) => (
    <button
      onClick={() => setSelected(item)}
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left"
    >
      {item.logo ? (
        <Image
          src={item.logo}
          alt={item.nom}
          width={70}
          height={70}
          className="mx-auto"
        />
      ) : (
        <div className="h-[70px] w-[70px] mx-auto border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
          Logo
        </div>
      )}

      <h3 className="mt-4 font-semibold text-center">{item.nom}</h3>
    </button>
  );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700">
        Départements & Filières du MPR & CS
      </h1>

      <section className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold">Voici les 12 départements</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {departements.map(dep => (
            <Card key={dep.id} item={dep} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-2xl font-semibold">Voici les 2 filières</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {filieres.map(f => (
            <Card key={f.id} item={f} />
          ))}
        </div>
      </section>

            {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <div
            className="
              bg-white w-full max-w-2xl
              max-h-[80vh]
              overflow-y-auto
              p-6 rounded-lg
              shadow-xl
            "
          >
            <h3 className="text-2xl font-bold text-center">
              {selected.nom}
            </h3>

            <p className="mt-6 leading-relaxed whitespace-pre-wrap">
              <strong>Rôle dans le ministère :</strong><br />
              {selected.role}
            </p>

            <div className="mt-6">
              <strong>Objectifs :</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {selected.objectifs.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <strong>Tâches :</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {selected.taches.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                onClick={() => setSelected(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}