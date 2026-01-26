import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import background from "../assets/herosection/background2.jpeg";
import rooftop from "../assets/herosection/heros-silouette.png";
import logo from "/Pearl'26_logo.svg";

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // later when we get a bigger asset (we can move it up on scroll)

  return (
    <div className="bg-[#261A3E] min-h-screen text-white overflow-x-hidden">
      <div ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0 z-0"
          >
            <img
              src={background}
              alt="City Background"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ scale: fgScale, y: fgY }}
            className="absolute left-0 bottom-0 z-10 origin-bottom-left w-auto h-auto"
          >
            <img
              src={rooftop}
              alt="Superheroes"
              className="h-[70vh] w-auto max-w-none object-contain object-bottom"
            />
          </motion.div>

          <div className="absolute top-6 right-6 z-20 md:top-48 md:right-30">
            <img
              src={logo}
              alt="Pearl Logo"
              className="w-32 md:w-84 drop-shadow-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
