import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  ReserveHero,
  ReserveTabs,
  ReserveAbout,
  ReserveWhereYouStay,
  ReserveExperiences,
  ReserveExplore,
  ReserveInquiryBanner,
} from "@/components/diamondClubReserve";

const pageUrl = "/passover-collection-2027/diamond-club-reserve";
const pageTitle = "Diamond Club Reserve | Passover 2027";
const pageDescription =
  "Experience Diamond Club Reserve for Passover 2027 at The St. Regis Kanai Resort and The Edition Resort in the Riviera Maya. Two five-diamond resorts, one exclusive sanctuary.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Diamond Club Reserve",
    "Passover 2027",
    "The St. Regis Kanai Resort",
    "The Edition Resort",
    "Riviera Maya Passover",
    "Luxury kosher vacation",
    "Kanai Mexico luxury resort",
    "Glatt Kosher Passover resort",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: pageUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/diamond-club-resturant/Diamond-Club-Reserve-hero.png", alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/images/diamond-club-resturant/Diamond-Club-Reserve-hero.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Diamond Club Reserve — Passover 2027",
  description: pageDescription,
  touristType: ["Family", "Luxury Traveler", "Kosher Travel"],
  provider: {
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  location: {
    "@type": "Place",
    name: "Kanai, The Riviera Maya, Mexico",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Riviera Maya",
      addressCountry: "MX",
    },
  },
  subTrip: [
    {
      "@type": "TouristTrip",
      name: "The St. Regis Kanai Resort",
      description: "Beachfront suites, signature dining, and the main Passover program.",
    },
    {
      "@type": "TouristTrip",
      name: "The Edition Resort",
      description: "Contemporary rooms and suites beside the mangrove reserve and the beach club.",
    },
  ],
};

export default function DiamondClubReservePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="w-full flex flex-col bg-background-color">
        <ReserveHero />
        <ReserveTabs />
        <ReserveAbout />
        <ReserveWhereYouStay />
        <ReserveExperiences />
        <ReserveExplore />
        <ReserveInquiryBanner />
      </div>
    </>
  );
}

