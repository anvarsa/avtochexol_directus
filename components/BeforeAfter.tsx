"use client";

import { useState } from "react";
import { directusAsset } from "@/lib/directus";
import type { BeforeAfterItem } from "@/lib/types";

function Slider({ item }: { item: BeforeAfterItem }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-dim">
      <img
        src={directusAsset(item.after_image, { width: "800" })}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={directusAsset(item.before_image, { width: "800" })}
          alt=""
          className="h-full w-full object-cover"
          style={{ width: `${10000 / position}%`, maxWidth: "none" }}
        />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-paper"
        style={{ left: `${position}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Oldin / keyin taqqoslash"
        className="absolute inset-x-0 bottom-3 mx-auto w-[85%] accent-rust"
      />
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded bg-ink/70 px-3 py-1 text-xs text-paper">
        {item.caption}
      </p>
    </div>
  );
}

export default function BeforeAfter({ items }: { items: BeforeAfterItem[] }) {
  return (
    <section className="bg-paper-dim">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-ink">
            Oldin / keyin
          </h2>
          <p className="max-w-[38ch] text-sm text-ink-soft">
            Suratni chapga-o&apos;ngga suring — har bir ish qanday
            boshlanib, qanday tugaganini ko&apos;ring.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Slider key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">
            Hali oldin/keyin namunalari qo&apos;shilmagan.
          </p>
        )}
      </div>
    </section>
  );
}
