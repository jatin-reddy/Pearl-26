import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="min-h-screen bg-[#F25C9A] py-24 overflow-hidden"
    >
      {/* STATIC HEADING */}
      <SectionHeading
        text1="OUR"
        text2="SPONSORS"
        ghostText="SPONSORS"
        text1Color="text-white"
        text2Color="text-white"
        staticHeading
      />

      {/* CONTENT */}
      <div className="mt-20 flex flex-col items-center gap-20">

        {/* TITLE SPONSOR 1 */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-white tracking-widest text-sm">
            TITLE SPONSOR
          </p>
          <div className="w-[320px] h-[180px] bg-[#E5E5E5]" />
        </div>

        {/* TITLE SPONSOR 2 */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-white tracking-widest text-sm">
            TITLE SPONSOR
          </p>
          <div className="w-[320px] h-[180px] bg-[#E5E5E5]" />
        </div>

        {/* AUTO-MOVING TITLE SPONSOR ROW */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-white tracking-widest text-sm">
            TITLE SPONSOR
          </p>

          <motion.div
            className="flex gap-8"
            animate={{ x: [0, 80] }}        // 👈 moves right
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",      // 👈 smooth back & forth
            }}
          >
            <div className="w-[220px] h-[140px] bg-[#E5E5E5]" />
            <div className="w-[220px] h-[140px] bg-[#E5E5E5]" />
            <div className="w-[220px] h-[140px] bg-[#E5E5E5]" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}