import React from "react";

interface ComicCTAProps {
  bgColor?: string;
  imageSrc?: string;
}

const CTASection: React.FC<ComicCTAProps> = ({
  bgColor = "#4EB4E6",
  imageSrc,
}) => {
  return (
    <div
      className="w-full relative overflow-hidden flex items-center justify-center py-12 md:py-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left z-20">
          <h2
            className="text-3xl md:text-5xl font-pearl text-white italic leading-none md:leading-tight uppercase transform -skew-x-2"
            style={{
              WebkitTextStroke: "2px black",
              textShadow: "3px 3px 0px #000",
            }}
          >
            Escape Into The <br />
            Comic-Verse Now!
          </h2>
        </div>

        <div className="md:w-1/4 flex justify-center z-20">
          <a
            href="https://www.unifest.in/fests/60?fest=pearl-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-lg md:px-6 md:py-4 md:text-xl bg-[#E56399] text-white font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Register Now
          </a>
        </div>

        {imageSrc && (
          <div className="hidden md:block absolute right-0 bottom-0 h-full w-1/3 pointer-events-none z-10">
            <img
              src={imageSrc}
              alt="Comic Character"
              className="object-contain h-[115%] w-full absolute bottom-[-5%] right-0"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CTASection;
