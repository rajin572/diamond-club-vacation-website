import Image from "next/image";
import Link from "next/link";
import { AllImages } from "../../../../public/images/AllImages";
import { FOOTER_TAGLINE } from "./footer.data";

export const FooterBrand = () => {
  return (
    <div className="flex w-full flex-col items-start gap-4 sm:gap-5 lg:w-80 lg:shrink-0">
      <Link
        href="/"
        aria-label="Diamond Club Vacations Home"
        className="relative aspect-square w-[clamp(4.5rem,7vw,6rem)] shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Image
          src={AllImages.logo}
          alt="Diamond Club Vacations"
          fill
          sizes="(min-width: 1024px) 6rem, 4.5rem"
          className="object-contain"
        />
      </Link>
      <p className="max-w-[18rem] font-outfit text-[clamp(0.875rem,1.1vw,1rem)] font-normal leading-6 text-base-secondary-color">
        {FOOTER_TAGLINE}
      </p>
    </div>
  );
};

export default FooterBrand;
