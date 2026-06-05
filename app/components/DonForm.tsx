'use client'

import { useState } from 'react'

export default function DonForm() {
  const [target, setTarget] = useState('GLOBAL')
  const [currency, setCurrency] = useState('HTG')

  return (
    <form className="space-y-6 border rounded p-6">
      {/* IDENTITÉ */}
      <fieldset className="space-y-3">
        <legend className="font-semibold text-lg">
          🧍‍♂️ Identité du donateur
        </legend>

        <input type="text" placeholder="Nom" className="w-full border rounded p-2" required />
        <input type="text" placeholder="Prénom" className="w-full border rounded p-2" required />

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
        <legend className="font-semibold text-lg">📞 Informations de contact</legend>

        <input type="tel" placeholder="Téléphone" className="w-full border rounded p-2" />
        <input type="text" placeholder="Numéro WhatsApp" className="w-full border rounded p-2" />
        <input type="email" placeholder="Adresse e-mail" className="w-full border rounded p-2" required />
      </fieldset>

      {/* ORIENTATION */}
      <fieldset className="space-y-3">
        <legend className="font-semibold text-lg">🎯 Orientation du don</legend>

        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="GLOBAL">Ministère MPR & CS (don global)</option>
          <option disabled>──────── Départements ────────</option>
          <option>Département du Club des Semeurs (CS)</option>
          <option>Département des Guerriers Spirituels Victorieux (GSV)</option>
          <option>PROCES – Évangélisation Stratégique</option>
          <option>DPFE</option>
          <option>MBS</option>
          <option>DLAS</option>
          <option>DST</option>
          <option>BNP</option>
          <option>DOE</option>
          <option>DFBR</option>
          <option>Maison d’Édition de MPR & CS</option>

          <option disabled>──────── Filières ────────</option>
          <option>GK Citation</option>
          <option>Majesty Printing Services</option>
        </select>
      </fieldset>

      {/* DEVISE */}
      <fieldset className="space-y-3">
        <legend className="font-semibold text-lg">💱 Devise</legend>

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
        <legend className="font-semibold text-lg">💝 Montant</legend>

        <input
          type="number"
          min={1}
          placeholder={`Montant en ${currency}`}
          className="w-full border rounded p-2"
          required
        />
      </fieldset>

      <button
        type="submit"
        className="w-full bg-green-700 text-white py-3 rounded font-semibold hover:bg-green-800 transition"
      >
        Continuer vers le paiement
      </button>
    </form>
  )
}