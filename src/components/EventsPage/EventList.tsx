"use client";

import allEventData from "../../utils/allEventData.json";
import EventCard, { type Event } from "./EventCard";
import type { EventCategory } from "./Filter";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useMemo, useState, useEffect } from "react";

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
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const events = (allEventData as { events: Event[] }).events ?? [];
  const filtered =
    category === "all" ? events : events.filter((e) => e.category === category);
  const [col1, col2, col3, col4] = useMemo(
    () => chunkArray(filtered, 4),
    [filtered],
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yBase = useTransform(smoothProgress, [0, 1], [0, -50]);
  const yFast = useTransform(smoothProgress, [0, 1], [0, -200]);

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 max-w-[1800px] mx-auto min-h-screen"
    >
      <div
        className={`${isDesktop ? "hidden" : "grid"} grid-cols-1 sm:grid-cols-2 gap-6 pb-20`}
      >
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {isDesktop && (
        <div className="grid grid-cols-4 gap-8 items-start w-full">
          <motion.div style={{ y: yBase }} className="flex flex-col gap-8">
            {col1.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </motion.div>

          <motion.div
            style={{ y: yFast }}
            className="flex flex-col gap-8 mt-32"
          >
            {col2.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </motion.div>

          <motion.div style={{ y: yBase }} className="flex flex-col gap-8">
            {col3.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </motion.div>

          <motion.div
            style={{ y: yFast }}
            className="flex flex-col gap-8 mt-32"
          >
            {col4.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default EventList;
