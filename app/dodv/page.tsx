import Link from "next/link";

export default function DODVPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        DODV — Département Opérationnel de la Vision
      </h1>

      <p className="text-gray-700 max-w-2xl">
        Le DODV assure la supervision globale, la gouvernance spirituelle
        et administrative, ainsi que le contrôle stratégique des activités
        du ministère MPR & CS.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Accès admin */}
        <Link
          href="/dodv/admin"
          className="block bg-white p-6 rounded shadow hover:shadow-md transition border-l-4 border-red-600"
        >
          <h2 className="text-xl font-semibold text-red-700">
            Administration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accès réservé aux administrateurs DODV
          </p>
        </Link>

        {/* Dons */}
        <Link
          href="/dashboard/dodv/dons"
          className="block bg-white p-6 rounded shadow hover:shadow-md transition border-l-4 border-blue-600"
        >
          <h2 className="text-xl font-semibold text-blue-700">
            Dons reçus
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Suivi global des dons du ministère
          </p>
        </Link>

        {/* Statistiques */}
        <Link
          href="/dashboard/par-cible"
          className="block bg-white p-6 rounded shadow hover:shadow-md transition border-l-4 border-green-600"
        >
          <h2 className="text-xl font-semibold text-green-700">
            Dons par cible
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Analyse par département et filière
          </p>
        </Link>
      </div>
    </section>
  );
}