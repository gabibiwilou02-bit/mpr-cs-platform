import { demandes } from "../../mockData";

export default function DemandeDetail({
  params,
}: {
  params: { id: string };
}) {
  const demande = demandes.find((d) => d.id === params.id);

  if (!demande) {
    return <p className="p-8">Demande introuvable</p>;
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">
        Détail de la demande
      </h1>

      <p><strong>Nom :</strong> {demande.nom}</p>
      <p><strong>Prénom :</strong> {demande.prenom}</p>
      <p><strong>Département :</strong> {demande.departement}</p>
      <p><strong>Statut :</strong> {demande.statut}</p>
    </div>
  );
}