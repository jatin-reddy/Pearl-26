import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MovingTape from "./Tape";

import armaanMalik from "../assets/artistimages/Armaan Malik.jpg";
import mithoon from "../assets/artistimages/Mithoon.jpg";
import raftaar from "../assets/artistimages/Raftaar.jpg";
import shreyaGhoshal from "../assets/artistimages/Shreya Ghoshal.jpg";
import sunidhiChauhan from "../assets/artistimages/Sunidhi Chauhan.jpg";

const ARTISTS = [
    {
        id: 1,
        name: "ARMAAN MALIK",
        year: "2024",
        image: armaanMalik,
    },
    {
        id: 2,
        name: "SHREYA GHOSHAL",
        year: "2023",
        image: shreyaGhoshal,
    },
    {
        id: 3,
        name: "RAFTAAR",
        year: "2022",
        image: raftaar,
    },
    {
        id: 4,
        name: "SUNIDHI CHAUHAN",
        year: "2021",
        image: sunidhiChauhan,
    },
    {
        id: 5,
        name: "MITHOON",
        year: "2020",
        image: mithoon,
    },
];

interface Artist {
    id: number;
    name: string;
    year: string;
    image: string;
}

const ArtistCard = ({
    artist,
    isMain = false,
}: {
    artist: Artist;
    isMain?: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full h-full flex flex-col items-center justify-center transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Artist Image Card */}
            <div className="relative w-full h-full overflow-hidden bg-[#E5E5E5] border-4 border-white shadow-lg">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                        filter: isHovered
                            ? "contrast(1.2) saturate(0.8)"
                            : "contrast(1) saturate(1)",
                    }}
                />

                {/* Ben-Day Dots - Cyan Layer */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(0, 174, 239, 0.5) 1.8px, transparent 1.8px)`,
                        backgroundSize: "6px 6px",
                        mixBlendMode: "multiply",
                    }}
                />

                {/* Ben-Day Dots - Magenta Layer (offset) */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(236, 0, 140, 0.45) 1.8px, transparent 1.8px)`,
                        backgroundSize: "6px 6px",
                        backgroundPosition: "3px 0px",
                        mixBlendMode: "multiply",
                    }}
                />

                {/* Ben-Day Dots - Yellow Layer (different offset) */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255, 242, 0, 0.4) 1.8px, transparent 1.8px)`,
                        backgroundSize: "6px 6px",
                        backgroundPosition: "0px 3px",
                        mixBlendMode: "multiply",
                    }}
                />

                {/* Artist Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6">
                    <h3
                        className={`font-pearl uppercase leading-tight text-white tracking-wide transition-all duration-300 ${isMain ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                            }`}
                        style={{
                            filter: "drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.9))"
                        }}
                    >
                        {artist.name}
                    </h3>
                    <p className="font-poppins text-sm md:text-base text-white/80 mt-1">
                        Pearl {artist.year}
                    </p>
                </div>
            </div>
        </div>
    );
};

const imageVariants = {
    center: {
        x: "0%",
        scale: 1,
        zIndex: 10,
        opacity: 1,
        filter: "grayscale(0%)",
    },
    left1: {
        x: "-125%",
        scale: 0.8,
        zIndex: 5,
        opacity: 0.7,
        filter: "grayscale(10%)",
    },
    left2: {
        x: "-250%",
        scale: 0.6,
        zIndex: 1,
        opacity: 0.4,
        filter: "grayscale(20%)",
    },
    right1: {
        x: "125%",
        scale: 0.8,
        zIndex: 5,
        opacity: 0.7,
        filter: "grayscale(10%)",
    },
    right2: {
        x: "250%",
        scale: 0.6,
        zIndex: 1,
        opacity: 0.4,
        filter: "grayscale(20%)",
    },
};

const PreviousArtists = () => {
    const [positionIndex, setPositionIndex] = useState(0);
    const [isShrinking, setIsShrinking] = useState(false);

    const handleSlideChange = useCallback(
        (direction: "next" | "prev") => {
            if (isShrinking) return;

            setIsShrinking(true);

            setTimeout(() => {
                setPositionIndex((prev) =>
                    direction === "next" ? prev + 1 : prev - 1,
                );

                setTimeout(() => {
                    setIsShrinking(false);
                }, 500);
            }, 200);
        },
        [isShrinking],
    );

    const nextSlide = useCallback(
        () => handleSlideChange("next"),
        [handleSlideChange],
    );
    const prevSlide = useCallback(
        () => handleSlideChange("prev"),
        [handleSlideChange],
    );

    // Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    const getArtistIndex = (idx: number) => {
        return ((idx % ARTISTS.length) + ARTISTS.length) % ARTISTS.length;
    };

    return (
        <>
            <div className="relative w-full min-h-screen h-auto bg-[#DE70C3] text-white overflow-x-hidden flex flex-col font-sans py-10 md:py-20">
                {/* Section Heading */}
                <SectionHeading
                    text1="PREVIOUS"
                    text2="ARTISTS"
                    text2Color="text-[#9A0274]"
                />

                {/* The Carousel */}
                <main className="relative flex-1 min-h-[500px] md:min-h-[750px] flex items-center justify-center w-full overflow-hidden">
                    <div className="relative w-full h-[500px] md:h-[750px] flex items-center justify-center text-center">
                        {[-2, -1, 0, 1, 2].map((offset) => {
                            const idx = positionIndex + offset;
                            const artistIndex = getArtistIndex(idx);

                            let pos = "center";
                            if (offset === -1) pos = "left1";
                            else if (offset === -2) pos = "left2";
                            else if (offset === 1) pos = "right1";
                            else if (offset === 2) pos = "right2";

                            // @ts-expect-error - indexing strictly controlled by pos logic
                            const targetVariant = imageVariants[pos];

                            return (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={{
                                        ...targetVariant,
                                        scale: isShrinking ? 0.9 : targetVariant.scale,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 1, 0.5, 1],
                                        scale: { duration: 0.2 },
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.05}
                                    onDragEnd={(_, { offset }) => {
                                        const swipeThreshold = 50;
                                        if (offset.x < -swipeThreshold) {
                                            nextSlide();
                                        } else if (offset.x > swipeThreshold) {
                                            prevSlide();
                                        }
                                    }}
                                    className={`absolute w-[70vw] md:w-[600px] h-[400px] md:h-[600px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${offset === 0
                                        ? "z-20"
                                        : "z-10 cursor-pointer hover:brightness-110"
                                        }`}
                                    onClick={() => {
                                        if (offset === -1) prevSlide();
                                        if (offset === 1) nextSlide();
                                    }}
                                >
                                    <div className="w-full h-full pointer-events-none md:pointer-events-auto">
                                        <ArtistCard artist={ARTISTS[artistIndex]} isMain={offset === 0} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </main>
                
                {/* Footer with Buttons and Progress Line */}
                <footer className="relative z-20 px-8 md:px-16 pb-12 w-full border-t border-white/20 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                        {/* Buttons */}
                        <div className="flex gap-6">
                            <button
                                onClick={prevSlide}
                                className="w-16 h-16 bg-[#9A0274] text-black flex items-center justify-center hover:brightness-110 transition-all font-bold shadow-[6px_6px_0px_#000000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-16 h-16 bg-[#FFFFFF] text-[#000000] flex items-center justify-center hover:brightness-95 transition-all font-bold shadow-[6px_6px_0px_#000000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/*Progress line animation*/}
                        <div className="flex-1 mx-16 h-[1px] bg-black/30 relative">
                            <motion.div
                                className="absolute top-0 bottom-0 left-0 bg-black h-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: `${(((Math.abs(positionIndex) % ARTISTS.length) + 1) / ARTISTS.length) * 100}%`,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>
                </footer>
            </div>
            <MovingTape />
        </>
    );
};

export default PreviousArtists;
