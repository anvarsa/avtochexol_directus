import type { Review } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={i < rating ? "#b5602a" : "none"}
          stroke={i < rating ? "#b5602a" : "#55504a"}
          strokeWidth="1.2"
        >
          <path d="M10 1.5 12.6 7l6 .9-4.3 4.2 1 6-5.3-2.8L4.7 18l1-6L1.4 7.9l6-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ items }: { items: Review[] }) {
  if (items.length === 0) return null;

  return (
    <section id="izohlar" className="bg-paper-dim">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <h2 className="mb-8 font-display text-3xl font-bold text-ink">
          Mijozlar izohlari
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((review) => (
            <div key={review.id} className="rounded-lg bg-paper p-5">
              <Stars rating={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {review.quote}
              </p>
              <p className="mt-4 text-xs font-medium text-ink-soft">
                {review.author_name}
                {review.car_model ? ` — ${review.car_model}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
