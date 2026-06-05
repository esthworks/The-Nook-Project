"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function EditNotesForm({
  id,
  initialNotes,
}: {
  id: string;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");

  async function saveNotes() {
    const { error } = await supabase
      .from("entries")
      .update({ notes })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="mt-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        className="w-full rounded-lg border border-[#cdbda8] p-3"
      />

      <button
        onClick={saveNotes}
        className="mt-3 rounded-lg bg-[#2b241d] px-4 py-2 text-white"
      >
        Save notes
      </button>
    </div>
  );
}