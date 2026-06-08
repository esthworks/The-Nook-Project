import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import EditNotesForm from "../../../components/EditNotesForm";
import RatingForm from "../../../components/RatingForm";
import EditEntryDetailsForm from "../../../components/EditEntryDetailsForm";
import StatusForm from "../../../components/StatusForm";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: entry } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .single();

  return (
  <main className="min-h-screen bg-[#1f2a24] p-8">
    <div className="mx-auto max-w-3xl">

     <Link
  href="/"
  className="mb-6 inline-block text-[#efe6d5] hover:underline"
>
  ← Back to library
</Link>

      <div className="rounded-3xl border border-[#5a4632] bg-[#efe6d5] p-8 shadow-lg">

        <div className="mb-6 flex h-56 items-center justify-center rounded-2xl bg-[#d9ccb8] text-7xl">
          📚
        </div>

        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#7b6855]">
          {entry?.category}
        </p>

        <h1 className="text-4xl font-bold text-[#2b241d]">
          {entry?.title}
        </h1>

         <div className="mt-6">
  <StatusForm
    id={entry!.id}
    status={entry?.status}
  />
</div>


<EditEntryDetailsForm
  id={entry.id}
  category={entry.category}

  initialAuthor={entry.author}
  initialDirector={entry.director}

  initialArtist={entry.artist}
  initialAlbum={entry.album}

  initialVenue={entry.venue}

  initialExperienceDate={entry.experience_date}
  initialStartDate={entry.start_date}
  initialEndDate={entry.end_date}

  initialSeenInCinema={entry.seen_in_cinema}
/>


<div className="mt-6">
  <h2 className="mb-2 text-lg font-semibold text-[#2b241d]">
    Rating
  </h2>

  <RatingForm
    id={entry!.id}
    rating={entry?.rating}
  />
</div>
    
         <div className="mt-8 border-t border-[#cdbda8] pt-6">
  <h2 className="mb-3 text-lg font-semibold text-[#2b241d]">
    Notes
  </h2>

  <EditNotesForm
  id={entry!.id}
  initialNotes={entry?.notes}
/>

        </div>

      </div>
    </div>
  </main>
);
}