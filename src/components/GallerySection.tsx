import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

const SOURCE_IMAGES: GalleryItem[] = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/${i + 300}/500/500`,
  alt: `Moment ${i + 1}`,
}));

const CARD_COLORS = ["#fde047", "#FF80DF", "#7EE2FF", "#85E98C"];

const DotPattern: React.FC<{ color: string }> = ({ color }) => (
  <div
    className="w-6 md:w-12 h-full flex-shrink-0 hidden sm:block transition-colors duration-500 ease-in-out"
    style={{ backgroundColor: color }}
  >
    <div
      className="w-full h-full opacity-50"
      style={{
        backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
        backgroundSize: "10px 10px",
      }}
    ></div>
  </div>
);

const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const gridTiles = Array(200).fill(SOURCE_IMAGES).flat();
  const getSmartDirection = (newIndex: number, oldIndex: number) => {
    const length = SOURCE_IMAGES.length;
    let dir = newIndex > oldIndex ? 1 : -1;

    if (Math.abs(newIndex - oldIndex) > length / 2) {
      dir *= -1;
    }
    return dir;
  };

  const handleGridClick = (sourceIndex: number) => {
    if (sourceIndex === currentIndex) return;

    const newDir = getSmartDirection(sourceIndex, currentIndex);
    setDirection(newDir);
    setCurrentIndex(sourceIndex);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SOURCE_IMAGES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + SOURCE_IMAGES.length) % SOURCE_IMAGES.length,
    );
  };

  const activeColor = CARD_COLORS[currentIndex % CARD_COLORS.length];
  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 1 }),
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-[#65A8C4] overflow-hidden flex flex-col font-sans">
      <div className="absolute top-0 -left-10 -right-10 -bottom-20 overflow-hidden">
        <div className="flex flex-wrap content-start gap-2 w-full h-full">
          {gridTiles.map((tile, gridIndex) => {
            const sourceIndex = gridIndex % SOURCE_IMAGES.length;

            const widthClass =
              gridIndex % 7 === 0
                ? "w-48"
                : gridIndex % 5 === 0
                  ? "w-32"
                  : gridIndex % 3 === 0
                    ? "w-24"
                    : "w-20";

            return (
              <div
                key={gridIndex}
                onClick={() => handleGridClick(sourceIndex)}
                className={`
                  relative h-20 md:h-28 ${widthClass} flex-auto
                  cursor-pointer overflow-hidden rounded-[2px]
                  transition-all duration-300 ease-out
                  hover:scale-110 hover:z-20 hover:shadow-xl
                `}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="w-full h-full object-cover opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* FOREGROUND CARD OVERLAY */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none p-4">
        <div className="relative w-full max-w-4xl pointer-events-auto">
          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-black rounded-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-40%] hover:shadow-none transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-black" strokeWidth={3} />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-black rounded-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-40%] hover:shadow-none transition-all active:scale-95"
          >
            <ChevronRight className="w-6 h-6 text-black" strokeWidth={3} />
          </button>

          <div className="w-full aspect-[4/3] md:aspect-video relative bg-white border-4 border-black overflow-hidden flex">
            <DotPattern color={activeColor} />

            <div className="flex-1 relative overflow-hidden bg-black border-l-4 border-r-4 border-black">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.3,
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={`https://picsum.photos/seed/${currentIndex + 300}/800/600`}
                    alt={SOURCE_IMAGES[currentIndex].alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Sidebar */}
            <DotPattern color={activeColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
