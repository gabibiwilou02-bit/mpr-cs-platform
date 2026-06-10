"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/connexion");
        return;
      }

      setLoading(false);

      const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!session) router.replace("/connexion");
        }
      );

      unsubscribe = data.subscription.unsubscribe;
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Chargement de votre espace personnel…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-blue-700">
          Bienvenue dans votre espace personnel
        </h1>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Départements</h2>
            <Link
              href="/dashboard/departements"
              className="text-blue-600 underline"
            >
              Voir les départements
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Filières</h2>
            <Link
              href="/dashboard/filieres"
              className="text-blue-600 underline"
            >
              Voir les filières
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}