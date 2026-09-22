import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Hero from "@/components/homepage/Hero";
import { DiamondClubVacations } from "@/components/homepage/DiamondClubVacations";

// Below-the-fold sections are code-split into their own chunks so the initial
// route bundle (and hydration cost) stays small. Content is still fully
// server-rendered for crawlers/SEO — `next/dynamic` only defers the client JS,
// not the HTML (ssr defaults to true).

const pageUrl = "/";
const pageTitle = siteConfig.title;
const pageDescription = siteConfig.description;

export const metadata: Metadata = {
  // No `title` here — the root layout's `title.default` is already the exact
  // fully-branded string, and setting one here would run it through the
  // "%s | Diamond Club Vacation" template too, duplicating the brand name.
  description: pageDescription,
  keywords: [
    "vacation club membership",
    "points-based vacation club",
    "timeshare points club",
    "vacation ownership rewards",
    "luxury resort membership",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [{ url: siteConfig.ogImage, alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

// Structured data mirrors the real, visible page content (membership tiers) so it
// stays honest — no fabricated ratings/reviews or unconfirmed social profiles.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  priceRange: "$2,500 - $35,000",
  address: {
    "@type": "PostalAddress",
    ...siteConfig.contact.address,
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Silver Membership",
      price: "2500",
      priceCurrency: "USD",
      description: "Entry-level points allotment with access to the full resort network.",
    },
    {
      "@type": "Offer",
      name: "Gold Membership",
      price: "9500",
      priceCurrency: "USD",
      description: "Higher annual points, priority booking window, and guest certificates.",
    },
    {
      "@type": "Offer",
      name: "Diamond Elite Membership",
      price: "35000",
      priceCurrency: "USD",
      description: "Maximum points allotment, dedicated concierge, and premium resort access worldwide.",
    },
  ],
};

export default function HomePage() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Diamond Club Vacations Section */}
      <DiamondClubVacations />
    </div>
  );
}
