import Link from "next/link";
import { demandes } from "../lib/demandesStore";

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Tableau de bord – Demandes d’intégration
      </h1>

      {demandes.length === 0 ? (
        <p>Aucune demande pour le moment.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nom</th>
              <th className="border p-2">Prénom</th>
              <th className="border p-2">Département</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((d) => (
              <tr key={d.id}>
                <td className="border p-2">{d.nom}</td>
                <td className="border p-2">{d.prenom}</td>
                <td className="border p-2">{d.departement}</td>
                <td className="border p-2">{d.statut}</td>
                <td className="border p-2 text-center">
                  <Link
                    href={`/admin/demandes/${d.id}`}
                    className="text-blue-600 underline"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}