
import allEventData from "../../utils/allEventData.json";
import EventCard, { type Event } from "./EventCard";
import type { EventCategory } from "./Filter";
import { motion, type Variants } from "motion/react";

type EventListProps = {
  category: EventCategory;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // equivalent-ish to "easeOut"
    },
  },
};

function EventList({ category }: EventListProps) {
  const events = (allEventData as { events: Event[] }).events ?? [];

  const filtered =
    category === "all" ? events : events.filter((e) => e.category === category);

  return (
    <motion.div
      key={category}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid md:grid-cols-4 md:gap-8 md:px-24 md:py-24 px-4 gap-6 grid-cols-2 py-12"
    >
      {filtered.map((event, i) => (
        <motion.div
          key={event.id}
          variants={item}
          className={i % 2 === 0 ? "md:translate-y-12" : ""}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default EventList;