"use client";

import { useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function MotDePasseOubliePage() {
  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError("Impossible d’envoyer l’email. Vérifiez l’adresse.");
      return;
    }

    setMessage(
      "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception."
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Mot de passe oublié
        </h1>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        <input
          type="email"
          required
          placeholder="exemple@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-600"
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>

        <div className="mt-4 text-center">
          <Link href="/connexion" className="text-sm text-blue-600 underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </main>
  );
}