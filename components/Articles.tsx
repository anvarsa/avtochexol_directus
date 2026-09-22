import { directusAsset } from "@/lib/directus";
import type { Article } from "@/lib/types";

export default function Articles({ items }: { items: Article[] }) {
  return (
    <section id="maqolalar" className="bg-paper-dim">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-ink">
            Maqolalar
          </h2>
          <p className="max-w-[46ch] text-sm text-ink-soft">
            Mijozlar ko&apos;p beradigan savollarga javoblar — nega bu
            xizmatlar kerak, qachon va qaysi birini tanlash lozim.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <a
              key={article.id}
              href={`/maqolalar/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg bg-paper"
            >
              <div className="aspect-[16/10] overflow-hidden bg-steel">
                {article.cover_image ? (
                  <img
                    src={directusAsset(article.cover_image, { width: "600" })}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs tracking-wide text-paper/40">
                    Maqola rasmi
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-medium text-rust">
                  {article.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">
                  {article.excerpt}
                </p>
                <span className="mt-4 text-sm font-medium text-ink underline decoration-ink/20 underline-offset-4 group-hover:decoration-rust">
                  Batafsil o&apos;qish
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
