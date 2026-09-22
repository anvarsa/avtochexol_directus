"use client";

import { useState } from "react";
import { directusAsset } from "@/lib/directus";
import type { MediaItem } from "@/lib/types";

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const [tab, setTab] = useState<"video" | "photo">("photo");
  const filtered = items.filter((item) => item.kind === tab);

  return (
    <section id="media" className="mx-auto max-w-content px-6 py-16 md:py-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">
            Qilingan ishlar
          </h2>
          <p className="mt-2 max-w-[46ch] text-sm text-ink-soft">
            Har bir loyihaning video va foto lavhalari — jarayon
            boshidan oxirigacha.
          </p>
        </div>
        <div className="flex gap-2">
          {(["video", "photo"] as const).map((kind) => (
            <button
              key={kind}
              onClick={() => setTab(kind)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                tab === kind
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {kind === "video" ? "Videolar" : "Rasmlar"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-paper-dim"
            >
              <img
                src={directusAsset(item.thumbnail ?? item.file, {
                  width: "500",
                })}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.kind === "video" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/70">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#f5f1e8">
                      <path d="M3 1.5v11l9-5.5-9-5.5Z" />
                    </svg>
                  </span>
                </span>
              )}
              {item.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-2 py-1.5 text-[11px] text-paper">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-soft">Hozircha bu bo&apos;limda material yo&apos;q.</p>
      )}
    </section>
  );
}
