import { FaInstagram, FaFacebookF, FaShareNodes } from "react-icons/fa6";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";

import pearlLogo from "/PearlLogowDate1.svg";
import madeByDotaLogo from "../assets/made by DoTA.svg";

const Footer = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pearl'26 - BITS Hyderabad",
          text: "Check out Pearl'26, the cultural festival at BITS Hyderabad!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <footer className="relative w-full bg-black flex flex-col font-poppins border-t-4 border-black">
      <div
        // CHANGED: Reduced padding to tighten the whole block
        className="relative w-full bg-black text-white pt-6 pb-4"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* --- MAIN GRID --- */}
          {/* CHANGED: Align items-center to fix the "floating" look. Reduced mb significantly. */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 mb-6 items-center">
            {/* Col 1: Logo */}
            <div className="md:col-span-4 flex justify-center md:justify-start pt-6">
              <img src={pearlLogo} alt="Pearl Logo" className="w-32 md:w-56" />
            </div>

            {/* Col 2: Links */}
            <div className="md:col-span-4 flex flex-col items-center pt-4">
              <nav className="flex flex-col gap-2 text-center md:text-left">
                {["EVENTS", "GALLERY", "SPONSORS"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-[#22D3EE] text-lg md:text-xl font-bold tracking-wide font-body hover:text-white transition-colors duration-200 uppercase"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 3: Contact */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start pt-2">
              <div className="flex flex-col gap-2 text-lg md:text-xl text-gray-300 ">
                <div className="flex items-center gap-2">
                  <HiOutlinePhone className="w-4 h-4 text-gray-400 " />
                  <span>+91 94930 54925</span>
                </div>
                <div className="flex items-center gap-2 font-body">
                  <HiOutlineMail className="w-4 h-4 text-gray-400" />
                  <span className="break-all">
                    pearl@hyderabad.bits-pilani.ac.in
                  </span>
                </div>
                <div className="flex items-start gap-2 font-body">
                  <HiOutlineLocationMarker className="w-4 h-4 text-gray-400 mt-1" />
                  <span>BITS Pilani Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTTOM SECTION --- */}
          {/* Compacted vertically */}
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            {/* Social Icons */}
            <div className="flex gap-5 mb-1">
              <a href="#" className="hover:scale-110 transition-transform">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={handleShare}
                className="hover:scale-110 transition-transform"
              >
                <FaShareNodes className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Text Group */}
            <div className="text-center">
              <p className="text-gray-500 text-[10px] md:text-lg font-body font-bold tracking-widest uppercase flex items-center justify-center gap-1 pt-2">
                MADE WITH <span className="text-red-500">❤️</span> BY DOTA
              </p>
            </div>
          </div>
        </div>

        {/* --- CORNER LOGO (Desktop Only) --- */}
        {/* CHANGED: Removed bg-white wrapper. Positioned absolute bottom-right. */}
        <img
          src={madeByDotaLogo}
          alt="Dept of Technical Arts"
          className="hidden md:block absolute bottom-0 right-0 w-24 md:w-32 z-40 pointer-events-none"
        />
      </div>
    </footer>
  );
};

export default Footer;
