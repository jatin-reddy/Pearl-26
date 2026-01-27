import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import background from "../assets/herosection/background2.jpeg";
import rooftop from "../assets/herosection/heros-silouette.png";
import logo from "/PearlLogowDate.svg";
import MovingTape from "./Tape";
import Countdown from "./Countdown";
import AboutPearl from "./AboutPearl";

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // later when we get a bigger asset (we can move it up on scroll)

  const gradientOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-5%"]);

  return (
    <section>
      <div
        ref={containerRef}
        className="relative min-h-[250vh] md:min-h-[240vh] bg-[#0E0B14] text-white overflow-hidden"
      >
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
            style={{ scale: fgScale, y: fgY, transformOrigin: "bottom left" }}
            className="absolute left-0 bottom-0 z-10 origin-bottom-left w-auto h-auto"
          >
            <img
              src={rooftop}
              alt="Superheroes"
              className="w-[150%] max-w-none md:w-auto md:h-[70vh] object-contain object-bottom"
            />
          </motion.div>

          <motion.div
            style={{ opacity: gradientOpacity }}
            className="absolute inset-0 z-20 pointer-events-none bg-[#261A3E]"
          />

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-30 w-full h-full"
          >
            <div className="absolute top-12 left-6 md:top-12 md:left-12">
              <a
                href="/unifest"
                className="inline-block px-4 py-2 text-sm md:px-6 md:py-4 md:text-xl bg-[#E56399] text-white font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Register Now
              </a>
            </div>

            <div className="absolute top-30 right-10 md:top-40 md:right-24 md:left-auto md:translate-x-0">
              <img
                src={logo}
                alt="Pearl Logo"
                className="h-[18vh] md:w-78 md:h-auto drop-shadow-3xl"
              />
            </div>

            <div className="absolute right-10 bottom-10 scale-100 origin-bottom-right md:scale-100 md:bottom-8 md:right-12">
              <Countdown />
            </div>
          </motion.div>
        </div>

        <div className="relative z-40 w-full mt-[-100vh] pointer-events-none">
          <div className="h-screen w-full" />
          <div className="relative pointer-events-auto min-h-screen bg-linear-to-b from-[#261A3E] to-[#080312]">
            <AboutPearl />
          </div>
        </div>
      </div>

      <MovingTape />
    </section>
  );
}
