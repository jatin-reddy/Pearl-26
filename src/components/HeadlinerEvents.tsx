import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const EVENTS: Event[] = [
  {
    id: 1,
    number: '01',
    title: 'LOREM IPSUM',
    description: 'Mascots for the club or any image but it should be of same style for all the clubs',
    baseColor: 'bg-[#E5E5E5]', // Light Grey
    stroke: '#22D3EE', // Cyan
    boxColor: 'bg-[#F0ABFC]' // Pink
  },
  {
    id: 2,
    number: '02',
    title: 'Event 2',
    description: 'Mascots for the club or any image but it should be of same style for all the clubs',
    baseColor: 'bg-[#E5E5E5]', // Light Grey
    stroke: '#22D3EE', // Cyan
    boxColor: 'bg-[#F0ABFC]' // Pink
  },
  {
    id: 3,
    number: '03',
    title: 'THIRD EVENT',
    description: 'Mascots for the club or any image but it should be of same style for all the clubs',
    baseColor: 'bg-[#E5E5E5]', // Light Grey
    stroke: '#22D3EE', // Cyan
    boxColor: 'bg-[#F0ABFC]' // Pink
  },
  {
    id: 4,
    number: '04',
    title: 'The next event',
    description: 'Mascots for the club or any image but it should be of same style for all the clubs',
    baseColor: 'bg-[#E5E5E5]', // Light Grey
    stroke: '#22D3EE', // Cyan
    boxColor: 'bg-[#F0ABFC]' // Pink
  },
  {
    id: 5,
    number: '05',
    title: 'Last event',
    description: 'Mascots for the club or any image but it should be of same style for all the clubs',
    baseColor: 'bg-[#E5E5E5]', // Light Grey
    stroke: '#22D3EE', // Cyan
    boxColor: 'bg-[#F0ABFC]' // Pink
  },
];

interface Event {
  id: number;
  number: string;
  title: string;
  description: string;
  baseColor: string;
  stroke: string;
  boxColor: string;
}

const EventCard = ({ event, isMain = false }: { event: Event, isMain?: boolean }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500`}>

      {/* Main Background Area (Card) */}
      <div className={`absolute inset-0 z-0 ${event.baseColor} flex items-center justify-center shadow-lg`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </div>

      {/* Outlined Number - z-40 to sit ABOVE the box */}
      <div className={`absolute z-40 font-black italic tracking-tighter leading-none transition-all duration-500 select-none pointer-events-none flex items-center justify-center
             text-[12rem] inset-0`}
        style={{
          WebkitTextStroke: `2px ${event.stroke}`,
          color: 'transparent',
        }}
      >
        <span className="translate-y-8">
          {event.number}
        </span>
      </div>

      {/* Overlay Text Box (Bottom Right) - Visible on ALL cards*/}
      <div
        className={`absolute z-30 ${event.boxColor} text-black shadow-2xl flex flex-col justify-center
            w-[600px] h-[360px] -bottom-20 -right-20 p-10 pr-16`}
      >
        <h3 className="font-black uppercase leading-none mb-4 text-4xl">
          {event.title}
        </h3>
        <div className={`transition-opacity duration-300 opacity-100 delay-100`}>
          <p className={`font-bold leading-relaxed block ${isMain ? 'text-base' : 'text-sm line-clamp-4'}`}>
            {event.description}
          </p>
        </div>
      </div>

    </div>
  );
};

const imageVariants = {
  center: { x: '0%', scale: 1, zIndex: 10, opacity: 1, filter: 'grayscale(0%)' },
  left1: { x: '-125%', scale: 1, zIndex: 5, opacity: 0.9, filter: 'grayscale(1%)' },
  left2: { x: '-250%', scale: 1, zIndex: 1, opacity: 1, filter: 'grayscale(10%)' },
  right1: { x: '125%', scale: 1, zIndex: 5, opacity: 0.9, filter: 'grayscale(10%)' },
  right2: { x: '250%', scale: 1, zIndex: 1, opacity: 1, filter: 'grayscale(10%)' },
};

const HeadlinerEvents = () => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [isShrinking, setIsShrinking] = useState(false);

  const handleSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isShrinking) return; // Prevent spamming

    setIsShrinking(true);

    // 1. Shrink
    setTimeout(() => {
      // 2. Move after shrink completes
      setPositionIndex((prev) => direction === 'next' ? prev + 1 : prev - 1);

      // 3. Grow back after move completes
      setTimeout(() => {
        setIsShrinking(false);
      }, 500); // Wait for move animation (0.5s)
    }, 200); // Shrink duration
  }, [isShrinking]);

  const nextSlide = useCallback(() => handleSlideChange('next'), [handleSlideChange]);
  const prevSlide = useCallback(() => handleSlideChange('prev'), [handleSlideChange]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getEventIndex = (idx: number) => {
    // Handling negative modulo properly
    return ((idx % EVENTS.length) + EVENTS.length) % EVENTS.length;
  };

  return (
    <div className="relative w-full h-screen bg-[#0E0B14] text-white overflow-hidden flex flex-col font-sans">

      {/* 2. Main Header */}
      <header className="relative z-20 pt-8 px-8 md:px-16 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase flex gap-4 drop-shadow-lg leading-none">
          <span className="text-white">HEADLINER</span>
          <span className="text-[#F0ABFC]">EVENTS</span>
        </h2>
      </header>

      {/* 3. The Carousel */}
      <main className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
        <div className="relative w-full h-[600px] flex items-center justify-center text-center">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const idx = positionIndex + offset;
            const eventIndex = getEventIndex(idx);

            let pos = 'center';
            if (offset === -1) pos = 'left1';
            else if (offset === -2) pos = 'left2';
            else if (offset === 1) pos = 'right1';
            else if (offset === 2) pos = 'right2';

            // @ts-expect-error- indexing strictly controlled by pos logic
            const targetVariant = imageVariants[pos];

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  ...targetVariant,
                  scale: isShrinking ? 0.9 : targetVariant.scale // Override scale
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                  scale: { duration: 0.2 } // Faster scale transition
                }}
                className={`absolute w-[340px] md:w-[900px] h-[550px] shadow-[0_30px_80px_rgba(0,0,0,0.8)] ${offset === 0 ? '' : 'cursor-pointer hover:brightness-110'
                  }`}
                onClick={() => {
                  if (offset === -1) prevSlide();
                  if (offset === 1) nextSlide();
                }}
              >
                <EventCard
                  event={EVENTS[eventIndex]}
                  isMain={offset === 0}
                />
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* 4. Footer Controls */}
      <footer className="relative z-20 px-8 md:px-16 pb-12 w-full border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              onClick={prevSlide}
              className="w-16 h-16 bg-[#22D3EE] text-white flex items-center justify-center hover:brightness-110 transition-all font-bold shadow-[6px_6px_0px_white] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-16 h-16 bg-[#F0ABFC] text-white flex items-center justify-center hover:brightness-110 transition-all font-bold shadow-[6px_6px_0px_white] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>


          {/* Line Progress */}
          <div className="flex-1 mx-16 h-[1px] bg-white/10 relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-[#22D3EE] h-full shadow-[0_0_10px_#22D3EE]"
              initial={{ width: "0%" }}
              animate={{ width: `${((Math.abs(positionIndex) % EVENTS.length + 1) / EVENTS.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

        </div>
      </footer>
    </div>
  );
};

export default HeadlinerEvents;
