"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function AddEntryForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("book");
  const router = useRouter();

 async function addEntry() {
  const { error } = await supabase
    .from("entries")
    .insert([
      {
        title,
        category,
        status: "to_do",
      },
    ]);

    console.log(error);
alert(error ? error.message : "INSERT OK");

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }


  setTitle("");
setCategory("book");

  router.refresh();
}
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-lg font-semibold">
        Add a new entry
      </h2>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div className="mt-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border p-2"
        >
          <option value="book">Book</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="music">Music</option>
          <option value="exhibition">Exhibition</option>
          <option value="theatre">Theatre</option>
        </select>
      </div>

      <button
  onClick={addEntry}
  className="mt-4 rounded-lg bg-stone-800 px-4 py-2 text-white"
>
  Add
</button>

      <p className="mt-4 text-sm text-stone-500">
        {title} ({category})
      </p>
    </div>
  );
}