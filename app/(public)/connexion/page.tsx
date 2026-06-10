"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // ✅ attendre que la session soit bien établie
    const { data } = await supabase.auth.getSession();

    setLoading(false);

    if (!data.session) {
      setError("Connexion non établie. Veuillez réessayer.");
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <section className="bg-gray-100 px-6 pt-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Connexion
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </div>
      </div>
    </section>
  );
}