import { getHomePageData } from "../lib/directus";
import SiteHeader from "../components/SiteHeader";
import CountdownBanner from "../components/CountdownBanner";
import Hero from "../components/Hero";
import ModelPricing from "../components/ModelPricing";
import BeforeAfter from "../components/BeforeAfter";
import MediaGallery from "../components/MediaGallery";
import Reviews from "../components/Reviews";
import Articles from "../components/Articles";
import ContactSection from "../components/ContactSection";
import SiteFooter from "../components/SiteFooter";

// Revalidate the whole page every 5 minutes (ISR). Directus content
// changes by hand, not by the second, so this keeps pages fast while
// staying fresh. Drop to `export const dynamic = "force-dynamic"` if
// you'd rather always hit Directus live.
export const revalidate = 300;

export default async function HomePage() {
  const {
    settings,
    diagnostics,
    carModels,
    services,
    beforeAfter,
    media,
    articles,
    paymentMethods,
    reviews,
  } = await getHomePageData();

  return (
    <>
      <SiteHeader settings={settings} />
      <CountdownBanner
        text={settings.discount_banner_text}
        deadline={settings.discount_deadline}
      />
      <main>
        <Hero settings={settings} diagnostics={diagnostics} />
        <ModelPricing carModels={carModels} services={services} />
        <BeforeAfter items={beforeAfter} />
        <MediaGallery items={media} />
        <Reviews items={reviews} />
        <Articles items={articles} />
        <ContactSection settings={settings} carModels={carModels} />
      </main>
      <SiteFooter settings={settings} paymentMethods={paymentMethods} />
    </>
  );
}
