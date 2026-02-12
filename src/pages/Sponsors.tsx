import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";

// Dynamically import all webp files from the sponsors directory
// This prevents crashes if a file is missing - it just won't be in the logos map.
const logos = import.meta.glob("../assets/sponsors/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Helper to get logo URL by name (e.g., "unilever" -> URL)
const getLogo = (name: string): string | undefined => {
  const path = `../assets/sponsors/${name.toLowerCase()}.webp`;
  return logos[path];
};

interface Sponsor {
  name: string;
  tag?: string;
  id: string; // Used to match with filename
  invert?: boolean; // New property to invert colors
}

interface SponsorCategory {
  category: string;
  sponsors: Sponsor[];
  size: "large" | "medium" | "small";
}

const sponsorData: SponsorCategory[] = [
  {
    category: "TITLE SPONSORS",
    size: "large",
    sponsors: [
      { name: "Coke", tag: "Co-Title Sponsor", id: "coke" },
    ],
  },
  {
    category: "PRO-NITE PARTNERS",
    size: "medium",
    sponsors: [
      { name: "Realme", tag: "Pro-Nite Partner", id: "realme" },
      { name: "Phillips", tag: "Pro-Nite Partner", id: "phillips" },
    ],
  },
  {
    category: "BANKING PARTNERS",
    size: "medium",
    sponsors: [
      { name: "SBI", tag: "Banking Partner", id: "sbi" },
      { name: "ICICI Bank", tag: "Banking Partner", id: "icici" },
    ],
  },
  {
    category: "PARTNERS",
    size: "small",
    sponsors: [
      {
        name: "UNILEVER",
        tag: "Title Sponsor - Music Events",
        id: "unilever",
      },
      { name: "Coke", tag: "Beverage Partner", id: "coke" },
      { name: "Farmley", tag: "Healthy Snacking Partner", id: "farmley" },
      { name: "Britannia", tag: "Snacking Partner", id: "britannia" },
      { name: "Metanova Esports", tag: "Gaming Partner", id: "metanova", invert: true },
      { name: "Monster Energy", tag: "Energy Partner", id: "monster" },
      { name: "MYOP", tag: "Gifting Partner", id: "myop" },
      { name: "Peppero", tag: "Bites Partner", id: "peppero" },
      { name: "Fleamora", tag: "Flea Market Partner", id: "fleamora" },
      { name: "Musee Musicals", tag: "Music Partner", id: "musee" },
      { name: "Pixelvide", id: "pixelvide" },
      {
        name: "RUSkilled",
        tag: "Technical Workshop Partner",
        id: "ruskilled",
      },
      { name: "Refuel Merchant", tag: "Food Stall Partner", id: "refuel" },
      { name: "Pixie Booth", tag: "Stall Partner", id: "pixie" },
      { name: "Studio Novera", tag: "Stall Partner", id: "studio" },
    ],
  },
];

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="min-h-screen bg-[#F25C9A] py-24 overflow-hidden px-4"
    >
      {/* STATIC HEADING */}
      <SectionHeading
        text1="OUR"
        text2="SPONSORS"
        ghostText="SPONSORS"
        text1Color="text-white"
        text2Color="text-white"
      />

      {/* CONTENT */}
      <div className="mt-20 flex flex-col items-center gap-16 max-w-7xl mx-auto">
        {sponsorData.map((group, index) => (
          <div key={index} className="flex flex-col items-center gap-10 w-full">
            <h3 className="text-white tracking-[0.2em] text-2xl font-rumba uppercase opacity-90 text-center">
              {group.category}
            </h3>

            <div
              className={`flex flex-wrap justify-center gap-10 ${
                group.size === "large" ? "w-full" : ""
              }`}
            >
              {group.sponsors.map((sponsor, idx) => {
                const logoUrl = getLogo(sponsor.id);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div
                      className={`bg-white shadow-lg overflow-hidden flex items-center justify-center relative group transition-transform duration-300 hover:scale-105 ${
                        group.size === "large"
                          ? "w-[min(90vw,550px)] h-[min(50vw,310px)]"
                          : group.size === "medium"
                          ? "w-[min(45vw,400px)] h-[min(25vw,225px)]"
                          : "w-[min(42vw,300px)] h-[min(24vw,170px)]"
                      }`}
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={sponsor.name}
                          className="w-full h-full object-contain p-4"
                          style={sponsor.invert ? { filter: "invert(1)" } : {}}
                        />
                      ) : (
                        <div className="text-[#F25C9A] font-body font-bold text-center px-4">
                          {sponsor.name.toUpperCase()}
                        </div>
                      )}
                    </div>
                    {sponsor.tag && (
                      <span className="text-white/80 font-body text-lg tracking-wider text-center max-w-[200px]">
                        {sponsor.tag}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
