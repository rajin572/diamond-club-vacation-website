import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  label: string;
  className?: string;
}

/** Stand-in for real photography that hasn't been supplied yet -- mirrors the
 * "[Name] photo" placeholder boxes the Figma file itself uses wherever a shot
 * wasn't ready at design time, rather than faking a photo with a gradient. */
export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({ label, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 bg-[#EDEAE3]", className)}>
      <ImageIcon className="size-7 stroke-[1.75] text-base-color/40" />
      <span className="max-w-48 text-center font-outfit text-xs text-base-color/50">{label} photo</span>
    </div>
  );
};

export default PhotoPlaceholder;
