export type Demande = {
  id: string;
  nom: string;
  prenom: string;
  departement: string;
  statut: "En attente" | "Validée" | "Refusée";
};

export const demandes: Demande[] = [];