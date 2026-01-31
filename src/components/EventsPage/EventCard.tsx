"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type Event = {
  id: string;
  name: string;
  category: string;
  image?: { src: string; alt: string };
  hoverImage?: { src: string; alt: string };
};

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const [active, setActive] = useState(false);

  const words = event.name.split(" ");

  return (
    <div
      className="relative w-full cursor-pointer"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive((p) => !p)} 
    >
     
      <div className="card-shape relative md:h-[400px] h-[300px] w-full overflow-hidden bg-black border border-zinc-800 transition-all duration-300 hover:border-lime-400">

        {/* Base Image */}
        <motion.img
          src={event.image?.src}
          alt={event.image?.alt || event.name}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: active ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Hover Reveal Image */}
        {event.hoverImage?.src && (
          <motion.img
            src={event.hoverImage.src}
            alt={event.hoverImage.alt || event.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{
              clipPath: active
                ? "inset(0% 0% 0% 0%)"
                : "inset(100% 0% 0% 0%)",
              scale: active ? 1.05 : 1,
            }}
            transition={{
              clipPath: {
                duration: 0.9,
                ease: [0.77, 0, 0.175, 1],
              },
              scale: { duration: 0.8 },
            }}
          />
        )}
      </div>

      <div className="absolute bottom-[22px] right-[22px] z-10 flex gap-2">
        <span className="text-white md:text-lg text-sm tracking-wide">
          {words[0]}
        </span>
        <span className="text-[#F3D300] md:text-lg text-sm tracking-wide">
          {words[1]}
        </span>
      </div>
    </div>
  );
}

export default EventCard;
