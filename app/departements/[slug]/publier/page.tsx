"use client";

import { useEffect } from "react";

export default function PublierPage() {
  useEffect(() => {
    console.log("Page Publier – Département chargée");
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Publier un contenu
      </h1>

      <p className="text-sm text-gray-600 mb-8">
        Cet espace est réservé aux responsables autorisés du département.
      </p>

      {/* Zone formulaire – à venir */}
      <div className="border border-dashed rounded-lg p-6 text-center text-gray-500">
        Formulaire de publication en cours d’implémentation
      </div>
    </main>
  );
}