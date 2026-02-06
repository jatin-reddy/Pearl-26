import type { Event } from "./EventList";

type EventCardProps = {
  event: Event;
  isDesktop: boolean;
};

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
  competitions: { bg: "bg-cyan-400", text: "text-cyan-400" },
  workshops: { bg: "bg-yellow-400", text: "text-yellow-400" },
  talks: { bg: "bg-lime-400", text: "text-lime-400" },
  others: { bg: "bg-white", text: "text-white" },
  all: { bg: "bg-yellow-400", text: "text-yellow-400" },
};

function EventCard({ event, isDesktop }: EventCardProps) {
  const lookupKey = (event.tag || event.category).toLowerCase();
  const styles = tagStyles[lookupKey] || tagStyles.competitions;

  // --- LOGIC: CHOOSE TAG TYPE ---
  // If a link exists, we use an <a> tag. If not, we fall back to a <div>.
  const Component = event.link ? "a" : "div";

  // Props specific to links (opening in new tab)
  const linkProps = event.link
    ? { href: event.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    // @ts-ignore - TypeScript might complain about dynamic components dynamically, but this is valid
    <Component
      {...linkProps}
      className="group relative w-full aspect-square cursor-pointer transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1 block"
    >
      <div className="relative h-full w-full border-2 border-black bg-black overflow-hidden">
        {/* Background Dots */}
        <div className="absolute inset-0 opacity-20 z-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />

        {event.image?.src ? (
          <img
            src={event.image.src}
            alt={event.name}
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
        <div className="absolute top-0 left-0 z-20">
          <div
            className={`${styles.bg} border-b-2 border-r-2 border-black px-2 py-1 md:px-3`}
          >
            <span className="text-black font-mono font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
              {event.category}
            </span>
          </div>
        </div>

        {/* Title Box */}
        <div className="absolute bottom-3 right-3 z-20 max-w-[90%]">
          <div
            className={`relative ${styles.bg} border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1`}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />

            <h3 className="relative font-rumba text-black text-sm md:text-base uppercase leading-none tracking-wide break-words">
              {event.name}
            </h3>

            {/* Visual Arrow indicating "Go" */}
            <svg
              width="16"
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
    </Component>
  );
}

export default EventCard;
