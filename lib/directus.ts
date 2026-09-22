// lib/directus.ts
//
// Thin REST wrapper around Directus — no SDK dependency, so it drops
// into any Next.js App Router project as-is. Set these two env vars:
//
//   DIRECTUS_URL=https://cms.avtochexol.uz
//   DIRECTUS_TOKEN=your-static-or-service-token   (only needed if
//                                                    collections are
//                                                    not public-read)
//
// Every collection read goes through directusFetch(), which:
//   - builds the /items/{collection} URL with query params
//   - attaches the bearer token when present
//   - tags the request for Next's fetch cache (ISR) so pages
//     revalidate instead of going fully static or fully dynamic
//   - throws a readable error instead of a silent empty array,
//     so a broken CMS field shows up in your terminal, not as a
//     blank section in production

import type {
  Article,
  BeforeAfterItem,
  CarModel,
  DiagnosticMetric,
  HomePageData,
  MediaItem,
  PaymentMethod,
  Review,
  ServiceItem,
  SiteSettings,
} from "./types";

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

// Revalidate every 5 minutes by default — the workshop updates prices
// and photos by hand, not every second. Override per-call if needed.
const DEFAULT_REVALIDATE_SECONDS = 300;

interface DirectusListResponse<T> {
  data: T[];
}
interface DirectusItemResponse<T> {
  data: T;
}

async function directusFetch<T>(
  path: string,
  revalidate: number = DEFAULT_REVALIDATE_SECONDS
): Promise<T> {
  if (!DIRECTUS_URL) {
    throw new Error(
      "DIRECTUS_URL is not set. Add it to your .env.local, e.g. " +
        "DIRECTUS_URL=https://cms.avtochexol.uz"
    );
  }

  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    headers: DIRECTUS_TOKEN
      ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
      : undefined,
    next: { revalidate },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Directus request failed (${res.status}) for ${path}: ${body}`
    );
  }

  return res.json() as Promise<T>;
}

/** Builds a public asset URL for a Directus file id. Pass Directus
 * transform params (width/height/quality/format) straight through. */
export function directusAsset(
  fileId: string | null | undefined,
  params?: Record<string, string | number>
): string {
  if (!fileId) return "";
  const search = params
    ? "?" +
      Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join("&")
    : "";
  return `${DIRECTUS_URL}/assets/${fileId}${search}`;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await directusFetch<DirectusItemResponse<SiteSettings>>(
    "/items/site_settings" // singleton collection
  );
  return data;
}

export async function getDiagnosticMetrics(): Promise<DiagnosticMetric[]> {
  const { data } = await directusFetch<DirectusListResponse<DiagnosticMetric>>(
    "/items/diagnostic_metrics?sort=sort"
  );
  return data;
}

export async function getCarModels(): Promise<CarModel[]> {
  const { data } = await directusFetch<DirectusListResponse<CarModel>>(
    "/items/car_models?sort=sort"
  );
  return data;
}

export async function getServices(): Promise<ServiceItem[]> {
  const { data } = await directusFetch<DirectusListResponse<ServiceItem>>(
    "/items/services?sort=car_model,sort&limit=-1"
  );
  return data;
}

export async function getBeforeAfter(): Promise<BeforeAfterItem[]> {
  const { data } = await directusFetch<DirectusListResponse<BeforeAfterItem>>(
    "/items/before_after?limit=-1"
  );
  return data;
}

export async function getMedia(): Promise<MediaItem[]> {
  const { data } = await directusFetch<DirectusListResponse<MediaItem>>(
    "/items/media_items?sort=sort&limit=-1"
  );
  return data;
}

export async function getArticles(): Promise<Article[]> {
  const { data } = await directusFetch<DirectusListResponse<Article>>(
    "/items/articles?sort=-published_date&limit=6"
  );
  return data;
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const { data } = await directusFetch<DirectusListResponse<PaymentMethod>>(
    "/items/payment_methods?sort=sort"
  );
  return data;
}

export async function getReviews(): Promise<Review[]> {
  const { data } = await directusFetch<DirectusListResponse<Review>>(
    "/items/reviews?sort=sort&limit=-1"
  );
  return data;
}

/** One call for the whole home page. Runs every collection read in
 * parallel so a slow one doesn't serialize the rest. */
export async function getHomePageData(): Promise<HomePageData> {
  const [
    settings,
    diagnostics,
    carModels,
    services,
    beforeAfter,
    media,
    articles,
    paymentMethods,
    reviews,
  ] = await Promise.all([
    getSiteSettings(),
    getDiagnosticMetrics(),
    getCarModels(),
    getServices(),
    getBeforeAfter(),
    getMedia(),
    getArticles(),
    getPaymentMethods(),
    getReviews(),
  ]);

  return {
    settings,
    diagnostics,
    carModels,
    services,
    beforeAfter,
    media,
    articles,
    paymentMethods,
    reviews,
  };
}
