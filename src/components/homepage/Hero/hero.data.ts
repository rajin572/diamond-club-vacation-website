export const HERO_CONTENT = {
  headline: "Luxury kosher hospitality, worldwide",
  subtext:
    "Passover programs, year-round vacations, weddings and private events at five-diamond resorts in the Riviera Maya and Cancun.",
  cta: {
    label: "Explore Passover 2027",
    href: "/offerings/passover-collection-2027",
  },
  video: {
    src: "/video/heroVideo.mp4",
    poster: "/images/homepage/heroPoster.jpg",
    alt: "Oceanfront pool deck at a five-diamond Diamond Club Vacations resort",
  },
} as const;

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following query:
//
// export const useGetHeroContent = () => {
//   // GET: Fetch hero headline/subtext/CTA/video dynamically (e.g. seasonal swaps)
//   // return useGetHeroContentQuery();
//   return { data: HERO_CONTENT, isLoading: false };
// };
// =============================================================================
