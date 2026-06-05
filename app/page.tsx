import Link from "next/link";
import { supabase } from "../lib/supabase";
import AddEntryForm from "../components/AddEntryForm";
export const dynamic = "force-dynamic";
export default async function Home() {
  const { data } = await supabase
    .from("entries")
    .select("*");

  const books =
    data?.filter((entry) => entry.category === "book") ?? [];

  const movies =
    data?.filter((entry) => entry.category === "movie") ?? [];

  const series =
    data?.filter((entry) => entry.category === "series") ?? [];

  const music =
    data?.filter((entry) => entry.category === "music") ?? [];

  const exhibitions =
    data?.filter((entry) => entry.category === "exhibition") ?? [];

  const theatre =
    data?.filter((entry) => entry.category === "theatre") ?? [];

  function renderSection(
    title: string,
    entries: typeof books
  ) {
    return (
      <div className="mt-10">
        <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#cbbfae]">
          {title}
        </h2>

        {entries.length === 0 ? (
          <p className="text-[#7b6855]">
            No entries yet.
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Link
                href={`/entry/${entry.id}`}
                key={entry.id}
                className="block rounded-2xl border border-[#5a4632] bg-[#efe6d5] p-5 shadow-sm transition hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {entry.title}
                  </h2>

                  <span className="rounded-full bg-stone-100 px-3 py-1 text-sm">
                    {entry.status === "to_do"
                      ? "Want to read"
                      : entry.status}
                  </span>
                </div>

                <p className="mt-3 text-[#7b6855]">
                  {entry.category}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1f2a24] p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold text-[#efe6d5]">
          The Nook Project
        </h1>

        <div className="mt-3">
          <p className="text-stone-600">
            Keep track of what inspires you.
          </p>

          <AddEntryForm />
        </div>

        {renderSection("BOOKS", books)}
        {renderSection("MOVIES", movies)}
        {renderSection("SERIES", series)}
        {renderSection("MUSIC", music)}
        {renderSection("EXHIBITIONS", exhibitions)}
        {renderSection("THEATRE", theatre)}
      </div>
    </main>
  );
}