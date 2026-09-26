import { AllImages } from "../../../public/images/AllImages";
import { ScholarsPageData } from "./scholars.types";

export const scholarsData: ScholarsPageData = {
  programId: "diamond-club-reserve",
  programName: "Diamond Club Reserve",
  hero: {
    badge: "Experiences",
    titlePart1: "Sch",
    titlePart2: "olars",
    description:
      "Inspiring talks, classes and tefillah led by renowned rabbis and speakers throughout the holiday.",
  },
  scholars: [
    {
      id: "rabbi-chanan-gordon",
      name: "Rabbi Chanan Gordon",
      nameHighlight: {
        first: "Rabbi Chanan ",
        last: "Gordon",
      },
      role: "Scholar in residence",
      shortBio:
        "Rabbi Shalom Rubanowitz brings a unique blend of Los Angeles and Israeli Jewish influence to his rabbinics. He spent a number of years as a child and teen studying in the holy cities of Tzefat and Jerusalem, and was an active member of the Religious Zionist movement Bnei Akiva.",
      fullBio:
        "Rabbi Shalom Rubanowitz brings a unique blend of Los Angeles and Israeli Jewish influence to his rabbinics. He spent a number of years as a child and teen studying in the holy cities of Tzefat and Jerusalem, and was an active member of the Religious Zionist movement Bnei Akiva. His engaging shiurim and lectures combine deep halachic knowledge with warmth, humor, and contemporary relevance, making every session an inspiring highlight for guests of all backgrounds.",
      image: AllImages.scholars,
      imageAlt: "Rabbi Chanan Gordon photo",
    },
    {
      id: "rabbi-michael-mizrahi",
      name: "Rabbi Michael Mizrahi",
      nameHighlight: {
        first: "Rabbi Michael ",
        last: "Mizrahi",
      },
      role: "Scholar in residence",
      shortBio:
        "With 17 years of experience as a chazzan and Ba’al Koreh in South Florida, Michael Mizrahi has earned acclaim for his heartfelt davening, masterful tefillah leadership, and warm connection with congregations across the country.",
      fullBio:
        "With 17 years of experience as a chazzan and Ba’al Koreh in South Florida, Michael Mizrahi has earned acclaim for his heartfelt davening, masterful tefillah leadership, and warm connection with congregations across the country. Throughout Passover 2027, Rabbi Mizrahi will guide uplifting tefillot, melodious Seders, and dynamic discussion sessions that elevate the spiritual atmosphere for the entire community.",
      image: AllImages.profile,
      imageAlt: "Rabbi Michael Mizrahi photo",
    },
  ],
  inquireBanner: {
    part1: "Learn and celebrate with us for ",
    part2: "Passover 2027",
    buttonText: "Inquire",
  },
};

/*
 * =======================================================================
 * RTK QUERY API CONTRACT EXAMPLE (Commented out for backend integration)
 * =======================================================================
 *
 * import { baseApi } from "@/redux/api/baseApi";
 *
 * export const scholarsApi = baseApi.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getScholars: builder.query<ScholarsPageData, { programId: string }>({
 *       query: ({ programId }) => `/programs/${programId}/scholars`,
 *       providesTags: (result, error, { programId }) => [{ type: "Scholars", id: programId }],
 *     }),
 *     getScholarById: builder.query<Scholar, { programId: string; scholarId: string }>({
 *       query: ({ programId, scholarId }) => `/programs/${programId}/scholars/${scholarId}`,
 *       providesTags: (result, error, { scholarId }) => [{ type: "ScholarDetail", id: scholarId }],
 *     }),
 *   }),
 * });
 *
 * export const {
 *   useGetScholarsQuery,
 *   useGetScholarByIdQuery,
 * } = scholarsApi;
 * =======================================================================
 */
