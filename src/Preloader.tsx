import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PearlLoader from "./PearlLoader";

interface PreloaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Preloader: React.FC<PreloaderProps> = ({ setLoading }) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 2500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", updateDimensions);
      document.body.style.overflow = "";
    };
  }, [setLoading]);

  // SAFEGUARD
  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0B14]">
        <PearlLoader />
      </div>
    );
  }

  const isMobile = dimensions.width < 768;
  const blockSize = isMobile ? dimensions.width / 15 : dimensions.width / 30;

  const columns = Math.ceil(dimensions.width / blockSize) || 1;
  const rows = Math.ceil(dimensions.height / blockSize) || 1;
  const totalDots = columns * rows;

  const getDelay = (index: number) => {
    const colIndex = index % columns;
    const rowIndex = Math.floor(index / columns);

    const dx = colIndex - columns / 2;
    const dy = rowIndex - rows / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance * 0.035;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* 1. Loader Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center"
        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div className="w-64 h-64 md:w-96 md:h-96">
          <PearlLoader />
        </div>
        <motion.p
          className="mt-4 text-white/90 text-sm md:text-base font-bold tracking-[0.3em] uppercase font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Entering the Comic-Verse
        </motion.p>
      </motion.div>

      {/* 2. The Dot Grid Overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-wrap"
        style={{ width: "100vw", height: "100vh" }}
      >
        {[...Array(totalDots)].map((_, i) => (
          <div
            key={i}
            style={{
              width: blockSize,
              height: blockSize,
            }}
            className="flex items-center justify-center"
          >
            <motion.div
              className="bg-[#0E0B14] rounded-full"
              initial={{ scale: 1.6 }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: getDelay(i),
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
