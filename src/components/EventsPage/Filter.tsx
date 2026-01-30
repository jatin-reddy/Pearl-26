import React from "react";

export type EventCategory = "all" | "workshops" | "games" | "competitions" | "talks" | "others";

type FilterProps = {
  value: EventCategory;
  onChange: (next: EventCategory) => void;
};

const CATEGORIES: { key: EventCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "workshops", label: "Workshops" },
  { key: "games", label: "Games" },
  { key: "competitions", label: "Competitions" },
  { key: "talks", label: "Talks" },
  { key: "others", label: "Others" },
];

function Filter({ value, onChange }: FilterProps) {
  return (
    <nav className="w-full px-24 pt-8">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {CATEGORIES.map((c) => {
          const active = value === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange(c.key)}
              className={[
                "px-5 py-2 font-body tracking-wide border-2 transition",
                active
                  ? "bg-[#F3D300] text-black border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                  : "bg-transparent text-white border-white/70 hover:border-white hover:bg-white/10",
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