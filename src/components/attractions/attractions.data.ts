import { AllImages } from "../../../public/images/AllImages";
import type { AttractionsPageData } from "./attractions.types";

/**
 * Attractions data matching Figma Node 40015148-462 & 40015148-607
 */
export const ATTRACTIONS_DATA: AttractionsPageData = {
  programId: "diamond-club-reserve",
  programTitle: "Diamond Club Reserve",
  header: {
    badge: "Explore",
    headline: {
      part1: "Beyond ",
      part2: "the resort",
    },
    description:
      "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
  },
  attractions: [
    {
      id: "cancun-underwater-museum",
      title: "Cancun Underwater Museum",
      tag: "Snorkel & dive",
      description:
        "Dive into an underwater art gallery with over 500 sculptures, promoting coral reef conservation.",
      image: AllImages.underwaterMuseum,
      imagePlaceholderText: "Cancun Underwater Museum photo",
      mapQuery: "Cancun Underwater Museum of Art, Quintana Roo, Mexico",
      mapUrl: "https://maps.google.com/?q=Cancun+Underwater+Museum+of+Art",
    },
    {
      id: "chichen-itza",
      title: "Chichen Itza",
      tag: "Culture & history",
      description:
        "Step back in time at this iconic Mayan archaeological site, home to the legendary El Castillo pyramid.",
      image: AllImages.mayanRuins,
      imagePlaceholderText: "Chichen Itza photo",
      mapQuery: "Chichen Itza, Yucatan, Mexico",
      mapUrl: "https://maps.google.com/?q=Chichen+Itza",
    },
    {
      id: "xplor-park",
      title: "Xplor Park",
      tag: "Adventure",
      description:
        "An exhilarating adventure park with zip-lines, underground rivers and amphibious vehicles for thrill-seekers.",
      image: AllImages.ecoAdventureParks,
      imagePlaceholderText: "Xplor Park photo",
      mapQuery: "Xplor Park, Playa del Carmen, Mexico",
      mapUrl: "https://maps.google.com/?q=Xplor+Park+Playa+del+Carmen",
    },
    {
      id: "xcaret-park",
      title: "Xcaret Park",
      tag: "Nature & culture",
      description:
        "A spectacular eco-archaeological park that celebrates the culture and nature of Mexico.",
      image: AllImages.beyondDiamondClubResturant,
      imagePlaceholderText: "Xcaret Park photo",
      mapQuery: "Xcaret Park, Carretera Chetúmal-Puerto Juárez, Quintana Roo, Mexico",
      mapUrl: "https://maps.google.com/?q=Xcaret+Park+Mexico",
    },
  ],
  inquireBanner: {
    headlinePart1: "Explore the Riviera Maya for ",
    headlinePart2: "Passover 2027",
    buttonText: "Inquire",
  },
};
