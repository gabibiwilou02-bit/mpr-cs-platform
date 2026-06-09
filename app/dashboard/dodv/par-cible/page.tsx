"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type CibleStats = {
  filiere: string;
  total: number;
};

export default function DonsParCiblePage() {
  const [stats, setStats] = useState<CibleStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    const loadStats = async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("filiere, amount");

      if (!active) return;

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const grouped = new Map<string, number>();

      (data ?? []).forEach((don) => {
        const key = don.filiere ?? "Non attribuée";
        grouped.set(key, (grouped.get(key) ?? 0) + don.amount);
      });

      setStats(
        Array.from(grouped.entries()).map(([filiere, total]) => ({
          filiere,
          total,
        }))
      );

      setLoading(false);
    };

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-6 text-center text-gray-500">
        Calcul des statistiques…
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        Dons — Par cible
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.filiere}
            className="bg-white shadow rounded p-4 border-l-4 border-blue-600"
          >
            <p className="text-sm text-gray-500">Filière</p>
            <p className="text-lg font-semibold">{item.filiere}</p>

            <p className="mt-2 text-sm text-gray-500">Total reçu</p>
            <p className="text-xl font-bold text-blue-700">
              {item.total.toLocaleString()} HTG
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}