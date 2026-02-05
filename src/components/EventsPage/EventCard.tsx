import type { Event } from "./EventList"; // Adjust import path if needed

type EventCardProps = {
  event: Event;
  isDesktop: boolean;
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  competitions: { bg: "bg-cyan-400", text: "text-cyan-400" },
  workshops: { bg: "bg-yellow-400", text: "text-yellow-400" },
  games: { bg: "bg-fuchsia-500", text: "text-fuchsia-500" },
  talks: { bg: "bg-lime-400", text: "text-lime-400" },
  others: { bg: "bg-white", text: "text-white" },
  all: { bg: "bg-yellow-400", text: "text-yellow-400" },
};

function EventCard({ event, isDesktop }: EventCardProps) {
  const styles =
    categoryStyles[event.category.toLowerCase()] || categoryStyles.all;

  return (
    // PURE CSS HOVER - No JS physics
    <div className="group relative w-full aspect-square cursor-pointer transform-gpu transition-transform duration-300 ease-out hover:-translate-y-2">
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
              className={`font-pearl text-5xl md:text-6xl opacity-20 ${styles.text} -rotate-12 select-none`}
            >
              PEARL
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-0 left-0 z-20">
          <div
            className={`${styles.bg} border-b-2 border-r-2 border-black px-3 py-1`}
          >
            <span className="text-black font-mono font-bold uppercase tracking-widest text-[10px]">
              {event.category}
            </span>
          </div>
        </div>

        {/* Title Box */}
        <div className="absolute bottom-4 right-4 z-20 max-w-[85%]">
          <div
            className={`relative ${styles.bg} border-2 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1`}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />
            <h3 className="relative font-rumba text-black text-lg md:text-xl uppercase leading-none tracking-wide break-words">
              {event.name}
            </h3>
            <svg
              width="20"
              height="20"
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
