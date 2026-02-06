import type { Event } from "./EventList";

type EventCardProps = {
  event: Event;
  isDesktop: boolean;
};

// Colors based on TAGS so the grid looks vibrant,
// even though the text says "Competition"
const tagStyles: Record<string, { bg: string; text: string }> = {
  art: { bg: "bg-pink-400", text: "text-pink-400" },
  culinary: { bg: "bg-orange-400", text: "text-orange-400" },
  gaming: { bg: "bg-purple-400", text: "text-purple-400" },
  music: { bg: "bg-indigo-400", text: "text-indigo-400" },
  dance: { bg: "bg-rose-400", text: "text-rose-400" },
  drama: { bg: "bg-red-400", text: "text-red-400" },
  fashion: { bg: "bg-fuchsia-400", text: "text-fuchsia-400" },
  literature: { bg: "bg-emerald-400", text: "text-emerald-400" },
  quiz: { bg: "bg-blue-400", text: "text-blue-400" },
  photography: { bg: "bg-teal-400", text: "text-teal-400" },

  // Fallbacks for generic categories if no tag matches
  competitions: { bg: "bg-cyan-400", text: "text-cyan-400" },
  workshops: { bg: "bg-yellow-400", text: "text-yellow-400" },
  talks: { bg: "bg-lime-400", text: "text-lime-400" },
  others: { bg: "bg-white", text: "text-white" },
  all: { bg: "bg-yellow-400", text: "text-yellow-400" },
};

function EventCard({ event, isDesktop }: EventCardProps) {
  // 1. Color Lookup: Tries to find color by TAG first (e.g., "culinary" -> Orange),
  // falls back to CATEGORY (e.g., "competitions" -> Cyan).
  const lookupKey = (event.tag || event.category).toLowerCase();
  const styles = tagStyles[lookupKey] || tagStyles.competitions;

  return (
    // PURE CSS HOVER - No JS physics
    <div className="group relative w-full aspect-square cursor-pointer transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1">
      <div className="relative h-full w-full border-2 border-black bg-black overflow-hidden">
        {/* Background Dots */}
        <div className="absolute inset-0 opacity-20 z-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />

        {event.image?.src ? (
          <img
            src={event.image.src}
            alt={event.name}
            // Logic: Eager on mobile to prevent flashes, lazy on desktop
            loading={isDesktop ? "lazy" : "eager"}
            className="absolute inset-0 w-full h-full object-cover md:grayscale opacity-90 md:group-hover:grayscale-0 transition-all duration-500 will-change-transform"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <span
              className={`font-pearl text-4xl md:text-5xl opacity-20 ${styles.text} -rotate-12 select-none`}
            >
              PEARL
            </span>
          </div>
        )}

        {/* Category Badge */}
        {/* REVERTED: Shows "COMPETITIONS", "TALKS" etc. */}
        <div className="absolute top-0 left-0 z-20">
          <div
            className={`${styles.bg} border-b-2 border-r-2 border-black px-2 py-1 md:px-3`}
          >
            <span className="text-black font-mono font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
              {event.category}
            </span>
          </div>
        </div>

        {/* Title Box - COMPACT UPDATE */}
        <div className="absolute bottom-3 right-3 z-20 max-w-[90%]">
          <div
            // Reduced px-4 py-2 -> px-3 py-1.5 for a tighter look
            className={`relative ${styles.bg} border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1`}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />

            {/* Reduced text size: text-lg -> text-base (mobile) & text-xl -> text-lg (desktop) */}
            <h3 className="relative font-rumba text-black text-base md:text-lg uppercase leading-none tracking-wide break-words">
              {event.name}
            </h3>

            <svg
              width="16" // Smaller icon (was 20)
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="relative transform transition-transform duration-300 group-hover:translate-x-1 shrink-0"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
