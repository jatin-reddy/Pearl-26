import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeading from "./SectionHeading";

const AboutPearl = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const row1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const row1Y = useTransform(scrollYProgress, [0.1, 0.3], ["50px", "0px"]);
  const row2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
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

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-0">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
          <div className="w-full h-full bg-white/5 absolute top-0 left-0" />
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-linear-to-b from-[#53D4F9] to-[#FA549D] shadow-[0_0_15px_#53D4F9]"
          />
        </div>

        <motion.div
          style={{ opacity: row1Opacity, y: row1Y }}
          className="relative flex flex-col-reverse md:flex-row items-center justify-between mb-24 md:mb-40"
        >
          <div className="w-full md:w-1/2 flex justify-center md:pr-16 mt-10 md:mt-0 mb-10 md:mb-0">
            <div className="w-7500px] bg-[#d9d9d9] shadow-[15px_15px_0px_rgba(255,255,255,0.1)] flex items-center justify-center border-2 border-white/5">
              <span className="font-pearl text-black text-xl">Comic Asset</span>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:pl-16 mt-10 md:mt-0">
            <div className="w-7500px] bg-[#d9d9d9] shadow-[-15px_15px_0px_rgba(255,255,255,0.1)] flex items-center justify-center border-2 border-white/5">
              <span className="font-pearl text-black text-xl">Comic Asset</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPearl;
