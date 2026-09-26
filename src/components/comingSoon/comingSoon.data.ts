import { AllImages } from "../../../public/images/AllImages";
import type { ComingSoonData } from "./comingSoon.types";

/**
 * Coming Soon Page Data matching Figma Node 40015107-376
 */
export const COMING_SOON_DATA: ComingSoonData = {
  badge: "Coming soon",
  headline: {
    part1: "Something new is ",
    part2: "on the way",
  },
  subtitle:
    "This part of the site is being prepared. In the meantime, our team is ready to answer any question about Passover 2027 and our year-round programs.",
  primaryCta: {
    label: "Explore Passover 2027",
    href: "/passover-collection-2027",
  },
  secondaryCta: {
    label: "Inquire",
    href: "/inquire",
  },
  backgroundImage: AllImages.comingSoon,
  logo: AllImages.logo,
  brandName: "Diamond Club Vacations",
  contacts: [
    {
      id: "phone",
      label: "+1 (555) 010-0142",
      href: "tel:+15550100142",
    },
    {
      id: "email",
      label: "info@diamondclubvacations.com",
      href: "mailto:info@diamondclubvacations.com",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
      isExternal: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://facebook.com",
      isExternal: true,
    },
  ],
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries & mutations:
//
// export const useGetComingSoonDataQuery = () => {
//   // GET: Fetch coming soon announcement text, expected launch dates & links
//   // return useGetComingSoonQuery();
//   return {
//     data: COMING_SOON_DATA,
//     isLoading: false,
//   };
// };
//
// export const useSubscribeComingSoonNotificationMutation = () => {
//   // POST: Subscribe email for early access notification
//   // const [subscribe, { isLoading }] = useSubscribeNotificationMutation();
//   // return { subscribe, isLoading };
// };
//
// export const useUpdateComingSoonContentMutation = () => {
//   // PATCH: Update coming soon headline, subtitle, or contact details
//   // const [updateContent, { isLoading }] = useUpdateComingSoonMutation();
//   // return { updateContent, isLoading };
// };
// =============================================================================

