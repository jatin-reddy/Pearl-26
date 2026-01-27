import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface SectionHeadingProps {
  text1: string;
  text2: string;
  ghostText?: string;
  text1Color?: string;
  text2Color?: string;
  externalProgress?: MotionValue<number>;
}

export default function SectionHeading({
  text1,
  text2,
  ghostText,
  text1Color = "text-white",
  text2Color = "text-[#FF2E93]",
  externalProgress,
}: SectionHeadingProps) {
  const containerRef = useRef(null);

  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = externalProgress || internalProgress;

  const xGhost = useTransform(progress, [0, 1], ["3%", "-3%"]);
  const xTitle = useTransform(progress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center py-16 md:py-24 overflow-hidden pointer-events-none"
    >
      {/* --- GHOST BACKGROUND --- */}
      <motion.h2
        style={{ x: xGhost }}
        className="absolute font-pearl text-white/10 whitespace-nowrap select-none z-0"
      >
        <span className="text-[18vw] md:text-[10vw] tracking-widest">
          {ghostText || `${text1} ${text2}`}
        </span>
      </motion.h2>

      {/* --- FOREGROUND TITLE --- */}
      <motion.div
        style={{ x: xTitle }}
        className="relative z-10 flex gap-4 md:gap-6 font-pearl leading-none drop-shadow-2xl font-normal tracking-widest"
      >
        <span className={`${text1Color} text-[8vw] md:text-[4vw]`}>
          {text1}
        </span>
        <span className={`${text2Color} text-[8vw] md:text-[4vw]`}>
          {text2}
        </span>
      </motion.div>
    </div>
  );
}
