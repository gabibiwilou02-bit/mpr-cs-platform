'use client'


import Link from 'next/link'

export default function CompteVendeurAuteurPage() {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Compte vendeur pour auteur
      </h1>

      <p className="text-gray-700">
        La plateforme MPR & CS permet aux auteurs chrétiens de publier,
        vendre et suivre leurs livres au sein du département BNP.
      </p>

      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold text-lg">📘 Auteurs concernés</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Auteurs internes du ministère</li>
          <li>Auteurs externes (non membres du ministère)</li>
        </ul>
      </div>

      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold text-lg">💰 Fonctionnement financier</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>95 % du prix du livre revient à l’auteur</li>
          <li>5 % sont reversés au ministère (BNP)</li>
          <li>Les paiements et répartitions sont gérés automatiquement</li>
        </ul>
      </div>

      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold text-lg">🏛 Rôle du DODV</h2>
        <p className="text-sm text-gray-700">
          Le Département d’Organisation et de Développement Visionnaire (DODV)
          analyse chaque demande, valide ou refuse la création du compte vendeur
          et notifie l’auteur par email.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <Link
          href="/compte_vendeur_pour_auteur/formulaire"
          className="inline-block text-blue-700 font-medium underline"
        >
          Formulaire de demande de création de compte vendeur pour auteur externe
        </Link>
      </div>
    </section>
  )
}