import { AllImages } from "../../../public/images/AllImages";
import type { ExperienceCategoryData } from "@/components/experiences/experiences.types";

export const SCHOLARS_BY_PROGRAM: Record<string, ExperienceCategoryData> = {
  "diamond-club-reserve": {
    programId: "diamond-club-reserve",
    programTitle: "Diamond Club Reserve",
    experienceType: "scholars",
    variant: "bio",
    breadcrumbLabel: "Scholars",
    badgeStyle: "pill",
    gridColumns: 2,
    header: {
      badge: "Experiences",
      titlePart1: "Sch",
      titlePart2: "olars",
      description: "Inspiring talks, classes and tefillah led by renowned rabbis and speakers throughout the holiday.",
    },
    items: [
      {
        id: "rabbi-chanan-gordon",
        name: "Rabbi Chanan Gordon",
        nameHighlight: { first: "Rabbi Chanan ", last: "Gordon" },
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
        nameHighlight: { first: "Rabbi Michael ", last: "Mizrahi" },
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
      headlinePart1: "Learn and celebrate with us for ",
      headlinePart2: "Passover 2027",
      buttonText: "Inquire",
    },
  },
  guttaway: {
    programId: "guttaway",
    programTitle: "Guttaway a DCV Program",
    experienceType: "scholars",
    variant: "bio",
    breadcrumbLabel: "Scholars",
    badgeStyle: "pill",
    gridColumns: 3,
    header: {
      badge: "Experiences",
      titlePart1: "Sch",
      titlePart2: "olars",
      description: "Inspiring talks, classes and tefillah led by renowned rabbis and speakers throughout the holiday.",
    },
    items: [
      {
        id: "rabbi-lawrence-hajioff",
        name: "Rabbi Lawrence Hajioff",
        nameHighlight: { first: "Rabbi Lawrence ", last: "Hajioff" },
        role: "Scholar in residence",
        shortBio:
          "Rabbi Lawrence Hajioff is the educational director of Birthright Israel Alumni in Manhattan and a faculty member at Stern College for Women, Yeshiva University.",
        fullBio:
          "Rabbi Lawrence Hajioff is the educational director of Birthright Israel Alumni in Manhattan and a faculty member at Stern College for Women, Yeshiva University. He received his rabbinical ordination from Yeshiva Ner Yisrael in Baltimore and has been an inspiring speaker and educator for over two decades.\n\nOriginally from London, England, Rabbi Hajioff is the author of several acclaimed books, including \"Jew Got Questions?\" and \"Will Jew Marry Me?\", and lectures widely across North America and Israel on Jewish philosophy, ethics, and contemporary issues.",
        image: AllImages.scholars,
        imageAlt: "Rabbi Lawrence Hajioff photo",
        ctaText: "Read full bio",
      },
      {
        id: "speaker-tba-1",
        name: "Speaker to be announced",
        role: "Scholar in residence",
        shortBio: "Details coming soon.",
        fullBio: "Details coming soon.",
        image: "",
        imageAlt: "Speaker to be announced",
        isTba: true,
        ctaText: "Coming soon",
      },
      {
        id: "speaker-tba-2",
        name: "Speaker to be announced",
        role: "Scholar in residence",
        shortBio: "Details coming soon.",
        fullBio: "Details coming soon.",
        image: "",
        imageAlt: "Speaker to be announced",
        isTba: true,
        ctaText: "Coming soon",
      },
    ],
    inquireBanner: {
      headlinePart1: "Learn and celebrate with us for ",
      headlinePart2: "Passover 2027",
      buttonText: "Inquire",
    },
  },
  blue: {
    programId: "blue",
    programTitle: "Diamond Blue by DCV",
    experienceType: "scholars",
    variant: "bio",
    breadcrumbLabel: "Scholars",
    badgeStyle: "pill",
    gridColumns: 2,
    header: {
      badge: "Experiences",
      titlePart1: "Sch",
      titlePart2: "olars",
      description:
        "Inspiring talks, classes and tefillah led by renowned rabbis and speakers throughout the holiday.",
    },
    items: [
      {
        id: "rabbi-lawrence-hajioff",
        name: "Rabbi Lawrence Hajioff",
        nameHighlight: { first: "Rabbi Lawrence ", last: "Hajioff" },
        role: "Scholar in residence",
        shortBio:
          "Rabbi Lawrence Hajioff is the educational director of Birthright Israel Alumni in Manhattan and a faculty member at Stern College for Women, Yeshiva University.",
        fullBio:
          "Rabbi Lawrence Hajioff is the educational director of Birthright Israel Alumni in Manhattan and a faculty member at Stern College for Women, Yeshiva University. He received his rabbinical ordination from Yeshiva Ner Yisrael in Baltimore and has been an inspiring speaker and educator for over two decades.\n\nOriginally from London, England, Rabbi Hajioff is the author of several acclaimed books, including \"Jew Got Questions?\" and \"Will Jew Marry Me?\", and lectures widely across North America and Israel on Jewish philosophy, ethics, and contemporary issues.",
        image: AllImages.scholars,
        imageAlt: "Rabbi Lawrence Hajioff photo",
        ctaText: "Read full bio",
      },
      {
        id: "speaker-to-be-announced",
        name: "Speaker to be announced",
        nameHighlight: { first: "Speaker ", last: "to be announced" },
        role: "Guest Lecturer",
        shortBio:
          "A renowned guest speaker and educator will be joining the Diamond Club Blue program. Full biography and topics will be announced shortly.",
        fullBio:
          "A renowned guest speaker and educator will be joining the Diamond Club Blue program. Full biography and topics will be announced shortly.",
        image: AllImages.profile,
        imageAlt: "Speaker to be announced photo",
        isTba: true,
        ctaText: "Coming soon",
      },
    ],
    inquireBanner: {
      headlinePart1: "Learn and celebrate with us for ",
      headlinePart2: "Passover 2027",
      buttonText: "Inquire",
    },
  },
};
