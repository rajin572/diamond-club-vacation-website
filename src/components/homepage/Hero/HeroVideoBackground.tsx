import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * The video is ~10MB, so first paint never waits on it: the native `poster`
 * frame (a couple hundred KB) shows instantly, and the browser swaps it for
 * the live video the moment playback actually starts -- no JS-driven
 * loading state needed, and no risk of a stuck dark box if a "canplay"-type
 * event fires late or not at all.
 */
export const HeroVideoBackground = ({ src, poster, className }: HeroVideoBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0", className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#030712]/50" />
    </div>
  );
};

export default HeroVideoBackground;
