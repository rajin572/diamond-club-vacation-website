import { AllImages } from "../../../public/images/AllImages";
import type { ExperienceCategoryData } from "@/components/experiences/experiences.types";

export const ENTERTAINMENT_BY_PROGRAM: Record<string, ExperienceCategoryData> = {
  "diamond-club-reserve": {
    programId: "diamond-club-reserve",
    programTitle: "Diamond Club Reserve",
    experienceType: "entertainment",
    variant: "gallery",
    breadcrumbLabel: "Entertainment",
    badgeStyle: "dot",
    accentColor: "#BD9343",
    gridColumns: 3,
    header: {
      badge: "Experiences",
      titlePart1: "Enter",
      titlePart2: "tainment",
      description:
        "Nightly shows, headline performers and late-night parties, planned throughout the holiday for every age.",
    },
    items: [
      {
        id: "after-party",
        title: "The After Party",
        tag: "Nightly",
        description: "As night falls, SO’OL beach club comes alive with DJ parties, hookah, disco and casino nights.",
        image: AllImages.entertainment,
        imagePlaceholderText: "The After Party photo",
        modal: {
          title: "The After Party",
          tag: "Nightly",
          longDescription:
            "When the main event ends, the night is just beginning. DJ parties, hookah, disco, casino nights and more await.",
          when: "Nightly, after the evening program",
          where: "SO’OL beach club",
          mainPhotoPlaceholder: "The After Party — main photo",
          thumbnails: [
            { id: "t1", label: "DJ photo", placeholderText: "DJ photo" },
            { id: "t2", label: "Music photo", placeholderText: "Music photo" },
            { id: "t3", label: "Lounge photo", placeholderText: "Lounge photo" },
          ],
        },
      },
      {
        id: "fire-shows",
        title: "Fire Shows",
        tag: "Evenings",
        description: "An incredible lineup of nightly entertainment under the Riviera Maya sky.",
        image: AllImages.entertainment,
        imagePlaceholderText: "Fire Shows photo",
        modal: {
          title: "Fire Shows",
          tag: "Evenings",
          longDescription:
            "An incredible lineup of nightly entertainment under the Riviera Maya sky featuring world-class fire artists, acrobats, and mesmerizing light choreography.",
          when: "Select evenings during Chol Hamoed",
          where: "Beachfront Amphitheater",
          mainPhotoPlaceholder: "Fire Shows — main photo",
          thumbnails: [
            { id: "t1", label: "Fire Show 1", placeholderText: "Fire dancer photo" },
            { id: "t2", label: "Acrobats", placeholderText: "Acrobats photo" },
            { id: "t3", label: "Stage", placeholderText: "Stage photo" },
          ],
        },
      },
      {
        id: "dj-pinny-yiddi",
        title: "DJ Pinny & Yiddi",
        tag: "Featured",
        description: "DJ Pinny and DJ Yiddi are set to ignite the party and keep the celebration going.",
        image: AllImages.entertainment,
        imagePlaceholderText: "DJ Pinny & Yiddi photo",
        modal: {
          title: "DJ Pinny & Yiddi",
          tag: "Featured",
          longDescription:
            "DJ Pinny and DJ Yiddi bring their signature high-octane energy to the dancefloor, blending contemporary Jewish beats, global remixes, and celebratory anthems.",
          when: "Chol Hamoed late-night sessions",
          where: "Kanai Ballroom & SO’OL Club",
          mainPhotoPlaceholder: "DJ Pinny & Yiddi — main photo",
          thumbnails: [
            { id: "t1", label: "DJ Booth", placeholderText: "DJ booth photo" },
            { id: "t2", label: "Crowd", placeholderText: "Dancefloor crowd" },
            { id: "t3", label: "Lighting", placeholderText: "Lighting production" },
          ],
        },
      },
      {
        id: "kumzits-nussi-benyomin",
        title: "Kumzits with Nussi & Benyomin",
        tag: "Details to be announced",
        isTba: true,
        description: "Details coming soon.",
        image: AllImages.entertainment,
        imagePlaceholderText: "Kumzits with Nussi & Benyomin photo",
        modal: {
          title: "Kumzits with Nussi & Benyomin",
          tag: "Details to be announced",
          longDescription:
            "Heartfelt melodies, acoustic harmonies, and uplifting singing beside the Caribbean surf with Nussi and Benyomin.",
          when: "Evening sessions following tefillah",
          where: "Beachside fire pit lounge",
          mainPhotoPlaceholder: "Kumzits — main photo",
          thumbnails: [
            { id: "t1", label: "Fire Pit", placeholderText: "Fire pit photo" },
            { id: "t2", label: "Guitar", placeholderText: "Acoustic set" },
            { id: "t3", label: "Singers", placeholderText: "Kumzits crowd" },
          ],
        },
      },
      {
        id: "comedian-elon-gold",
        title: "Comedian Elon Gold",
        tag: "Featured",
        description: "From his Orthodox upbringing to being an NYU dropout, comedian Elon Gold brings his renowned stand-up.",
        image: AllImages.entertainment,
        imagePlaceholderText: "Comedian Elon Gold photo",
        modal: {
          title: "Comedian Elon Gold",
          tag: "Featured",
          longDescription:
            "From his Orthodox upbringing to being an NYU dropout, comedian Elon Gold brings his renowned stand-up comedy performance, sharing hilarious and relatable observations.",
          when: "Chol Hamoed Headline Evening",
          where: "Main Kanai Ballroom",
          mainPhotoPlaceholder: "Elon Gold — main photo",
          thumbnails: [
            { id: "t1", label: "On Stage", placeholderText: "Stage performance" },
            { id: "t2", label: "Laughing Crowd", placeholderText: "Audience photo" },
            { id: "t3", label: "Portrait", placeholderText: "Elon Gold portrait" },
          ],
        },
      },
      {
        id: "concert",
        title: "Concert",
        tag: "Details to be announced",
        isTba: true,
        description: "Details coming soon.",
        image: AllImages.entertainment,
        imagePlaceholderText: "Concert photo",
        modal: {
          title: "Concert",
          tag: "Details to be announced",
          longDescription:
            "A spectacular headline musical concert featuring premier Jewish music superstars backed by a full symphonic ensemble under the stars.",
          when: "Chol Hamoed Gala Night",
          where: "Grand Amphitheater Stage",
          mainPhotoPlaceholder: "Concert — main photo",
          thumbnails: [
            { id: "t1", label: "Stage", placeholderText: "Concert stage" },
            { id: "t2", label: "Orchestra", placeholderText: "Live orchestra" },
            { id: "t3", label: "Audience", placeholderText: "Gala audience" },
          ],
        },
      },
    ],
    inquireBanner: {
      headlinePart1: "Celebrate with us for ",
      headlinePart2: "Passover 2027",
      buttonText: "Inquire",
    },
  },
  guttaway: {
    programId: "guttaway",
    programTitle: "Guttaway a DCV Program",
    experienceType: "entertainment",
    variant: "gallery",
    breadcrumbLabel: "Entertainment",
    badgeStyle: "dot",
    accentColor: "#00549c",
    gridColumns: 3,
    header: {
      badge: "Experiences",
      titlePart1: "Enter",
      titlePart2: "tainment",
      description:
        "Nightly shows, headline performers and late-night parties, planned throughout the holiday for every age.",
    },
    items: [
      {
        id: "to-be-announced",
        title: "To be announced",
        tag: "Details to be announced",
        isTba: true,
        ctaText: "View details",
        description: "Incredible lineup of nightly entertainment.",
        image: AllImages.entertainment,
        imagePlaceholderText: "Entertainment photo",
        modal: {
          title: "To be announced",
          tag: "Nightly",
          longDescription:
            "Incredible lineup of nightly entertainment. Full details will be announced closer to the program.",
          when: "Nightly, after the evening program",
          where: "SO’OL beach club",
          mainPhotoPlaceholder: "Entertainment — main photo",
          thumbnails: [
            { id: "t1", label: "DJ photo", placeholderText: "DJ photo" },
            { id: "t2", label: "Music photo", placeholderText: "Music photo" },
            { id: "t3", label: "Lounge photo", placeholderText: "Lounge photo" },
          ],
        },
      },
    ],
    inquireBanner: {
      headlinePart1: "Celebrate with us for ",
      headlinePart2: "Passover 2027",
      buttonText: "Inquire",
    },
  },
};
