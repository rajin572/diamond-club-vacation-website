/**
 * Single source of truth for site-wide facts used by metadata, JSON-LD structured
 * data, and the sitemap/robots files.
 *
 * Contact details and `siteUrl` below are PLACEHOLDERS — no real production
 * domain or business address has been confirmed yet. Override `siteUrl` by
 * setting NEXT_PUBLIC_SITE_URL once the real production domain is known, and
 * replace `contact` with the real business details before launch.
 */
export const siteConfig = {
  name: "Diamond Club Vacation",
  title: "Diamond Club Vacation | Exclusive Points-Based Vacation Club",
  description:
    "Join Diamond Club Vacation and unlock flexible points, premium resort stays, and dedicated concierge support for members worldwide.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.diamondclubvacation.com",
  ogImage: "/images/homepage/heroBackground.jpg",
  contact: {
    phone: "+1 (555) 010-0142",
    email: "support@diamondclubvacation.com",
    address: {
      streetAddress: "100 Ocean Vista Drive, Suite 200",
      addressLocality: "Miami",
      postalCode: "33131",
      addressCountry: "US",
    },
  },
} as const;
