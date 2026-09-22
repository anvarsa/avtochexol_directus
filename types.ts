// lib/types.ts
// TypeScript shapes matching the Directus collections described in
// README-DIRECTUS.md. Adjust field names here if you name things
// differently inside Directus — this file is the single source of
// truth the rest of the app reads against.

export interface SiteSettings {
  site_name: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_cta_primary_label: string;
  hero_cta_secondary_label: string;
  phone_display: string;
  phone_href: string;
  telegram_url: string;
  instagram_url: string;
  address: string;
  map_query: string;
  discount_banner_text: string;
  discount_deadline: string; // ISO datetime, countdown target
  stat_models_count: string; // "10+"
  stat_services_count: string; // "94"
  stat_avg_duration: string; // "1"
  stat_avg_duration_unit: string; // "kun"
}

export interface DiagnosticMetric {
  id: number;
  sort: number;
  label: string; // "SHUMOIZOLYATSIYA"
  display_value: string; // "-18dB"
  sublabel: string; // "Shovqin"
  percent: number; // 0-100, drives the arc fill
  color: "amber" | "steel";
}

export interface CarModel {
  id: number;
  sort: number;
  slug: string;
  name: string; // "Damas"
}

export interface ServiceItem {
  id: number;
  car_model: number; // relation -> CarModel.id
  sort: number;
  name: string;
  description: string;
  price: number | null; // null when price_note should show instead
  price_note: string | null; // e.g. "So'rov bo'yicha"
  is_bundle: boolean; // true for "Full Premium" style rows
}

export interface BeforeAfterItem {
  id: number;
  car_model: number | null;
  before_image: string; // Directus file id
  after_image: string; // Directus file id
  caption: string;
}

export interface MediaItem {
  id: number;
  sort: number;
  kind: "photo" | "video";
  file: string; // Directus file id (image) or video file id
  thumbnail: string | null; // for videos
  caption: string;
}

export interface Article {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  published_date: string;
}

export interface PaymentMethod {
  id: number;
  sort: number;
  name: string;
  logo: string; // Directus file id
}

export interface Review {
  id: number;
  sort: number;
  author_name: string;
  car_model: string | null;
  rating: number; // 1-5
  quote: string;
  avatar: string | null; // Directus file id, optional
}

export interface HomePageData {
  settings: SiteSettings;
  diagnostics: DiagnosticMetric[];
  carModels: CarModel[];
  services: ServiceItem[];
  beforeAfter: BeforeAfterItem[];
  media: MediaItem[];
  articles: Article[];
  paymentMethods: PaymentMethod[];
  reviews: Review[];
}
