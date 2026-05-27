import Link from "next/link";

export default function NavbarDashboard() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Titre */}
        <span className="text-xl font-bold text-blue-700">
          MPR & CS — Espace personnel
        </span>

        {/* Liens */}
        <div className="flex items-center gap-6">
          <Link href="/faq" className="text-gray-700 hover:text-blue-700">
            FAQ
          </Link>

          <Link href="/don" className="text-gray-700 hover:text-blue-700">
            Faire un don
          </Link>

          <Link
            href="/dashboard/profil"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Mon profil
          </Link>
        </div>
      </nav>
    </header>
  );
}