"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-end items-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Connexion
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="text-center">
            <a
              href="/mot-de-passe"
              className="text-sm text-blue-600 underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}