import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 py-6 space-y-3">

        {/* LIGNE 1 : Nom complet du ministère (même style que MPR & CS) */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Ministère Pensée Renouvelée & Club des Semeurs
          </h1>
        </div>

        {/* LIGNE 2 : Sigle */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700">
            MPR & CS
          </h2>
        </div>

        {/* LIGNE 3 : Boutons de navigation */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">

          <Link
            href="/"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Accueil
          </Link>

          <Link
            href="/departements"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Départements
          </Link>

          <Link href="/dashboard/don" className="text-gray-700 hover:text-blue-700">
  Faire un don
</Link>

          <Link
            href="/presentation"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Présentation du Ministère
          </Link>

          <Link
            href="/installer_l_application"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Installer l’application
          </Link>

          <Link
            href="/compte_vendeur_pour_auteur"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Compte vendeur pour Auteur
          </Link>

          <Link
            href="/inscription"
            className="px-4 py-2 rounded bg-gray-100 text-green-700 font-medium hover:bg-gray-200 transition"
          >
            Inscription
          </Link>

          {/* Bouton Connexion distinct */}
          <Link
            href="/connexion"
            className="px-5 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
          >
            Connexion
          </Link>

        </div>
      </nav>
    </header>
  );
}