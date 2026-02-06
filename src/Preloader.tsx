import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PearlLoader from "./PearlLoader";

interface PreloaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Preloader: React.FC<PreloaderProps> = ({ setLoading }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      // Small buffer to ensure the animation plays out a bit
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 2500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        document.body.style.overflow = "";
      };
    }
  }, [setLoading]);

  return (
    <motion.div
      // added 'flex-col' to stack loader and text vertically
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0B14] text-black"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="w-64 h-64 md:w-96 md:h-96">
        <PearlLoader />
      </div>

      {/* Loading Text */}
      <motion.p
        className="mt-4 text-white/80 text-sm md:text-base font-light font-body tracking-[0.3em] uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          y: 0,
        }}
        transition={{
          opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 0.5 },
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
