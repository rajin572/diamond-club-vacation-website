import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/ui/CustomUi/Container";
import { PASSOVER_PROGRAMS } from "@/components/passoverCollection/passoverCollection.data";
import {
  ReserveHero,
  ReserveTabs,
  ReserveAbout,
  ReserveWhereYouStay,
  ReserveExperiences,
  ReserveExplore,
  ReserveInquiryBanner,
} from "@/components/diamondClubReserve";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Normalizes program slug to known program keys:
 * "diamond-club-reserve" | "reserve" -> "reserve"
 * "guttaway" | "guttaway-a-dcv-program" -> "guttaway"
 * "blue" | "diamond-club-blue" | "diamond-club-blue-by-dcv" -> "blue"
 */
function normalizeProgramId(slug: string): string | null {
  const s = slug.toLowerCase().trim();
  if (s === "diamond-club-reserve" || s === "reserve") {
    return "reserve";
  }
  if (s === "guttaway" || s === "guttaway-a-dcv-program") {
    return "guttaway";
  }
  if (
    s === "blue" ||
    s === "diamond-club-blue" ||
    s === "diamond-club-blue-by-dcv"
  ) {
    return "blue";
  }
  return null;
}

export async function generateStaticParams() {
  return [
    { id: "diamond-club-reserve" },
    { id: "reserve" },
    { id: "guttaway" },
    { id: "guttaway-a-dcv-program" },
    { id: "blue" },
    { id: "diamond-club-blue" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const programKey = normalizeProgramId(id);

  if (!programKey) {
    return {
      title: "Program Not Found",
    };
  }

  if (programKey === "reserve") {
    const pageTitle = "Diamond Club Reserve | Passover 2027";
    const pageDescription =
      "Experience Diamond Club Reserve for Passover 2027 at The St. Regis Kanai Resort and The Edition Resort in the Riviera Maya. Two five-diamond resorts, one exclusive sanctuary.";

    return {
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
        canonical: `/passover-collection-2027/${id}`,
      },
      openGraph: {
        title: `${pageTitle} | ${siteConfig.name}`,
        description: pageDescription,
        url: `/passover-collection-2027/${id}`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
        images: [
          {
            url: "/images/diamond-club-resturant/Diamond-Club-Reserve-hero.png",
            alt: pageTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${pageTitle} | ${siteConfig.name}`,
        description: pageDescription,
        images: ["/images/diamond-club-resturant/Diamond-Club-Reserve-hero.png"],
      },
    };
  }

  const program = PASSOVER_PROGRAMS.find((p) => p.id === programKey);
  const title = `${program?.title.part1}${program?.title.part2} | Passover 2027`;
  const description =
    program?.description || "World-class hospitality, exceptional moments.";

  return {
    title,
    description,
    alternates: {
      canonical: `/passover-collection-2027/${id}`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/passover-collection-2027/${id}`,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function PassoverProgramDynamicPage({ params }: PageProps) {
  const { id } = await params;
  const programKey = normalizeProgramId(id);

  if (!programKey) {
    notFound();
  }

  const inquireHref = `/inquire?holiday=passover-2027&destination=${id}`;

  // Diamond Club Reserve dedicated multi-section page
  if (programKey === "reserve") {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "Diamond Club Reserve — Passover 2027",
      description:
        "Experience Diamond Club Reserve for Passover 2027 at The St. Regis Kanai Resort and The Edition Resort in the Riviera Maya. Two five-diamond resorts, one exclusive sanctuary.",
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
          description:
            "Beachfront suites, signature dining, and the main Passover program.",
        },
        {
          "@type": "TouristTrip",
          name: "The Edition Resort",
          description:
            "Contemporary rooms and suites beside the mangrove reserve and the beach club.",
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="w-full flex flex-col bg-background-color">
          <ReserveHero inquireHref={inquireHref} />
          <ReserveTabs inquireHref={inquireHref} />
          <ReserveAbout inquireHref={inquireHref} />
          <ReserveWhereYouStay />
          <ReserveExperiences />
          <ReserveExplore />
          <ReserveInquiryBanner inquireHref={inquireHref} />
        </div>
      </>
    );
  }

  // Other Passover Programs (Guttaway, Blue) until their dedicated multi-section designs are provided
  const program = PASSOVER_PROGRAMS.find((p) => p.id === programKey);
  if (!program) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col bg-background-color min-h-[70vh]">
      {/* Dynamic Program Hero Banner */}
      <section className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 overflow-hidden">
        <Container>
          <div className="relative w-full min-h-[460px] sm:min-h-[520px] rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-end items-start px-6 sm:px-10 md:px-16 pb-10 sm:pb-14 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={program.images.primary.src}
                alt={program.images.primary.alt}
                fill
                priority
                sizes="(max-width: 1550px) 100vw, 1550px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-slate-950/45 to-slate-950/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start gap-4 max-w-3xl">
              <div className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-stone-200 shrink-0" />
                <span className="font-outfit text-sm font-medium leading-5 text-stone-200">
                  {program.badge}
                </span>
              </div>

              <h1 className="text-white font-cormorant font-light tracking-tight leading-[1.08] text-[clamp(2.5rem,5vw,5rem)] text-left">
                <span>{program.title.part1}</span>
                <span className="italic font-normal">{program.title.part2}</span>
              </h1>

              <p className="text-white/90 font-outfit text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                {program.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  href={inquireHref}
                  className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/20"
                >
                  <span>Inquire about this program</span>
                  <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Program Highlights & Description Section */}
      <section className="w-full py-12 md:py-20">
        <Container>
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <h2 className="font-cormorant font-light text-neutral-900 tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl">
                About the program
              </h2>
              <p className="text-zinc-700 font-outfit text-base sm:text-lg leading-relaxed">
                {program.description}
              </p>

              <div className="w-full pt-4 flex flex-col gap-3">
                <h3 className="font-outfit text-neutral-900 text-sm font-semibold uppercase tracking-wider">
                  Program Highlights
                </h3>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {program.highlights.map((h) => (
                    <div key={h.id} className="flex items-start gap-2.5">
                      <span className="size-4 shrink-0 flex items-center justify-center relative mt-1">
                        <span className="size-2 rotate-45 border-[1.5px] border-[#00549c] shrink-0" />
                      </span>
                      <span className="text-neutral-800 font-outfit text-sm sm:text-base font-normal leading-relaxed">
                        {h.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={program.images.secondary.src}
                alt={program.images.secondary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
