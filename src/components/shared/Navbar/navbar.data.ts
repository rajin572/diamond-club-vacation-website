import { NavLinkItem, NavFooterColumn } from "./navbar.types";

/**
 * Primary Navigation Items based on Figma specifications:
 * node-id=40015047-229
 */
export const PRIMARY_NAV_ITEMS: NavLinkItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "passover-2027",
    label: "Passover 2027",
    href: "/passover-collection-2027",
    isItalic: true,
  },
  {
    id: "casa-nizuc",
    label: "Casa Nizuc",
    href: "/#casa-nizuc",
  },
  {
    id: "weddings-events",
    label: "Weddings & Events",
    href: "/#weddings-events",
  },
  {
    id: "private-events",
    label: "Private Events",
    href: "/#private-events",
  },
];

/**
 * Secondary Footer Columns matching Figma Menu Footer:
 * Passover 2027, Contact us, Social media
 */
export const FOOTER_NAV_COLUMNS: NavFooterColumn[] = [
  {
    id: "passover-collection",
    title: "Passover 2027",
    links: [
      { label: "Diamond Club Reserve", href: "/passover-collection-2027/diamond-club-reserve" },
      { label: "Guttaway a DCV Program", href: "/passover-collection-2027/guttaway" },
      { label: "Diamond Club Blue", href: "/passover-collection-2027/blue" },
    ],
  },
  {
    id: "contact-info",
    title: "Contact us",
    links: [
      { label: "[Phone number]", href: "tel:+15550100142" },
      { label: "[Email address]", href: "mailto:info@diamondclubvacations.com" },
      { label: "Miami, Florida", href: "/#contact" },
    ],
  },
  {
    id: "social-media",
    title: "Social media",
    links: [
      { label: "Instagram", href: "https://instagram.com", isExternal: true },
      { label: "Facebook", href: "https://facebook.com", isExternal: true },
      { label: "YouTube", href: "https://youtube.com", isExternal: true },
    ],
  },
];

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries/mutations:
//
// export const useGetNavbarData = () => {
//   // GET: Fetch navigation items, contact info, and status dynamically
//   // return useGetNavbarConfigQuery();
//   return { data: { primary: PRIMARY_NAV_ITEMS, footer: FOOTER_NAV_COLUMNS }, isLoading: false };
// };
//
// export const useUpdateNavbarConfig = () => {
//   // PATCH: Update navigation badge or active promo items
//   // const [updateConfig, { isLoading }] = useUpdateNavbarMutation();
//   // return { updateConfig, isLoading };
// };
//
// export const useDeleteNavbarItem = () => {
//   // DELETE: Remove a promotional item from navbar
//   // const [deleteItem, { isLoading }] = useDeleteNavbarItemMutation();
//   // return { deleteItem, isLoading };
// };
// =============================================================================

