"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  titre: string;
  message: string;
  lu: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadAndMarkAsRead = async () => {
      try {
        // ✅ Import dynamique (ANTI prerender crash)
        const { supabase } = await import("@/lib/supabaseClient");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!mounted || userError || !user) {
          setLoading(false);
          return;
        }

        // 1️⃣ Charger les notifications
        const { data, error } = await supabase
          .from("notifications")
          .select("id, titre, message, lu, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!mounted) return;

        if (error) {
          console.error("Erreur chargement notifications:", error);
          setLoading(false);
          return;
        }

        setNotifications(data ?? []);
        setLoading(false);

        // 2️⃣ Marquer comme lues (DB)
        await supabase
          .from("notifications")
          .update({ lu: true })
          .eq("user_id", user.id)
          .eq("lu", false);

        // 3️⃣ Mise à jour locale instantanée
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, lu: true }))
        );
      } catch (err) {
        console.error("Erreur notifications:", err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAndMarkAsRead();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p>Chargement…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">Aucune notification.</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded border transition ${
            n.lu ? "bg-gray-50" : "bg-blue-50 border-blue-200"
          }`}
        >
          <p className="font-semibold">{n.titre}</p>

          <p className="text-sm text-gray-700 mt-1">
            {n.message}
          </p>

          <span className="text-xs text-gray-400 block mt-2">
            {new Date(n.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}