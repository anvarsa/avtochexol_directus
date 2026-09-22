"use client";

import { useState } from "react";
import type { CarModel, SiteSettings } from "@/lib/types";

const CHANNEL_ICONS = {
  phone: (
    <path
      d="M4 3h3l1.5 4L7 8.5a10 10 0 0 0 4.5 4.5L13 11.5l4 1.5v3a2 2 0 0 1-2.2 2A15 15 0 0 1 2 5.2 2 2 0 0 1 4 3Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  telegram: (
    <path
      d="M18 3 2 9.5l5 1.7M18 3l-3 14-6.7-5M18 3 8.3 12.2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  pin: (
    <path
      d="M10 18s6-5.2 6-9.6A6 6 0 0 0 4 8.4C4 12.8 10 18 10 18Zm0-7a2.6 2.6 0 1 0 0-5.2A2.6 2.6 0 0 0 10 11Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
};

function ChannelRow({
  icon,
  label,
  value,
  href,
}: {
  icon: keyof typeof CHANNEL_ICONS;
  label: string;
  value?: string;
  href?: string;
}) {
  if (!value) return null;

  const content = (
    <div className="flex items-center gap-4 rounded-lg bg-paper-dim px-5 py-4">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-rust">
        {CHANNEL_ICONS[icon]}
      </svg>
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-sm text-ink-soft">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

export default function ContactSection({
  settings,
  carModels = [],
}: {
  settings?: SiteSettings;
  carModels?: CarModel[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form)),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const mapQuery = settings?.map_query ?? "Tashkent";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <section id="aloqa" className="mx-auto max-w-content px-6 py-16 md:py-24">
      <h2 className="font-display text-2xl font-bold text-ink">
        Biz bilan aloqa
      </h2>
      <p className="mt-2 max-w-[52ch] text-sm text-ink-soft">
        Savolingiz bormi yoki avtomobilingiz uchun narx bilmoqchimisiz?
        Quyidagi kanallardan birini tanlang.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          {settings?.phone_display && (
            <ChannelRow
              icon="phone"
              label="Telefon"
              value={settings.phone_display}
              href={settings.phone_href}
            />
          )}

          {settings?.telegram_url && (
            <ChannelRow
              icon="telegram"
              label="Telegram"
              value={settings.telegram_url.replace(/^https?:\/\//, "")}
              href={settings.telegram_url}
            />
          )}

          {settings?.instagram_url && (
            <ChannelRow
              icon="instagram"
              label="Instagram"
              value={settings.instagram_url.replace(/^https?:\/\//, "")}
              href={settings.instagram_url}
            />
          )}

          {settings?.address && (
            <ChannelRow icon="pin" label="Manzil" value={settings.address} />
          )}

          <div className="overflow-hidden rounded-lg">
            <iframe
              title="Manzil xaritada"
              src={mapSrc}
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-ink-soft/70">
            Xaritani o&apos;zgartirish uchun Directus&apos;dagi
            site_settings → map_query maydonini yangilang.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-paper-dim p-6"
        >
          <h3 className="font-display text-lg font-semibold text-ink">
            Tez murojaat qoldiring
          </h3>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">
              Ismingiz
            </label>
            <input
              name="name"
              required
              placeholder="Ismingiz"
              className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-rust"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">
              Telefon raqamingiz
            </label>
            <input
              name="phone"
              required
              placeholder="+998 __ ___ __ __"
              className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-rust"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">
              Avtomobil modeli
            </label>
            <select
              name="car_model"
              className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-rust"
            >
              {carModels.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">
              Xabar (ixtiyoriy)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Qaysi xizmat kerak?"
              className="w-full resize-none rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-rust"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-rust px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-rust-deep disabled:opacity-60"
          >
            {status === "sending" ? "Yuborilmoqda..." : "Telegramga yuborish"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-ok">So&apos;rovingiz yuborildi.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-rust">
              Yuborilmadi, iltimos qayta urinib ko&apos;ring yoki
              qo&apos;ng&apos;iroq qiling.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}