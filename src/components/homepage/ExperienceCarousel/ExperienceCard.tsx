import Image from "next/image";
import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/CustomUi/PhotoPlaceholder";
import { ExperienceItem } from "./experience.data";

export const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => {
  return (
    <div className="experience-card flex h-80 w-[85vw] shrink-0 snap-start gap-7 rounded-sm bg-[#F5F4F1] py-3 pl-3 pr-8 sm:w-[420px] lg:w-[600px]">
      {item.image ? (
        <div className="relative h-full w-60 shrink-0 overflow-hidden rounded-sm">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="240px"
            className="experience-card-image object-cover transition-transform duration-700 ease-out hover:scale-110"
          />
        </div>
      ) : (
        <PhotoPlaceholder label={item.title} className="h-full w-60 shrink-0 rounded-sm" />
      )}

      <div className="flex flex-1 flex-col gap-3.5 pt-4">
        <span className="font-cormorant text-xl text-base-color">Experience</span>
        <h3 className="font-cormorant text-4xl font-normal leading-10 text-base-color">{item.title}</h3>
        <p className="font-outfit text-base text-base-secondary-color">{item.description}</p>
        {item.discoverHref && (
          <Link
            href={item.discoverHref}
            className="font-outfit text-base font-medium text-base-color underline underline-offset-2"
          >
            Discover
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
