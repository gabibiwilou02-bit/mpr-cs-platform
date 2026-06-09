"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function InscriptionPage() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nom,
          prenom,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Inscription réussie. Vérifiez votre email pour confirmer votre compte."
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow max-w-lg w-full">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Inscription
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Créez votre compte pour rejoindre la plateforme officielle
          du Ministère Pensée Renouvelée & Club des Semeurs (MPR & CS).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            required
          />

          <p className="text-sm text-gray-600 bg-gray-50 border rounded p-3">
            L’inscription à la plateforme ne vous engage pas automatiquement
            comme membre d’un département.
            <br />
            <strong>
              Toute intégration se fait par une demande formelle depuis la page
              du département concerné.
            </strong>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S’inscrire"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-red-600 mt-4">{message}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Vous avez déjà un compte ?{" "}
          <a href="/connexion" className="text-blue-700 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </main>
  );
}