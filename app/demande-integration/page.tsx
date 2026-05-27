"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

type FormData = {
  nom: string;
  prenom: string;
  sexe: string;
  date_naissance: string;
  nationalite: string;
  pays_residence: string;
  ville: string;
  adresse: string;

  email: string;
  telephone: string;
  whatsapp: string;

  baptise: string;
  date_bapteme: string;
  eglise: string;
  pasteur: string;
  fonction: string;

  departement: string;
  participation: string;
  experience: string;

  competences: string[];
  dons: string;

  motivation: string;
  disponibilite: string;
  formation: string;

  engagement1: boolean;
  engagement2: boolean;
  engagement3: boolean;
};

/* LISTES CENTRALES */
const DEPARTEMENTS = [
  { code: "CS", label: "Département du Club des Semeurs (CS)" },
  { code: "GSV", label: "Département des Guerriers Spirituels Victorieux (GSV)" },
  { code: "PROCES", label: "Département de la Promulgation du Royaume des Cieux par l’Evangélisation Stratégique (PROCES)" },
  { code: "DPFE", label: "Département de la Prière Fervente et Efficace (DPFE)" },
  { code: "MBS", label: "Département de la Mission le Bon Samaritain (MBS)" },
  { code: "DLAS", label: "Département de la Louange et l’Adoration Sacrificielles (DLAS)" },
  { code: "DST", label: "Département du Service Technique (DST)" },
  { code: "BNP", label: "Bibliothèque de la Nouvelle Pensée (BNP)" },
  { code: "DOE", label: "Département des Organisateurs d’Évènements (DOE)" },
  { code: "DFBR", label: "Département des Femmes qui Brillent pour le Royaume (DFBR)" },
  { code: "ME", label: "Département de la Maison d’Édition de MPR & CS (ME)" },
];

const FILIERES = [
  { code: "GK", label: "GK Citation" },
  { code: "MPS", label: "Majesty Printing Services" },
];

