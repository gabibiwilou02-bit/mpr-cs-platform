export type StatutDemande =
  | "en attente"
  | "accepte"
  | "refuse"
  | null;

/* ================= ADMIN ================= */

export type Demande = {
  id: string;
  statut: StatutDemande;
  created_at: string;
  user_id: string;

  profiles: {
    nom: string | null;
    prenom: string | null;
    sexe: string | null;
  }[];

  departements: {
    id: string;
    nom: string;
  }[];

  filieres: {
    id: string;
    nom: string;
  }[];
};

/* ================= USER ================= */

export type DemandeUser = {
  id: string;
  statut: StatutDemande;
  created_at: string;

  departements: {
    nom: string;
  }[];

  filieres: {
    nom: string;
  }[];
};

export type HistoriqueStatut = {
  id: string;
  action: "accepte" | "refuse";
  created_at: string;

  profiles: {
    nom: string | null;
    prenom: string | null;
  }[];
};