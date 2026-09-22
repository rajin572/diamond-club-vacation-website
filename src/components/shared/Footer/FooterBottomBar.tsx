import Link from "next/link";
import HoverStaggerText from "@/components/ui/CustomUi/animation/HoverStaggerText";
import { FOOTER_LEGAL_LINKS } from "./footer.data";

export const FooterBottomBar = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {FOOTER_LEGAL_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="font-outfit text-[clamp(0.8125rem,1vw,0.875rem)] font-normal leading-5 text-base-color"
        >
          <HoverStaggerText
            text={link.label}
            idleColor="#131313"
            hoverColor="#00549C"
            duration={0.32}
            stagger={0.015}
          />
        </Link>
      ))}
      <p className="font-outfit text-[clamp(0.8125rem,1vw,0.875rem)] font-normal leading-5 text-base-color">
        © {year} Diamond Club Vacations
      </p>
    </div>
  );
};

export default FooterBottomBar;