export default function DemandeIntegrationPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // departement | filiere | null
  const code = searchParams.get("code");

  const showDepartements = !type || type === "departement";
  const showFilieres = !type || type === "filiere";

  const [form, setForm] = useState<FormData>({
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    nationalite: "",
    pays_residence: "",
    ville: "",
    adresse: "",
    email: "",
    telephone: "",
    whatsapp: "",
    baptise: "",
    date_bapteme: "",
    eglise: "",
    pasteur: "",
    fonction: "",
    departement: "",
    participation: "",
    experience: "",
    competences: [],
    dons: "",
    motivation: "",
    disponibilite: "",
    formation: "",
    engagement1: false,
    engagement2: false,
    engagement3: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      if (name === "competences") {
        setForm((prev) => ({
          ...prev,
          competences: checked
            ? [...prev.competences, value]
            : prev.competences.filter((c) => c !== value),
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.engagement1 || !form.engagement2 || !form.engagement3) {
      alert("Veuillez accepter tous les engagements obligatoires.");
      return;
    }

    console.log(form);

    alert(
      "Votre demande d’intégration a été envoyée avec succès.\nElle sera examinée par l’administration du ministère.\nVous recevrez une réponse officielle par e-mail."
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow space-y-10">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Formulaire de demande d’intégration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* 1. INFORMATIONS PERSONNELLES */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">1. Informations personnelles</h2>
            <input className="input" name="nom" placeholder="Nom *" required onChange={handleChange} />
            <input className="input" name="prenom" placeholder="Prénom *" required onChange={handleChange} />
            <select className="input" name="sexe" onChange={handleChange}>
              <option value="">Sexe</option>
              <option>Masculin</option>
              <option>Féminin</option>
            </select>

              {/* DATE DE NAISSANCE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">
                Date de naissance <span className="text-gray-400">(mm/jj/aaaa)</span>
              </label>
              <input
                className="input"
                type="date"
                name="date_naissance"
                onChange={handleChange}
              />
            </div>

            <input className="input" name="nationalite" placeholder="Nationalité *" required onChange={handleChange} />
            <input className="input" name="pays_residence" placeholder="Pays de résidence *" required onChange={handleChange} />
            <input className="input" name="ville" placeholder="Ville / Commune" onChange={handleChange} />
            <input className="input" name="adresse" placeholder="Adresse complète (facultatif)" onChange={handleChange} />
          </section>

        {/* 2. CONTACT */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">2. Informations de contact</h2>
            <input className="input" type="email" name="email" placeholder="Adresse e-mail *" required onChange={handleChange} />
            <input className="input" name="telephone" placeholder="Numéro de téléphone principal *" required onChange={handleChange} />
            <input className="input" name="whatsapp" placeholder="Numéro WhatsApp (si différent)" onChange={handleChange} />
          </section>

          {/* 3. STATUT SPIRITUEL */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">3. Statut spirituel et ministériel</h2>

            <select className="input" name="baptise" onChange={handleChange}>
              <option value="">Êtes-vous déjà baptisé d’eau ?</option>
              <option>Oui</option>
              <option>Non</option>
            </select>

            {/* DATE DE BAPTÊME D’EAU */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">
                Si oui, veuillez indiquer la date de votre baptême d’eau{" "}
                <span className="text-gray-400">(mm/jj/aaaa)</span>
              </label>
              <input
                className="input"
                type="date"
                name="date_bapteme"
                onChange={handleChange}
              />
            </div>

            <input className="input" name="eglise" placeholder="Église fréquentée" onChange={handleChange} />
            <input className="input" name="pasteur" placeholder="Nom du Pasteur titulaire" onChange={handleChange} />

            <select className="input" name="fonction" onChange={handleChange}>
              <option value="">Fonction actuelle</option>
              <option>Membre</option>
              <option>Serviteur</option>
              <option>Responsable</option>
              <option>Pasteur / Leader</option>
              <option>Autre</option>
            </select>
          </section>
    

          {/* 4. DÉPARTEMENT / FILIÈRE — SECTION CORRIGÉE */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">
              {type === "filiere"
                ? "4. Filière sollicitée"
                : "4. Département / Filière sollicitée"}
            </h2>

            <select
              className="input"
              name="departement"
              required
              onChange={handleChange}
              defaultValue={code ?? ""}
            >
              <option value="">
                {type === "filiere"
                  ? "Choisir la filière *"
                  : type === "departement"
                  ? "Choisir le département *"
                  : "Choisir le département ou la filière *"}
              </option>

              {showDepartements &&
                DEPARTEMENTS.map((d) => (
                  <option key={d.code} value={d.label}>
                    {d.label}
                  </option>
                ))}

              {showFilieres &&
                FILIERES.map((f) => (
                  <option key={f.code} value={f.label}>
                    {f.label}
                  </option>
                ))}
            </select>

            <select className="input" name="participation" onChange={handleChange}>
              <option value="">Avez-vous déjà participé à une activité organisée par cette structure ?</option>
              <option>Oui</option>
              <option>Non</option>
            </select>

            <textarea className="input" name="experience" placeholder="Précisez votre expérience" onChange={handleChange} />
          </section>

          {/* 5. COMPÉTENCES */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">5. Compétences et dons</h2>
            {[
              "Capacité d’Enseigner",
              "Capacité d’Administrer un groupe",
              "Bonne Communication",
              "Bonne Maitrise de la Musique / Louange",
              "Intercession / Prière",
              "Technique / Multimédia",
              "Formation",
              "Autre",
            ].map((c) => (
              <label key={c} className="block">
                <input type="checkbox" name="competences" value={c} onChange={handleChange} /> {c}
              </label>
            ))}
            <textarea className="input" name="dons" placeholder="Dons spirituels ou capacités particulières" onChange={handleChange} />
          </section>

          {/* 6. MOTIVATION */}
          <section className="space-y-4">
            <h2 className="font-semibold text-lg">6. Motivation et engagement</h2>
            <textarea className="input" name="motivation" placeholder="Pourquoi souhaitez-vous intégrer ce département ou cette filière? *" required onChange={handleChange} />
            <select className="input" name="disponibilite" onChange={handleChange}>
              <option value="">Degré de disponibilité</option>
              <option>Faible</option>
              <option>Moyenne</option>
              <option>Élevée</option>
            </select>
            <select className="input" name="formation" onChange={handleChange}>
              <option value="">Disposé(e) à suivre une formation ?</option>
              <option>Oui</option>
              <option>Non</option>
            </select>
          </section>

          {/* 7. ENGAGEMENT */}
<section className="space-y-4">
  <h2 className="font-semibold text-lg">7. Engagement et validation</h2>

  <label className="flex flex-col gap-1 text-sm">
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        name="engagement1"
        onChange={handleChange}
        className="mt-1"
      />
      <span>
        Je reconnais que l&apos;intégration est volontaire et soumise à validation
      </span>
    </div>
  </label>

  <label className="flex flex-col gap-1 text-sm">
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        name="engagement2"
        onChange={handleChange}
        className="mt-1"
      />
      <span>
        Je m&apos;engage à respecter la vision, l&apos;éthique et la discipline du
        ministère MPR & CS
      </span>
    </div>
  </label>

  <label className="flex flex-col gap-1 text-sm">
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        name="engagement3"
        onChange={handleChange}
        className="mt-1"
      />
      <span>
        Je certifie l&apos;exactitude des informations fournies
      </span>
    </div>
  </label>
</section>

          {/* BOUTONS */}
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded">
              Soumettre la demande
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-6 py-2 rounded">
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
