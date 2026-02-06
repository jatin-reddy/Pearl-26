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
    <section
      className="w-full relative overflow-hidden flex items-center justify-center py-16 md:py-24 border-y-4 border-black"
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Decorative Element for that Comic Feel */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 15%, transparent 16%)",
          backgroundSize: "15px 15px",
        }}
      />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="w-full md:w-3/5 mb-10 md:mb-0 text-center md:text-left">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl text-white italic uppercase tracking-wider font-body"
            style={{
              // Using a more robust text-shadow stack for the outline
              textShadow: `
                -2px -2px 0 #000,  
                 2px -2px 0 #000,
                -2px  2px 0 #000,
                 2px  2px 0 #000,
                 6px  6px 0px #000
              `,
            }}
          >
            Escape Into <br className="hidden sm:block" />
            The <span className="text-yellow-400">Comic-Verse</span> Now
          </h2>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end items-center">
          <a
            href="https://www.unifest.in/fests/60?fest=pearl-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 text-xl md:text-2xl bg-[#E56399] text-white font-black uppercase tracking-tighter border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-1"
          >
            Register Now
          </a>
        </div>

        {imageSrc && (
          <div className="hidden lg:block absolute right-[-5%] bottom-[-10%] h-[120%] w-1/3 pointer-events-none">
            <img
              src={imageSrc}
              alt="Comic Character"
              className="object-contain h-full w-full drop-shadow-[10px_10px_0px_rgba(0,0,0,0.5)]"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;
