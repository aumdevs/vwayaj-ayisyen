"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { setNewsSavedAction } from "@/app/[locale]/(public)/news/actions";

export function SaveNewsButton({
  initialSaved,
  signedIn,
  slug
}: {
  initialSaved: boolean;
  signedIn: boolean;
  slug: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  if (!signedIn) {
    return (
      <span aria-disabled="true" className="button button-account-unavailable">
        <Bookmark aria-hidden="true" size={17} /> Anrejistreman ap vini byento
      </span>
    );
  }

  return (
    <button
      className="button"
      disabled={pending}
      onClick={() => {
        const nextSaved = !saved;
        startTransition(async () => {
          const result = await setNewsSavedAction(slug, nextSaved);
          if (result.status === "saved") setSaved(true);
          if (result.status === "removed") setSaved(false);
        });
      }}
      type="button"
    >
      {saved ? (
        <BookmarkCheck aria-hidden="true" size={17} />
      ) : (
        <Bookmark aria-hidden="true" size={17} />
      )}
      {pending ? "Tanpri tann..." : saved ? "Anrejistre" : "Anrejistre nouvèl la"}
    </button>
  );
}
