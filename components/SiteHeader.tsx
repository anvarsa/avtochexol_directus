import type { SiteSettings } from "@/lib/types";

const NAV = [
  { href: "#narxlar", label: "Narxlar" },
  { href: "#ishlarimiz", label: "Ishlarimiz" },
  { href: "#media", label: "Video/Foto" },
  { href: "#izohlar", label: "Izohlar" },
  { href: "#maqolalar", label: "Maqolalar" },
  { href: "#aloqa", label: "Aloqa" },
];

export default function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M2 10c2-4 4-6 8-6s6 2 8 6-4 6-8 6-6-2-8-6Z"
              stroke="#b5602a"
              strokeWidth="1.6"
            />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            {settings.site_name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={settings.phone_href}
            className="hidden text-sm font-medium tab-nums text-ink md:block"
          >
            {settings.phone_display}
          </a>
          <a
            href={settings.telegram_url}
            aria-label="Telegram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-rust hover:text-rust"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21 4 3 11l6 2m12-9-4 16-8-6m12-10L9 13"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={settings.instagram_url}
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-rust hover:text-rust"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
      <div className="stitch" />
    </header>
  );
}
