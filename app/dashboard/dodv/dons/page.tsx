"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Donation = {
  id: string;
  donor_name: string;
  amount: number;
  currency: string;
  department: string;
  filiere: string | null;
  created_at: string;
};

export default function DODVDonsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    async function load() {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (!error) {
        setDonations((data ?? []) as Donation[]);
      } else {
        console.error(error);
      }

      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-6 text-center text-gray-500">
        Chargement des dons…
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        DODV — Dons reçus
      </h1>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>Donateur</th>
              <th>Montant</th>
              <th>Département</th>
              <th>Filière</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((don) => (
              <tr key={don.id} className="border-t">
                <td>{don.donor_name}</td>
                <td>{don.amount} {don.currency}</td>
                <td>{don.department}</td>
                <td>{don.filiere ?? "—"}</td>
                <td>
                  {new Date(don.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {donations.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  Aucun don enregistré
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}