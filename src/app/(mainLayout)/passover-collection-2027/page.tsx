import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  PassoverHero,
  PassoverPrograms,
  PassoverCompare,
  PassoverInquiryBanner,
} from "@/components/passoverCollection";

const pageUrl = "/passover-collection-2027";
const pageTitle = "Passover Collection 2027";
const pageDescription =
  "Experience Passover 2027 with Diamond Club Vacations across three extraordinary programs: Diamond Club Reserve, Guttaway a DCV Program, and Diamond Club Blue in the Riviera Maya and Cancun.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Passover 2027",
    "Kosher Passover vacations",
    "Passover Cancun",
    "Passover Riviera Maya",
    "Diamond Club Reserve",
    "Guttaway DCV",
    "Diamond Club Blue",
    "Luxury kosher resorts",
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
    images: [{ url: "/images/passoverCollection/passoverHero.jpg", alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/images/passoverCollection/passoverHero.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Passover Collection 2027",
  description: pageDescription,
  touristType: ["Family", "Luxury Traveler", "Kosher Travel"],
  provider: {
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Diamond Club Reserve",
      description: "Our most exclusive Passover experience at St. Regis Kanai and The Edition Resort.",
      url: `${siteConfig.siteUrl}/passover-collection-2027/diamond-club-reserve`,
    },
    {
      "@type": "Offer",
      name: "Guttaway a DCV Program",
      description: "Elevated Passover for the whole family at Waldorf Astoria & Park Hyatt.",
      url: `${siteConfig.siteUrl}/passover-collection-2027#guttaway`,
    },
    {
      "@type": "Offer",
      name: "Diamond Club Blue by DCV",
      description: "Luxury made accessible at Casa Nizuc Resort & Spa Cancun.",
      url: `${siteConfig.siteUrl}/passover-collection-2027#blue`,
    },
  ],
};

export default function PassoverCollection2027Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="w-full flex flex-col bg-background-color">
        <PassoverHero />
        <PassoverPrograms />
        <PassoverCompare />
        <PassoverInquiryBanner />
      </div>
    </>
  );
}
