import type { DiagnosticMetric, SiteSettings } from "@/lib/types";

function ArcGauge({ metric }: { metric: DiagnosticMetric }) {
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const filled = (Math.min(100, Math.max(0, metric.percent)) / 100) * circumference;
  const color = metric.color === "amber" ? "#c9803f" : "#6f8890";

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80" aria-hidden>
        <path
          d="M10 70 A54 54 0 0 1 130 70"
          fill="none"
          stroke="#2a2e33"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M10 70 A54 54 0 0 1 130 70"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      <p className="mt-1 font-display text-xl font-bold text-paper">
        {metric.display_value}
      </p>
      <p className="text-sm text-paper/80">{metric.sublabel}</p>
      <p className="mt-0.5 text-[11px] tracking-wide text-paper/45">
        {metric.label}
      </p>
    </div>
  );
}

export default function Hero({
  settings,
  diagnostics,
}: {
  settings: SiteSettings;
  diagnostics: DiagnosticMetric[];
}) {
  const stats = [
    { value: settings.stat_models_count, label: "Avtomobil modeli" },
    { value: settings.stat_services_count, label: "Xizmat turi (jami)" },
    {
      value: `${settings.stat_avg_duration} ${settings.stat_avg_duration_unit}`,
      label: "O'rtacha bajarish muddati",
    },
  ];

  return (
    <section className="mx-auto grid max-w-content gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {settings.hero_title}
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          {settings.hero_description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#narxlar"
            className="rounded-md bg-rust px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-rust-deep"
          >
            {settings.hero_cta_primary_label}
          </a>
          <a
            href="#aloqa"
            className="rounded-md border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
          >
            {settings.hero_cta_secondary_label}
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-ink tab-nums">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl bg-bay p-7">
        <div className="flex items-center justify-between text-xs text-paper/50">
          <span>{settings.site_name} — diagnostika</span>
          <span className="tab-nums">jonli hisobot</span>
        </div>

        <div className="mt-8 flex justify-around">
          {diagnostics.map((metric) => (
            <ArcGauge key={metric.id} metric={metric} />
          ))}
        </div>

        <p className="mt-8 border-t border-bay-line pt-5 text-sm leading-relaxed text-paper/60">
          Har bir buyurtma — model, material va narx bo'yicha alohida
          hisoblanadi.
        </p>
      </div>
    </section>
  );
}
