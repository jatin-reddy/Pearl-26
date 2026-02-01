import { useState } from "react";
import SectionHeading from "./SectionHeading";
import thumbnailImage from "../assets/thumbnail/aftermoviethumbnail.jpeg";

const LatestAftermovie = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoId = "hvL1339luv0";
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;


    return (
        <section className="relative w-full bg-[#080312] text-white overflow-hidden py-10 md:py-20">
            <div className="mb-8 md:mb-12">
                <SectionHeading
                    text1="LATEST"
                    text2="AFTERMOVIE"
                    text2Color="text-[#22D3EE]"
                />
            </div>

            <main className="relative flex items-center justify-center w-full px-6 md:px-12">
                <div className="relative w-full max-w-[1200px] mx-auto">
                    {/* Container with fixed aspect ratio to prevent Layout Shift.*/}
                    <div className="relative w-full aspect-[16/9] bg-black border-4 border-[#22D3EE] shadow-2xl overflow-hidden group">
                        {!isLoaded ? (
                            <button
                                onClick={() => setIsLoaded(true)}
                                className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center transition-transform duration-500 hover:scale-105"
                                style={{ backgroundImage: `url(${thumbnailImage})` }}
                                aria-label="Play Aftermovie"
                            >
                                {/* Overlay to ensure visibility */}
                                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/10" />

                                {/* Custom Play Button */}
                                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-[#22D3EE] rounded-full flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110">
                                    <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[18px] border-l-[#080312] ml-1 md:border-y-[15px] md:border-l-[25px]" />
                                </div>
                            </button>
                        ) : (
                            <iframe
                                src={embedUrl}
                                title="Pearl Aftermovie"
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy" // Native browser lazy loading
                            />
                        )}
                    </div>
                </div>
            </main>
        </section>
    );
};

export default LatestAftermovie;