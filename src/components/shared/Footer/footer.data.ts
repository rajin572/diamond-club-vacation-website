import { PRIMARY_NAV_ITEMS, FOOTER_NAV_COLUMNS } from "../Navbar/navbar.data";
import { NavFooterColumn } from "../Navbar/navbar.types";
import { FooterLegalLink } from "./footer.types";

/**
 * Brand blurb under the footer logo. Kept separate from `siteConfig.description`
 * (SEO/meta copy) -- this is the shorter on-page marketing line from Figma.
 */
export const FOOTER_TAGLINE =
  "Luxury kosher hospitality at five-diamond resorts, for Passover and all year round.";

/** Footer-only column: not part of the mobile menu's 3-column footer. */
const SITEMAP_COLUMN: NavFooterColumn = {
  id: "sitemap",
  title: "Sitemap",
  links: [
    ...PRIMARY_NAV_ITEMS.map(({ label, href }) => ({ label, href })),
    { label: "Inquire", href: "/inquire" },
  ],
};

const passoverColumn = FOOTER_NAV_COLUMNS.find((col) => col.id === "passover-collection")!;
const socialColumn = FOOTER_NAV_COLUMNS.find((col) => col.id === "social-media")!;
const contactColumn = FOOTER_NAV_COLUMNS.find((col) => col.id === "contact-info")!;

/**
 * Reuses the same Passover/Social/Contact link data as the mobile nav menu
 * (single source of truth for hrefs) and reorders it to match the site
 * footer's Figma layout: Sitemap, Passover 2027, Social media, Contact us.
 */
export const FOOTER_COLUMNS: NavFooterColumn[] = [
  SITEMAP_COLUMN,
  passoverColumn,
  socialColumn,
  contactColumn,
];

export const FOOTER_LEGAL_LINKS: FooterLegalLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries:
//
// export const useGetFooterData = () => {
//   // GET: Fetch footer sitemap/contact/social columns + tagline dynamically
//   // return useGetFooterConfigQuery();
//   return { data: { columns: FOOTER_COLUMNS, tagline: FOOTER_TAGLINE }, isLoading: false };
// };
// =============================================================================
