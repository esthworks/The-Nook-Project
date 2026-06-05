"use client";

import { supabase } from "../lib/supabase";

export default function RatingForm({
  id,
  rating,
}: {
  id: string;
  rating: number | null;
}) {
  async function setRating(value: number) {
    const { error } = await supabase
      .from("entries")
      .update({ rating: value })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="flex gap-1 text-3xl">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => setRating(value)}
        >
          {value <= (rating ?? 0) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
}