import { AllImages } from "../../../public/images/AllImages";
import { resortHref } from "@/lib/routes";
import type { NotFoundData } from "./notFound.types";

/**
 * Not Found Page Data matching Figma Node 40015107-405
 */
export const NOT_FOUND_DATA: NotFoundData = {
  badge: "Error 404",
  code: "404",
  headline: {
    part1: "This page has ",
    part2: "checked out",
  },
  description:
    "The page you are looking for has moved or no longer exists. Try one of the links below, or start a new inquiry and we will help you directly.",
  primaryCta: {
    label: "Back to home",
    href: "/",
  },
  secondaryCta: {
    label: "Start an inquiry",
    href: "/inquire",
  },
  popularPagesTitle: "Popular pages",
  popularPages: [
    {
      id: "passover",
      title: "Passover Collection 2027",
      subtitle: "Three programs in the Riviera Maya and Cancun",
      href: "/offerings/passover-collection-2027",
    },
    {
      id: "casa-nizuc",
      title: "Casa Nizuc",
      subtitle: "Year-round luxury kosher hospitality",
      href: resortHref("passover-collection-2027", "blue", "casa-nizuc"),
    },
    {
      id: "weddings-events",
      title: "Weddings & Events",
      subtitle: "Celebrations designed and produced by our team",
      href: "/offerings/weddings-events",
    },
  ],
  image: AllImages.notFound,
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries & mutations:
//
// export const useGetNotFoundPopularPagesQuery = () => {
//   // GET: Dynamically fetch trending or curated popular pages to recommend
//   // return useGetPopularPagesQuery();
//   return {
//     data: NOT_FOUND_DATA.popularPages,
//     isLoading: false,
//   };
// };
//
// export const useLogNotFoundVisitMutation = () => {
//   // POST: Telemetry log of missing URL for broken link auditing
//   // const [logNotFound] = useLogMissingUrlMutation();
//   // return { logNotFound };
// };
// =============================================================================
