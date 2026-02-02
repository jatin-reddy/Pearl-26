import React from "react";
import GallerySection from "../components/GallerySection";
import SectionHeading from "../components/SectionHeading";
import MovingTape from "../components/Tape";

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#4FB1CD] flex flex-col">
      <MovingTape />

      <div className="flex-none pt-20 pb-10">
        <SectionHeading
          text1="HEADLINER"
          text2="EVENTS"
          text2Color="text-[#F53489]"
        />
      </div>

      <div className="flex-1 w-full relative mt-4 mb-20">
        <GallerySection />
      </div>
    </div>
  );
};

export default Gallery;
