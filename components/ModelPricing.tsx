"use client";

import { useMemo, useState } from "react";
import type { CarModel, ServiceItem } from "@/lib/types";

function formatSom(price: number) {
  return `${price.toLocaleString("ru-RU")} so'm`;
}

export default function ModelPricing({
  carModels,
  services,
}: {
  carModels: CarModel[];
  services: ServiceItem[];
}) {
  const [activeId, setActiveId] = useState(carModels[0]?.id);
  const activeModel = carModels.find((m) => m.id === activeId) ?? carModels[0];

  const rows = useMemo(
    () => services.filter((s) => s.car_model === activeModel?.id),
    [services, activeModel]
  );

  if (!activeModel) return null;

  return (
    <section id="narxlar" className="mx-auto max-w-content px-6 py-16 md:py-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">
            Avtomobilingizni tanlang
          </h2>
          <p className="mt-2 max-w-[46ch] text-sm text-ink-soft">
            Har bir model uchun mavjud xizmatlar va narxlar avtomatik
            ochiladi.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {carModels.map((model) => {
          const isActive = model.id === activeModel.id;
          return (
            <button
              key={model.id}
              onClick={() => setActiveId(model.id)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {model.name}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl bg-bay">
        <div className="flex h-40 items-center justify-center border-b border-bay-line px-8 sm:h-48">
          <span className="font-display text-5xl font-extrabold text-rust sm:text-6xl">
            {activeModel.name}
          </span>
        </div>

        <div className="flex items-center justify-between px-6 py-3 text-[11px] tracking-wide text-paper/40">
          <span>
            {activeModel.name} — xizmatlar va narxlar
          </span>
          <span>diagnostika: yakunlandi</span>
        </div>

        <ul>
          {rows.map((row) => (
            <li
              key={row.id}
              className={`flex items-start justify-between gap-6 border-t border-bay-line px-6 py-4 ${
                row.is_bundle ? "bg-rust/10" : ""
              }`}
            >
              <div className="max-w-[60ch]">
                <p
                  className={`text-sm font-medium ${
                    row.is_bundle ? "text-rust" : "text-paper"
                  }`}
                >
                  {row.name}
                </p>
                {row.description && (
                  <p className="mt-0.5 text-xs text-paper/45">
                    {row.description}
                  </p>
                )}
              </div>
              <p
                className={`whitespace-nowrap text-sm font-semibold tab-nums ${
                  row.is_bundle ? "text-rust" : "text-paper/85"
                }`}
              >
                {row.price != null ? formatSom(row.price) : row.price_note}
              </p>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-paper/50">
              Bu model uchun narxlar hali kiritilmagan.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
