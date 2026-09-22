import { AllImages } from "../../../../public/images/AllImages";
import type { DiamondClubVacationsContent } from "./diamondClubVacations.types";

/**
 * Diamond Club Vacations Section Data
 * Figma Node: 40015055:313 (Intro)
 * https://www.figma.com/design/dUJbxbksQxLSZUWYdmmpU8/Diamond-Club-Vacation-Web?node-id=40015055-313
 */
export const DIAMOND_CLUB_VACATIONS_DATA: DiamondClubVacationsContent = {
  badge: "Diamond Club Vacations",
  headline: {
    primary: "Where luxury",
    accent: "meets kosher",
  },
  paragraphs: [
    "Diamond Club Vacations creates luxury kosher experiences at five-diamond resorts, from Passover programs to year-round stays at Casa Nizuc.",
    "Dining under trusted kosher supervision, programs for kids and teens, scholars and nightly entertainment: every detail is handled so your family can simply enjoy the stay.",
  ],
  images: {
    left: {
      src: AllImages.aboutPoolLeft,
      alt: "Luxury resort swimming pool surrounded by tropical palm trees at Diamond Club Vacations",
    },
    right: {
      src: AllImages.aboutPoolRight,
      alt: "Resort swimming pool with modern architecture and deck chairs at Diamond Club Vacations",
    },
  },
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries/mutations:
//
// export const useGetDiamondClubVacationsSectionQuery = () => {
//   // GET: Fetch intro/about section data dynamically from CMS or API
//   // return useGetIntroSectionQuery();
//   return { data: DIAMOND_CLUB_VACATIONS_DATA, isLoading: false };
// };
//
// export const useCreateDiamondClubVacationsContentMutation = () => {
//   // POST: Create initial intro section content
//   // const [createIntroContent, { isLoading }] = useCreateIntroContentMutation();
//   // return { createIntroContent, isLoading };
// };
//
// export const useUpdateDiamondClubVacationsSectionMutation = () => {
//   // PATCH: Update intro section headline, paragraphs, or images
//   // const [updateIntroSection, { isLoading }] = useUpdateIntroSectionMutation();
//   // return { updateIntroSection, isLoading };
// };
//
// export const useDeleteDiamondClubVacationsMediaMutation = () => {
//   // DELETE: Remove or reset section media assets
//   // const [deleteMedia, { isLoading }] = useDeleteIntroMediaMutation();
//   // return { deleteMedia, isLoading };
// };
// =============================================================================

