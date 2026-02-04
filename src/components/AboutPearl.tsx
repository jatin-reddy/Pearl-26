import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeading from "./SectionHeading";

import Monisha from "../assets/monisha.png";
import PearlBoi from "../assets/pearl boy RED.png";
const AboutPearl = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const row1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const row1Y = useTransform(scrollYProgress, [0.1, 0.3], ["50px", "0px"]);
  const row2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const row2Y = useTransform(scrollYProgress, [0.4, 0.6], ["50px", "0px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-transparent py-24 overflow-hidden"
    >
      <div className="mb-20 md:mb-32">
        <SectionHeading
          text1="ABOUT"
          text2="PEARL"
          ghostText="ABOUT PEARL"
          text2Color="text-[#FF2E93]"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-0">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
          <div className="w-full h-full absolute top-0 left-0" />
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-linear-to-b from-[#53D4F9] to-[#FA549D] shadow-[0_0_15px_#53D4F9]"
          />
        </div>

        <motion.div
          style={{ opacity: row1Opacity, y: row1Y }}
          className="relative flex flex-col-reverse md:flex-row items-center justify-between mb-24 md:mb-30"
        >
          <div className="w-full md:w-1/2 flex justify-center md:pr-16 mt-10 md:mt-0 mb-10 md:mb-0">
            <div className="relative w-96 h-96 hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300">
              <img
                src={PearlBoi}
                alt="Pearl 26 Mascot"
                className="w-full h-full object-contain p-2 transition-all duration-500 md:scale-110 hover:scale-120"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left md:pl-16">
            <h3 className="font-poppins font-bold text-white text-sm tracking-widest mb-2 uppercase">
              What is
            </h3>
            <h2 className="font-pearl text-5xl md:text-7xl text-[#22D3EE] leading-none mb-6">
              PEARL ?
            </h2>
            <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed max-w-md mx-auto md:mx-0 text-center md:text-justify">
              PEARL IS THE ANNUAL NATIONAL CULTURAL FESTIVAL OF BITS PILANI,
              HYDERABAD CAMPUS. PEARL HOSTS A VARIETY OF CULTURAL EVENTS AND
              COMPETITIONS WHICH INCLUDE MUSIC, DANCE, LITERATURE, FASHION,
              PHOTOGRAPHY AND QUIZZING. THE FEST ALSO HOSTS TALKS AND PRO-SHOWS
              WITH CELEBRITIES AND ARTISTS APPEARING AND PERFORMING DURING THE
              FEST.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: row2Opacity, y: row2Y }}
          className="relative flex flex-col md:flex-row items-center justify-between"
        >
          <div className="w-full md:w-1/2 text-center md:text-right md:pr-16 md:mt-0">
            <h3 className="font-poppins font-bold text-white text-sm tracking-widest mb-2 uppercase">
              What is the
            </h3>
            <h2 className="font-pearl text-5xl md:text-7xl text-[#FF2E93] leading-none mb-6">
              THEME ?
            </h2>
            <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed max-w-md mx-auto md:mx-0 md:ml-auto text-center md:text-justify">
              Pearl’26 breaks out of the panels and into reality. This year's
              theme is Escape into the Comic-Verse. It channels the chaos,
              colour, and energy of the comic-verse - where stories collide,
              heroes rise, and every moment feels larger than life.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:pl-6 mt-10 md:mt-0">
            <div className="w-96 h-96 flex items-center justify-center ">
              <img
                src={Monisha}
                alt="About Pearl 2026"
                className="w-full h-full object-contain p-2 transition-all duration-500 md:scale-110 hover:scale-120"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPearl;
