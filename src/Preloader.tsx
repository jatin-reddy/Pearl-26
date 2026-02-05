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
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 3000);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0B14] text-black"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="w-64 h-64 md:w-96 md:h-96">
        <PearlLoader />
      </div>
    </motion.div>
  );
};

export default Preloader;
