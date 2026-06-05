export default function DODVAdminPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-red-700">
        Département Opérationnel de la Vision
      </h1>

      <p className="text-gray-700 max-w-2xl">
        Cet espace est réservé aux administrateurs du DODV.
        Il permet la supervision stratégique, le contrôle
        administratif et la validation des opérations sensibles
        du ministère.
      </p>

      <div className="mt-6 bg-white p-6 rounded shadow border-l-4 border-red-600">
        <h2 className="text-xl font-semibold text-gray-800">
          Rôles clés du DODV
        </h2>
        <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
          <li>Supervision globale du ministère</li>
          <li>Contrôle des dons et ressources</li>
          <li>Validation des départements et filières</li>
          <li>Orientation stratégique et visionnaire</li>
        </ul>
      </div>
    </section>
  );
}