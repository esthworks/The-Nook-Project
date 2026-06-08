"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function EditEntryDetailsForm({
  id,
  category,

  initialAuthor,
  initialDirector,

  initialArtist,
  initialAlbum,

  initialVenue,

  initialExperienceDate,
  initialStartDate,
  initialEndDate,

  initialSeenInCinema,
}: {
  id: string;
  category: string;

  initialAuthor: string | null;
  initialDirector: string | null;

  initialArtist: string | null;
  initialAlbum: string | null;

  initialVenue: string | null;

  initialExperienceDate: string | null;
  initialStartDate: string | null;
  initialEndDate: string | null;

  initialSeenInCinema: boolean | null;
}) {
  const [author, setAuthor] = useState(initialAuthor ?? "");
  const [director, setDirector] = useState(initialDirector ?? "");

  const [artist, setArtist] = useState(initialArtist ?? "");
  const [album, setAlbum] = useState(initialAlbum ?? "");

  const [venue, setVenue] = useState(initialVenue ?? "");

  const [experienceDate, setExperienceDate] = useState(
    initialExperienceDate ?? ""
  );

  const [startDate, setStartDate] = useState(
    initialStartDate ?? ""
  );

  const [endDate, setEndDate] = useState(
    initialEndDate ?? ""
  );

  const [seenInCinema, setSeenInCinema] = useState(
    initialSeenInCinema ?? false
  );

  async function saveField(values: Record<string, unknown>) {
    const { error } = await supabase
      .from("entries")
      .update(values)
      .eq("id", id);

    if (error) {
      alert(error.message);
    }
  }

  function getExperienceLabel() {
    switch (category) {
      case "book":
        return "Finished";

      case "movie":
        return "Watched";

      case "series":
        return "Finished";

      case "music":
        return "Discovered";

      case "exhibition":
        return "Visited";

      case "theatre":
        return "Seen";

      default:
        return "Date";
    }
  }

  return (
    <div className="mt-6 space-y-4">

      {category === "book" && (
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={() => saveField({ author })}
          className="w-full rounded-lg border border-[#cdbda8] p-2"
        />
      )}

      {category === "movie" && (
        <>
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            onBlur={() => saveField({ director })}
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={seenInCinema}
              onChange={(e) => {
                setSeenInCinema(e.target.checked);

                saveField({
                  seen_in_cinema: e.target.checked,
                });
              }}
            />
            Seen in cinema
          </label>
        </>
      )}

      {category === "music" && (
        <>
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onBlur={() => saveField({ artist })}
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />

          <input
            type="text"
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            onBlur={() => saveField({ album })}
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />
        </>
      )}

      {(category === "exhibition" ||
        category === "theatre") && (
        <>
          {category === "theatre" && (
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onBlur={() => saveField({ author })}
              className="w-full rounded-lg border border-[#cdbda8] p-2"
            />
          )}

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            onBlur={() => saveField({ venue })}
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={() =>
              saveField({ start_date: startDate })
            }
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={() =>
              saveField({ end_date: endDate })
            }
            className="w-full rounded-lg border border-[#cdbda8] p-2"
          />
        </>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-[#2b241d]">
          {getExperienceLabel()}
        </label>

        <input
          type="date"
          value={experienceDate}
          onChange={(e) =>
            setExperienceDate(e.target.value)
          }
          onBlur={() =>
            saveField({
              experience_date: experienceDate,
            })
          }
          className="w-full rounded-lg border border-[#cdbda8] p-2"
        />
      </div>

    </div>
  );
}