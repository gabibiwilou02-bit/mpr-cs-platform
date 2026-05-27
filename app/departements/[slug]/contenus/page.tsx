import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const supabase = await createSupabaseServerClient();

  const { data: contenus, error } = await supabase
    .from("contenus")
    .select(`
      id,
      titre,
      created_at,
      auteur:profiles (
        prenom,
        nom
      ),
      departement:departements (
        nom
      ),
      role:comite_roles (
        libelle
      )
    `)
    .eq("departement_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <p className="p-6 text-red-600">Erreur de chargement des contenus</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Contenus du département</h1>

      {(!contenus || contenus.length === 0) && (
        <p>Aucun contenu disponible</p>
      )}

      <ul className="space-y-4">
        {contenus?.map((contenu) => {
          const auteur = contenu.auteur?.[0];
          const role = contenu.role?.[0];
          const departement = contenu.departement?.[0];

          return (
            <li key={contenu.id} className="border rounded p-4">
              <p className="font-semibold">{contenu.titre}</p>

              <p className="text-sm text-gray-600">
                Publié par{" "}
                {auteur ? `${auteur.prenom} ${auteur.nom}` : "—"}
                {role ? ` — ${role.libelle}` : ""}
              </p>

              <p className="text-sm text-gray-600">
                Département : {departement?.nom ?? "—"}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(contenu.created_at).toLocaleDateString()}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}