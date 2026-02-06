"use client";

import allEventData from "../../utils/allEventData.json";
import EventCard from "./EventCard";
import type { EventCategory } from "./Filter";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo, useState, useEffect } from "react";

export type Event = {
  id: string | number;
  slug: string;
  name: string;
  category: string;
  tag: string;
  description?: string;
  image?: { src: string; alt: string };
  hoverImage?: { src: string; alt: string };
};

type EventListProps = {
  category: EventCategory;
};

const optimizeImage = (url?: string) => {
  if (!url) return "";
  if (url.includes("images.unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}w=500&q=80&auto=format`;
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

const ITEMS_PER_PAGE = 16;

function EventList({ category }: EventListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkSize = () => {
      clearTimeout(timeoutId);
      // Trigger desktop layout at 1024px
      timeoutId = setTimeout(
        () => setIsDesktop(window.innerWidth >= 1024),
        100,
      );
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [category]);

  const rawEvents = (allEventData as { events: Event[] }).events ?? [];

  const filteredEvents = useMemo(() => {
    if (category === "all") return rawEvents;
    return rawEvents.filter(
      (e) => e.tag?.toLowerCase() === category.toLowerCase(),
    );
  }, [category, rawEvents]);

  const visibleEvents = useMemo(() => {
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

  // 4 Columns
  const [col1, col2, col3, col4] = useMemo(() => {
    if (!isDesktop) return [[], [], [], []];
    return chunkArray(visibleEvents, 4);
  }, [visibleEvents, isDesktop]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBase = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div
      ref={containerRef}
      // --- FIX: PERCENTAGE WIDTHS ---
      // Mobile: w-[95%] (maximizes space on small phones)
      // Desktop: w-[80%] (creates that 10% margin on left/right for the "clean" look)
      className="w-[90%] md:w-[70%] mx-auto min-h-screen pb-20"
    >
      {/* MOBILE LIST */}
      <div
        className={`${
          isDesktop ? "hidden" : "grid"
        } grid-cols-1 sm:grid-cols-2 gap-8 pb-10`}
      >
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} isDesktop={isDesktop} />
        ))}
      </div>

      {/* DESKTOP PARALLAX LIST */}
      {isDesktop && (
        <div className="grid grid-cols-4 gap-16 items-start w-full">
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
            className="flex flex-col gap-8 mt-16 will-change-transform"
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
            className="flex flex-col gap-8 mt-16 will-change-transform"
          >
            {col4.map((e) => (
              <EventCard key={e.id} event={e} isDesktop={isDesktop} />
            ))}
          </motion.div>
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredEvents.length && (
        <div className="w-full flex justify-center relative z-20 mt-10 md:-mt-10">
          <button
            onClick={handleLoadMore}
            className="inline-block px-6 py-3 text-base md:text-lg bg-[#E56399] text-white font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Load More ({filteredEvents.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

export default EventList;
