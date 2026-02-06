import { useEffect, useRef, useState } from "react";

export type EventCategory =
  | "all"
  | "art"
  | "comedy"
  | "culinary"
  | "dance"
  | "drama"
  | "fashion"
  | "funevents"
  | "gaming"
  | "literature"
  | "movies"
  | "music"
  | "photography"
  | "quiz";

type FilterProps = {
  value: EventCategory;
  onChange: (next: EventCategory) => void;
};

// 14 Categories total
const CATEGORIES: { key: EventCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "art", label: "Art" },
  { key: "comedy", label: "Comedy" },
  { key: "culinary", label: "Culinary" },
  { key: "dance", label: "Dance" },
  { key: "drama", label: "Drama" },
  { key: "fashion", label: "Fashion" },
  { key: "funevents", label: "Fun Events" },
  { key: "gaming", label: "Gaming" },
  { key: "literature", label: "Literature" },
  { key: "movies", label: "Movies" },
  { key: "music", label: "Music" },
  { key: "photography", label: "Photography" },
  { key: "quiz", label: "Quiz" },
];

function Filter({ value, onChange }: FilterProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const activeLabel =
    CATEGORIES.find((c) => c.key === value)?.label ?? "Filters";

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t))
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <nav className="w-full px-4 md:px-10 pt-24 pb-12">
      {/* --- MOBILE: DROPDOWN (Unchanged) --- */}
      <div className="flex justify-center md:hidden">
        <div className="relative w-full max-w-xs">
          <button
            ref={btnRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={[
              "w-full bg-white text-black font-body tracking-wide",
              "border-2 border-black px-4 py-3 pr-10 text-left",
              "shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
              "hover:border-[#F3D300] focus:outline-none focus:border-[#F3D300] transition",
            ].join(" ")}
          >
            <span className="block">{activeLabel}</span>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black">
              {open ? "▲" : "▼"}
            </span>
          </button>

          {open ? (
            <div
              ref={menuRef}
              role="listbox"
              aria-label="Filters"
              className={[
                "absolute left-0 right-0 mt-3 z-50",
                "bg-white border-2 border-black",
                "shadow-[6px_6px_0_0_rgba(0,0,0,1)]",
                "max-h-[60vh] overflow-y-auto",
              ].join(" ")}
            >
              {CATEGORIES.map((c) => {
                const active = c.key === value;
                return (
                  <button
                    key={c.key}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(c.key);
                      setOpen(false);
                    }}
                    className={[
                      "w-full text-left px-4 py-3 font-body tracking-wide",
                      "border-b border-black/10 last:border-b-0",
                      "transition",
                      active
                        ? "bg-[#F3D300] text-black"
                        : "bg-white text-black hover:bg-[#F3D300]/30",
                    ].join(" ")}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      {/* --- DESKTOP: 2 ROWS --- */}
      {/* md:grid-cols-5 = 3 rows on tablets/small laptops
         lg:grid-cols-7 = Exact 2 rows (7 items per row) on standard desktops 
      */}
      <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-7 gap-y-4 gap-x-3 items-center justify-center max-w-6xl mx-auto">
        {CATEGORIES.map((c) => {
          const active = value === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange(c.key)}
              // Added 'w-full' so they fill their grid slot evenly
              className={[
                "w-full px-2 py-2 text-sm uppercase font-bold tracking-widest border-2 transition truncate",
                active
                  ? "bg-[#F3D300] text-black border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] -translate-y-1"
                  : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10",
              ].join(" ")}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Filter;
