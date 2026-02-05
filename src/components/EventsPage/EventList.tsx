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

function chunkArray<T>(array: T[], parts: number) {
  const result: T[][] = Array.from({ length: parts }, () => []);
  array.forEach((item, i) => {
    result[i % parts].push(item);
  });
  return result;
}

function EventList({ category }: EventListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // FIX: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout
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

  const events = (allEventData as { events: Event[] }).events ?? [];

  const filtered = useMemo(() => {
    return category === "all"
      ? events
      : events.filter((e) => e.category === category);
  }, [category, events]);

  const [col1, col2, col3, col4] = useMemo(() => {
    if (!isDesktop) return [[], [], [], []];
    return chunkArray(filtered, 4);
  }, [filtered, isDesktop]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBase = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 max-w-[1800px] mx-auto min-h-screen"
    >
      {/* MOBILE LIST */}
      <div
        className={`${isDesktop ? "hidden" : "grid"} grid-cols-1 sm:grid-cols-2 gap-6 pb-20`}
      >
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} isDesktop={isDesktop} />
        ))}
      </div>

      {/* DESKTOP PARALLAX LIST */}
      {isDesktop && (
        <div className="grid grid-cols-4 gap-8 items-start w-full">
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
    </div>
  );
}

export default EventList;
