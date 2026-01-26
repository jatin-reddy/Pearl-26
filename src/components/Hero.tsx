import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";

import background from "../assets/herosection/background2.jpeg";
import rooftop from "../assets/herosection/heros-silouette.png";
import logo from "/PearlLogowDate.svg";
import MovingTape from "./Tape";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // later when we get a bigger asset (we can move it up on scroll)

  return (
    <section>
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
                className="w-[150%] max-w-none md:w-auto md:h-[70vh] object-contain object-bottom"
              />
            </motion.div>

            <div className="absolute top-6 left-6 z-20 md:top-12 md:left-12">
              <a
                href="/unifest"
                className="inline-block px-4 py-2 text-sm md:px-6 md:py-4 md:text-xl bg-[#E56399] text-white font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Register Now
              </a>
            </div>

            <div className="absolute top-30 right-10 z-20 md:top-48 md:right-30 md:left-auto md:translate-x-0">
              <img
                src={logo}
                alt="Pearl Logo"
                className="h-[16vh] md:w-72 md:h-auto drop-shadow-3xl"
              />
            </div>
          </div>
          <div className="absolute top-[100vh] left-0 right-0 bottom-0 z-30 bg-linear-to-b from-[#261A3E] to-[#080312]">
            <div className="pt-20 px-10">
              <h2 className="text-5xl font-bold text-[#FF2E93]">
                Pearl'26 - Escape into the Comic-Verse
              </h2>
              <p>About us comes here</p>
            </div>
          </div>
        </div>
      </div>
      <MovingTape />
    </section>
  );
}
