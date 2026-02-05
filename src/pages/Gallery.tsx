import React from "react";
import GallerySection from "../components/GallerySection";
import SectionHeading from "../components/SectionHeading";
import MovingTape from "../components/Tape";
import CTASection from "../components/CTASection";

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#4EB4E6] flex flex-col">
      <MovingTape />

      <div className="flex-none pt-20 pb-10">
        <SectionHeading
          text1="OUR"
          text2="GALLERY"
          text2Color="text-[#F53489]"
        />
      </div>

      <div className="flex-1 w-full relative mt-4 mb-20">
        <GallerySection />
      </div>

      <CTASection />
    </div>
  );
};

export default Gallery;
