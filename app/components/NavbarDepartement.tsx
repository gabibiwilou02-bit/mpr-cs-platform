"use client";

import Link from "next/link";

type Props = {
  isAdmin?: boolean; // comité ou DODV
};

export default function NavbarDepartement({ isAdmin = false }: Props) {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-700">
          Département
        </span>

        <div className="flex items-center gap-6">
          <Link href="catalogue" className="text-gray-700 hover:text-blue-700">
            Catalogue
          </Link>

          <Link href="/profil" className="text-gray-700 hover:text-blue-700">
            Mon profil
          </Link>

          <button className="text-gray-700 hover:text-blue-700">
            🔔
          </button>

          {isAdmin && (
            <Link
              href="admin"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}