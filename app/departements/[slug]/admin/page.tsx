"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// ⚠️ adapte si tu as déjà un client centralisé
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DepartementAdminPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const [loading, setLoading] = useState(true);
  const [isDODV, setIsDODV] = useState(false);

  const [nom, setNom] = useState("");
  const [role, setRole] = useState("");
  const [objectifs, setObjectifs] = useState("");
  const [taches, setTaches] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  /* ===============================
     🔐 Vérification DODV + chargement
     =============================== */
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // ⚠️ Exemple : rôle stocké dans user_metadata.role
      const roleUtilisateur = user.user_metadata?.role;

      if (roleUtilisateur !== "DODV") {
        router.push("/403");
        return;
      }

      setIsDODV(true);

      const { data, error } = await supabase
        .from("departements")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        alert("Département introuvable");
        router.push("/departements");
        return;
      }

      setNom(data.nom);
      setRole(data.role_spirituel || "");
      setObjectifs(data.objectifs || "");
      setTaches(data.taches || "");
      setLogoUrl(data.logo_url || null);

      setLoading(false);
    };

    init();
  }, [router, slug]);

  /* ===============================
     🖼 Upload logo
     =============================== */
  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return logoUrl;

    const fileExt = logoFile.name.split(".").pop();
    const filePath = `${slug}/logo.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("departement-logos")
      .upload(filePath, logoFile, { upsert: true });

    if (uploadError) {
      alert("Erreur lors de l’upload du logo");
      return null;
    }

    const { data } = supabase.storage
      .from("departement-logos")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  /* ===============================
     💾 Sauvegarde
     =============================== */
  const handleSave = async () => {
    setSaving(true);

    const uploadedLogoUrl = await uploadLogo();
    if (!uploadedLogoUrl) {
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("departements")
      .update({
        role_spirituel: role,
        objectifs,
        taches,
        logo_url: uploadedLogoUrl,
      })
      .eq("slug", slug);

    if (error) {
      alert("Erreur lors de l'enregistrement");
    } else {
      alert("Mise à jour réussie");
      setLogoUrl(uploadedLogoUrl);
      setLogoFile(null);
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  if (!isDODV) {
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Administration – {nom}
      </h1>

      {/* LOGO */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">
          Logo du département / filière
        </label>

        {logoUrl && (
          <div className="relative h-32 w-32 mb-4 border rounded overflow-hidden">
            <Image
              src={logoUrl}
              alt={`Logo ${nom}`}
              fill
              className="object-contain"
              sizes="128px"
              priority
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setLogoFile(e.target.files?.[0] || null)
          }
        />
        <p className="text-sm text-gray-500 mt-1">
          Seul le DODV peut modifier ce logo.
        </p>
      </div>

      {/* ROLE */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Rôle spirituel et fonctionnel
        </label>
        <textarea
          className="w-full border rounded p-3 min-h-[120px]"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      {/* OBJECTIFS */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Objectifs principaux
        </label>
        <textarea
          className="w-full border rounded p-3 min-h-[120px]"
          value={objectifs}
          onChange={(e) => setObjectifs(e.target.value)}
        />
      </div>

      {/* TACHES */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">
          Tâches du département / filière
        </label>
        <textarea
          className="w-full border rounded p-3 min-h-[160px]"
          value={taches}
          onChange={(e) => setTaches(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </main>
  );
}