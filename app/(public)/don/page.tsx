'use client'

import { useState } from 'react'

export default function DonPage() {
  const [target, setTarget] = useState('GLOBAL')
  const [currency, setCurrency] = useState('HTG')

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Faire un Don au Ministère MPR & CS
      </h1>

      <p className="text-gray-700 text-sm text-center">
        Votre don soutient l’œuvre de Dieu à travers le ministère MPR & CS.
        Vous pouvez orienter votre don vers un département ou une filière,
        ou le laisser pour l’ensemble du ministère.
      </p>

      {/* FORMULAIRE */}
      <form className="space-y-6 border rounded p-6">

        {/* IDENTITÉ */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-lg">
            🧍‍♂️ Identité du donateur
          </legend>

          <input
            type="text"
            placeholder="Nom"
            className="w-full border rounded p-2"
            required
          />

          <input
            type="text"
            placeholder="Prénom"
            className="w-full border rounded p-2"
            required
          />

          <select className="w-full border rounded p-2">
            <option value="">Type de donateur (facultatif)</option>
            <option>Organisation</option>
            <option>Église</option>
            <option>Institution</option>
            <option>Individuel</option>
          </select>

          <input
            type="text"
            placeholder="Nom de l’organisation / église / institution (si applicable)"
            className="w-full border rounded p-2"
          />
        </fieldset>

        {/* CONTACT */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-lg">
            📞 Informations de contact
          </legend>

          <input
            type="tel"
            placeholder="Téléphone"
            className="w-full border rounded p-2"
          />

          <input
            type="text"
            placeholder="Numéro WhatsApp"
            className="w-full border rounded p-2"
          />

          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full border rounded p-2"
            required
          />
        </fieldset>

        {/* ORIENTATION DU DON */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-lg">
            🎯 Orientation du don
          </legend>

          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="GLOBAL">
              Ministère MPR & CS (don global)
            </option>

            <option disabled>──────── Départements ────────</option>
            <option>Département du Club des Semeurs (CS)</option>
            <option>Département des Guerriers Spirituels Victorieux (GSV)</option>
            <option>PROCES – Évangélisation Stratégique</option>
            <option>Département de la Prière Fervente et Efficace (DPFE)</option>
            <option>Mission le Bon Samaritain (MBS)</option>
            <option>Louange et Adoration Sacrificielles (DLAS)</option>
            <option>Département du Service Technique (DST)</option>
            <option>Bibliothèque de la Nouvelle Pensée (BNP)</option>
            <option>Département des Organisateurs d’Évènements (DOE)</option>
            <option>Département des Femmes qui Brillent (DFBR)</option>
            <option>Maison d’Édition de MPR & CS</option>

            <option disabled>──────── Filières ────────</option>
            <option>GK Citation</option>
            <option>Majesty Printing Services</option>
          </select>
        </fieldset>

        {/* DEVISE */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-lg">
            💱 Devise du don
          </legend>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="HTG">Gourdes haïtiennes (HTG)</option>
            <option value="USD">Dollars américains (USD)</option>
          </select>
        </fieldset>

        {/* MONTANT */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-lg">
            💝 Montant du don
          </legend>

          <input
            type="number"
            placeholder={`Montant en ${currency}`}
            className="w-full border rounded p-2"
            min={1}
            required
          />
        </fieldset>

        {/* PAIEMENT */}
        <div className="bg-gray-50 border rounded p-4 text-sm text-gray-700">
          Le paiement sera effectué via une plateforme de paiement sécurisée
          (Paddle, Stripe ou autre).  
          Vous serez redirigé après validation.
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded font-semibold hover:bg-green-800 transition"
        >
          Continuer vers le paiement
        </button>
      </form>
    </section>
  )
}