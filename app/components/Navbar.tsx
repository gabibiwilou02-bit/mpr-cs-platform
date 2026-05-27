import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Nom */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          MPR & CS
        </Link>

        {/* Liens */}
        <div className="space-x-6 flex items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-700 font-medium"
          >
            Accueil
          </Link>

          <Link
            href="/departements"
            className="text-gray-700 hover:text-blue-700 font-medium"
          >
            Départements
          </Link>

          <Link
            href="/don"
            className="text-gray-700 hover:text-blue-700 font-medium"
          >
            Faire un Don
          </Link>

          <Link
            href="/presentation"
            className="text-gray-700 hover:text-blue-700 font-medium"
          >
            Présentation du Ministère
          </Link>

          <Link
            href="/inscription"
            className="text-gray-700 hover:text-blue-700 font-medium"
          >
            Inscription
          </Link>

          {/* Bouton Connexion */}
          <Link
            href="/connexion"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition font-medium"
          >
            Connexion
          </Link>
        </div>
      </nav>
    </header>
  );
}