"use client";

import { supabase } from "../lib/supabase";

export default function StatusForm({
  id,
  status,
}: {
  id: string;
  status: string | null;
}) {
  async function updateStatus(value: string) {
    const { error } = await supabase
      .from("entries")
      .update({ status: value })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.reload();
  }

  return (
    <select
      value={status ?? "spotted"}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-full bg-[#d9ccb8] px-4 py-2 text-sm font-medium text-[#2b241d]"
    >
      <option value="spotted">Repéré</option>
      <option value="recommended">Recommandé</option>
      <option value="to_discover">À découvrir</option>
      <option value="in_progress">En cours</option>
      <option value="completed">Terminé</option>
      <option value="abandoned">Abandonné</option>
    </select>
  );
}