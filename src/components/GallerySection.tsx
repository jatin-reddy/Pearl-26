import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. IMPORT THUMBNAILS: Low res (200px width), WebP format, for the grid
const thumbGlob = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: { w: 200, format: "webp" },
  import: "default",
});

// 2. IMPORT FULL SIZE: Original quality for the main card
const fullGlob = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

interface GalleryItem {
  id: number;
  thumbnail: string;
  full: string;
  alt: string;
}

// 3. MERGE THE LISTS: Match thumbnails to full images by file path
const SOURCE_IMAGES: GalleryItem[] = Object.keys(thumbGlob).map((path, i) => {
  return {
    id: i,
    thumbnail: thumbGlob[path] as string,
    full: fullGlob[path] as string,
    alt: `Gallery Image ${i + 1}`,
  };
});

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

  // OPTIMIZATION: Memoize the grid so it doesn't re-calculate on every render.
  // We also reduced the count. 80 repeats is usually enough to fill a large screen.
  const gridTiles = useMemo(() => {
    if (SOURCE_IMAGES.length === 0) return [];
    // Calculate how many copies we need to reach approx 150 tiles total
    const copies = Math.ceil(150 / SOURCE_IMAGES.length);
    return Array(copies).fill(SOURCE_IMAGES).flat();
  }, []);

  // --- CHANGE 1: PRELOADER LOGIC ---
  // Whenever the index changes, we download the Next and Previous full-res images
  // into the browser cache so they are ready before the user clicks.
  useEffect(() => {
    if (SOURCE_IMAGES.length === 0) return;

    const len = SOURCE_IMAGES.length;
    const nextIndex = (currentIndex + 1) % len;
    const prevIndex = (currentIndex - 1 + len) % len;

    const preloadList = [
      SOURCE_IMAGES[nextIndex].full,
      SOURCE_IMAGES[prevIndex].full,
    ];

    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex]);
  // ----------------------------------

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
  const currentItem = SOURCE_IMAGES[currentIndex];
  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 1 }),
  };

  if (SOURCE_IMAGES.length === 0) {
    return (
      <div className="p-10 text-center">No images found in assets/gallery</div>
    );
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-[#65A8C4] overflow-hidden flex flex-col font-sans">
      {/* BACKGROUND GRID */}
      <div className="absolute top-0 -left-10 -right-10 -bottom-20 overflow-hidden">
        {/* 'contain-strict' helps browser performance significantly here */}
        <div
          className="flex flex-wrap content-start gap-2 w-full h-full"
          style={{ contentVisibility: "auto" }}
        >
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
                  /* OPTIMIZATION: Only animate transform, not 'all' */
                  transition-transform duration-300 ease-out
                  hover:scale-110 hover:z-20 hover:shadow-xl
                `}
              >
                <img
                  // USE THE THUMBNAIL HERE
                  src={tile.thumbnail}
                  alt={tile.alt}
                  // OPTIMIZATION: Decode async prevents UI freeze
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-100 grayscale hover:grayscale-0 transition-[filter] duration-300"
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
            className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-40%] hover:shadow-none transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-black" strokeWidth={3} />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-40%] hover:shadow-none transition-all active:scale-95"
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
                    src={currentItem?.thumbnail}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
                    aria-hidden="true"
                  />

                  <img
                    src={currentItem?.full}
                    alt={currentItem?.alt}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    decoding="async"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <DotPattern color={activeColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
