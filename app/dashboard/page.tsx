"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      // ⚠️ Import dynamique OBLIGATOIRE
      const { supabase } = await import("@/lib/supabaseClient");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/connexion");
        return;
      }

      if (mounted) setLoading(false);

      const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!session) router.replace("/connexion");
        }
      );

      unsubscribe = data.subscription.unsubscribe;
    };

    initAuth();

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">
          Chargement de votre espace personnel…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-blue-700">
          Bienvenue dans votre espace personnel
        </h1>

        {/* DÉPARTEMENTS & FILIÈRES */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Départements</h2>
            <p className="text-gray-600 mb-4">
              Accédez aux espaces des différents départements du MPR & CS.
            </p>
            <Link
              href="/dashboard/departements"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Voir les départements
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Filières</h2>
            <p className="text-gray-600 mb-4">
              Consultez les filières et leurs productions.
            </p>
            <Link
              href="/dashboard/filieres"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Voir les filières
            </Link>
          </div>
        </section>

        {/* ENGAGEMENT */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Engagement</h2>
          <p className="text-gray-600 mb-4">
            Demandez votre intégration dans un département ou une filière
            (selon disponibilité et validation).
          </p>

          <Link
            href="/demande-integration"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Demande d’intégration
          </Link>
        </section>
      </div>
    </main>
  );
}