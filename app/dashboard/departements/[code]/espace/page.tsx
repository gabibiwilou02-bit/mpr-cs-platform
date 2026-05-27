export default function DepartementEspaceHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-blue-700">
          Espace interne du département
        </h1>
        <p className="text-gray-700">
          Cet espace est réservé aux membres du département.
          Il centralise les activités, les membres, les demandes d’intégration
          et les outils de gestion interne.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📌 Activités</h2>
          <p className="text-sm text-gray-600">
            Programmes, réunions et actions internes du département.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">👥 Membres</h2>
          <p className="text-sm text-gray-600">
            Liste des membres intégrés et rôles internes.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">📥 Demandes</h2>
          <p className="text-sm text-gray-600">
            Demandes d’intégration à traiter par le comité et le DODV.
          </p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">⚙️ Administration</h2>
          <p className="text-sm text-gray-600">
            Gestion interne du département (accès restreint).
          </p>
        </div>
      </section>
    </div>
  );
}