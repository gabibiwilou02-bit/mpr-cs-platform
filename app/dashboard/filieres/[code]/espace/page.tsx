export default function FiliereEspaceHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-blue-700">
          Espace interne de la filière
        </h1>
        <p className="text-gray-700">
          Cet espace est réservé aux membres de la filière.
          Il regroupe les publications, les membres, les demandes d’intégration
          et les outils de coordination.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📚 Publications</h2>
          <p className="text-sm text-gray-600">
            Citations, ressources et contenus produits par la filière.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">👥 Membres</h2>
          <p className="text-sm text-gray-600">
            Membres actifs et contributeurs de la filière.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📥 Demandes</h2>
          <p className="text-sm text-gray-600">
            Demandes d’intégration à la filière.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">⚙️ Administration</h2>
          <p className="text-sm text-gray-600">
            Gestion interne de la filière (accès restreint).
          </p>
        </div>
      </section>
    </div>
  );
}