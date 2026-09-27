import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllOfferings } from "@/data/offerings/registry";
import { getProgramsForOffering } from "@/data/programs/registry";
import { getResortsForProgram } from "@/data/resorts/registry";
import { offeringHref, programHref, resortHref } from "@/lib/routes";

// Only lists routes that actually exist today. Add entries here as real pages ship
// (e.g. /contact, /services, /pricing are linked from the nav/footer but not built yet).
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  for (const offering of getAllOfferings()) {
    entries.push({
      url: `${siteConfig.siteUrl}${offeringHref(offering.id)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const program of getProgramsForOffering(offering.id)) {
      entries.push({
        url: `${siteConfig.siteUrl}${programHref(offering.id, program.id)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      for (const resort of getResortsForProgram(program.id)) {
        entries.push({
          url: `${siteConfig.siteUrl}${resortHref(offering.id, program.id, resort.resortId)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
