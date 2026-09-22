import { directusAsset } from "@/lib/directus";
import type { PaymentMethod, SiteSettings } from "@/lib/types";

export default function SiteFooter({
  settings,
  paymentMethods,
}: {
  settings: SiteSettings;
  paymentMethods: PaymentMethod[];
}) {
  return (
    <footer className="bg-bay text-paper/70">
      {paymentMethods.length > 0 && (
        <div className="border-b border-bay-line">
          <div className="mx-auto flex max-w-content flex-wrap items-center gap-6 px-6 py-6">
            <span className="text-xs tracking-wide text-paper/40">
              Bizda nasiya bor — to&apos;lov usullari:
            </span>
            {paymentMethods.map((pm) => (
              <img
                key={pm.id}
                src={directusAsset(pm.logo, { width: "120" })}
                alt={pm.name}
                className="h-6 w-auto opacity-80"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-content gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-paper">
            {settings.site_name}
          </p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed">
            Avtomobil saloni uchun shumoizolyatsiya, chexol, potolok va
            suv o&apos;tkazmaslik xizmatlari — sifatli material, aniq
            narx.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/40">
            Xizmatlar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Shumoizolyatsiya</li>
            <li>Chexol tikish</li>
            <li>Potolok almashtirish</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/40">
            Havolalar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#ishlarimiz" className="hover:text-paper">Ishlarimiz</a></li>
            <li><a href="#izohlar" className="hover:text-paper">Izohlar</a></li>
            <li><a href="#maqolalar" className="hover:text-paper">Maqolalar</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
