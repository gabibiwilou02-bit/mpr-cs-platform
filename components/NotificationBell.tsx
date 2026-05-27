"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";

type Notification = {
  id: string;
  user_id: string;
  lu: boolean;
};

const playSound = () => {
  const audio = new Audio("/sounds/notification.mp3");
  audio.volume = 0.7;
  audio.play().catch(() => {});
};

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // 1️⃣ Charger le nombre initial
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("lu", false);

      setCount(count ?? 0);

      // 2️⃣ Temps réel
      channel = supabase
        .channel("notifications-realtime")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload: RealtimePostgresInsertPayload<Notification>) => {
            if (!payload.new.lu) {
              setCount((c) => c + 1);
              playSound(); // 🔊 SON ICI
            }
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload: RealtimePostgresUpdatePayload<Notification>) => {
            if (payload.old.lu === false && payload.new.lu === true) {
              setCount((c) => Math.max(0, c - 1));
            }
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Link href="/notifications" className="relative inline-flex items-center">
      <span className="text-xl">🔔</span>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full animate-pulse">
          {count}
        </span>
      )}
    </Link>
  );
}