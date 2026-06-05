"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Donation = {
  id: string;
  amount: number;
  currency: string;
  donor_name: string;
  department: string;
  filiere: string | null;
  created_at: string;
};

export default function ExportDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDonations = async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Erreur chargement dons :", error);
      } else {
        setDonations(data as Donation[]);
      }

      setLoading(false);
    };

    loadDonations();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-6 text-center text-gray-600">
        Chargement des dons…
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        DODV — Export des dons
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Donateur</th>
              <th className="px-4 py-2">Montant</th>
              <th className="px-4 py-2">Département</th>
              <th className="px-4 py-2">Filière</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((don) => (
              <tr key={don.id} className="border-t">
                <td className="px-4 py-2">{don.donor_name}</td>
                <td className="px-4 py-2 text-center">
                  {don.amount} {don.currency}
                </td>
                <td className="px-4 py-2 text-center">
                  {don.department}
                </td>
                <td className="px-4 py-2 text-center">
                  {don.filiere ?? "—"}
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(don.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {donations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Aucun don enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}