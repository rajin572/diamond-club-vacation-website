import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OfferingItem } from "./offering.data";

export const OfferingCard: React.FC<{ item: OfferingItem }> = ({ item }) => {
  return (
    <Link href={item.href} className="offering-card group flex flex-1 flex-col gap-4 will-change-transform transform-gpu">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="offering-card-image object-cover will-change-transform transform-gpu"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent" />

        <Image
          src={item.logo}
          alt=""
          aria-hidden="true"
          className="offering-card-logo pointer-events-none absolute left-4 top-4 h-16 w-16 object-contain"
        />

        <span className="offering-card-arrow absolute bottom-6 right-6 flex size-8 items-center justify-center rounded-[3px] bg-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4 stroke-[2.2] text-base-color" />
        </span>

        {/* Curtain that wipes off-frame to reveal the photo underneath it. */}
        <div className="offering-card-wipe absolute inset-0 bg-background-color" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="offering-card-title font-cormorant text-3xl font-medium text-base-color">{item.title}</h3>
        <p className="offering-card-desc font-outfit text-base text-base-secondary-color">{item.description}</p>
      </div>
    </Link>
  );
};

export default OfferingCard;
