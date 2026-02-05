"use client";

import allEventData from "../../utils/allEventData.json";
import EventCard from "./EventCard";
import type { EventCategory } from "./Filter";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo, useState, useEffect } from "react";

export type Event = {
  id: string;
  name: string;
  category: string;
  image?: { src: string; alt: string };
  hoverImage?: { src: string; alt: string };
};

type EventListProps = {
  category: EventCategory;
};

// --- OPTIMIZATION 1: UN SPLASH HELPER ---
// Unsplash images are huge. We append parameters to request smaller versions.
// We request 600px width (w=600), quality 80 (q=80), and WebP format (auto=format).
const optimizeImage = (url?: string) => {
  if (!url) return "";
  if (url.includes("images.unsplash.com")) {
    // Check if it already has params to avoid double ?
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=600&q=80&auto=format`;
  }
  return url;
};

function chunkArray<T>(array: T[], parts: number) {
  const result: T[][] = Array.from({ length: parts }, () => []);
  array.forEach((item, i) => {
    result[i % parts].push(item);
  });
  return result;
}

const ITEMS_PER_PAGE = 16; // Only load 16 items at first

function EventList({ category }: EventListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // --- OPTIMIZATION 2: PAGINATION STATE ---
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsDesktop(window.innerWidth >= 768), 100);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [category]);

  const rawEvents = (allEventData as { events: Event[] }).events ?? [];

  // 1. Filter events based on category
  const filteredEvents = useMemo(() => {
    return category === "all"
      ? rawEvents
      : rawEvents.filter((e) => e.category === category);
  }, [category, rawEvents]);

  // 2. Slice the events based on how many we want to show (Pagination)
  const visibleEvents = useMemo(() => {
    // Process the slice AND optimize URLs here
    return filteredEvents.slice(0, visibleCount).map((event) => ({
      ...event,
      image: event.image
        ? { ...event.image, src: optimizeImage(event.image.src) }
        : undefined,
      hoverImage: event.hoverImage
        ? { ...event.hoverImage, src: optimizeImage(event.hoverImage.src) }
        : undefined,
    }));
  }, [filteredEvents, visibleCount]);

  // 3. Chunk only the VISIBLE events for columns
  const [col1, col2, col3, col4] = useMemo(() => {
    if (!isDesktop) return [[], [], [], []];
    return chunkArray(visibleEvents, 4);
  }, [visibleEvents, isDesktop]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBase = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 max-w-[1800px] mx-auto min-h-screen pb-20"
    >
      {/* MOBILE LIST */}
      <div
        className={`${isDesktop ? "hidden" : "grid"} grid-cols-1 sm:grid-cols-2 gap-6 pb-10`}
      >
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} isDesktop={isDesktop} />
        ))}
      </div>

      {/* DESKTOP PARALLAX LIST */}
      {isDesktop && (
        <div className="grid grid-cols-4 gap-8 items-start w-full mb-20">
          <motion.div
            style={{ y: yBase }}
            className="flex flex-col gap-8 will-change-transform"
          >
            {col1.map((e) => (
              <EventCard key={e.id} event={e} isDesktop={isDesktop} />
            ))}
          </motion.div>

          <motion.div
            style={{ y: yFast }}
            className="flex flex-col gap-8 mt-32 will-change-transform"
          >
            {col2.map((e) => (
              <EventCard key={e.id} event={e} isDesktop={isDesktop} />
            ))}
          </motion.div>

          <motion.div
            style={{ y: yBase }}
            className="flex flex-col gap-8 will-change-transform"
          >
            {col3.map((e) => (
              <EventCard key={e.id} event={e} isDesktop={isDesktop} />
            ))}
          </motion.div>

          <motion.div
            style={{ y: yFast }}
            className="flex flex-col gap-8 mt-32 will-change-transform"
          >
            {col4.map((e) => (
              <EventCard key={e.id} event={e} isDesktop={isDesktop} />
            ))}
          </motion.div>
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredEvents.length && (
        <div className="w-full flex justify-center relative z-20">
          <button
            onClick={handleLoadMore}
            className="inline-block px-6 py-3 text-lg md:px-6 md:py-4 md:text-xl bg-[#E56399] text-white font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Load More ({filteredEvents.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

export default EventList;
