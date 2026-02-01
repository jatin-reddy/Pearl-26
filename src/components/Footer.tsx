import pearlLogo from "/Pearl'26_logo.svg";
import papercut from "../assets/footer/Papercut.svg";
import city from "../assets/footer/City.svg";
import phone from "../assets/footer/phone-stroke.svg";
import email from "../assets/footer/Email.svg";
import mapPin from "../assets/footer/map-pin-stroke.svg";
import instagram from "../assets/footer/Instagram.svg";
import facebook from "../assets/footer/Facebook.svg";
import share from "../assets/footer/share-01-stroke.svg";
import madeByDota from "../assets/footer/made by DoTA.svg";

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
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <footer className="relative w-full bg-black overflow-hidden">
            {/*Torn Paper Edge*/} 
            <div className="w-full">
                <img
                    src={papercut}
                    alt="Torn paper edge"
                    className="w-full h-auto block"
                    style={{ display: 'block', verticalAlign: 'middle' }}
                />
            </div>

            {/* City Skyline */}
            <div className="w-full bg-white">
                <img
                    src={city}
                    alt="City skyline"
                    className="w-full h-auto block"
                    style={{ display: 'block', verticalAlign: 'middle' }}
                />
            </div>

            {/*Footer content area*/}
            <div
                className="relative w-full bg-black text-white py-6 md:py-8 pb-3 md:pb-4"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
                    backgroundSize: "10px 10px"
                }}
            >
                <div className="max-w-6xl mx-auto px-6">
                    {/* Desktop: 3-column grid, Mobile: stacked */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 md:gap-x-8 mb-4">

                        {/* 1️⃣ Left Column - Branding */}
                        <div className="flex flex-col items-center md:items-start md:-ml-8">
                            <img
                                src={pearlLogo}
                                alt="Pearl Logo"
                                className="w-48 md:w-56 lg:w-64"
                            />
                        </div>

                        {/*Middle Column - Navigation links to other pages */}
                        <nav className="flex flex-col items-center justify-start pt-2">
                            <div className="flex flex-col items-center gap-5">
                                <a
                                    href="/events"
                                    className="font-pearl text-lg md:text-xl hover:text-[#22D3EE] transition-colors duration-300"
                                >
                                    EVENTS
                                </a>
                                <a
                                    href="/sponsors"
                                    className="font-pearl text-lg md:text-xl hover:text-[#22D3EE] transition-colors duration-300"
                                >
                                    SPONSORS
                                </a>
                                <a
                                    href="/gallery"
                                    className="font-pearl text-lg md:text-xl hover:text-[#22D3EE] transition-colors duration-300"
                                >
                                    GALLERY
                                </a>
                            </div>
                        </nav>

                        {/* Right Column - Includes Contact Info */}
                        <div className="flex flex-col items-center md:items-start pt-2">
                            <address className="not-italic flex flex-col items-center md:items-start gap-4 font-poppins text-sm md:text-base">
                                <div className="flex items-center gap-3">
                                    <img src={phone} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                                    <p className="text-white">+91 99490 20295</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={email} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                                    <p className="text-white break-all">pearl@hyderabad.bits-pilani.ac.in</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={mapPin} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                                    <p className="text-white">BITS Hyderabad, India</p>
                                </div>
                            </address>
                        </div>
                    </div>

                    {/* Social media icons and Made by dota in same row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4 items-center">
                        {/* Empty Left Column */}
                        <div className="hidden md:block"></div>

                        {/* Social Media Icons*/}
                        <div className="flex justify-center gap-5">
                            <a
                                href="https://www.instagram.com/pearl.bitsh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Instagram"
                                className="hover:scale-110 transition-transform duration-300"
                            >
                                <img src={instagram} alt="Instagram" className="w-7 h-7 md:w-8 md:h-8" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Facebook"
                                className="hover:scale-110 transition-transform duration-300"
                            >
                                <img src={facebook} alt="Facebook" className="w-7 h-7 md:w-8 md:h-8" />
                            </a>
                            <button
                                onClick={handleShare}
                                aria-label="Share"
                                className="hover:scale-110 transition-transform duration-300 bg-transparent border-none cursor-pointer"
                            >
                                <img src={share} alt="Share" className="w-7 h-7 md:w-8 md:h-8" />
                            </button>
                        </div>

                         {/* Made by DOTA */} 
                        <div className="flex justify-center md:justify-end">
                            <img
                                src={madeByDota}
                                alt="Made by DOTA"
                                className="w-28 md:w-36 lg:w-40 opacity-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
