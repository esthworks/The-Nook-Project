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
    icon: string,
    entries: typeof books
  ) {
    const statusLabels: Record<string, string> = {
      spotted: "Repéré",
      recommended: "Recommandé",
      to_discover: "À découvrir",
      in_progress: "En cours",
      completed: "Terminé",
      abandoned: "Abandonné",
    };

    return (
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-semibold text-[#f4ecdf]">
          {icon} {title}
        </h2>

        {entries.length === 0 ? (
          <p className="text-[#cbbfae]">
            No entries yet.
          </p>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-4">
            {entries.map((entry) => (
              <Link
                href={`/entry/${entry.id}`}
                key={entry.id}
                className="flex h-64 w-44 flex-shrink-0 flex-col rounded-3xl border border-[#5a4632] bg-[#efe6d5] p-5 shadow-md transition hover:-translate-y-1"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">
                    {icon}
                  </span>

                  <h3 className="text-lg font-semibold text-[#2b241d]">
                    {entry.title}
                  </h3>
                </div>

                <div className="flex-1" />

                <div className="mb-3">
                  <span className="rounded-full bg-[#d9ccb8] px-3 py-1 text-sm text-[#2b241d]">
                    {statusLabels[entry.status] ?? entry.status}
                  </span>
                </div>

                <div className="text-xl">
                  {"⭐".repeat(entry.rating ?? 0)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#314238] p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16">
          <h1 className="text-6xl font-bold text-[#efe6d5]">
            Nook
          </h1>

          <p className="mt-3 text-[#cbbfae]">
            Keep track of what inspires you.
          </p>

          <div className="mt-8 rounded-3xl bg-[#3a4d43] p-6">
            <AddEntryForm />
          </div>
        </header>

        {renderSection("Books", "📚", books)}
        {renderSection("Movies", "🎬", movies)}
        {renderSection("Series", "📺", series)}
        {renderSection("Music", "🎵", music)}
        {renderSection("Exhibitions", "🖼️", exhibitions)}
        {renderSection("Theatre", "🎭", theatre)}
      </div>
    </main>
  );
}