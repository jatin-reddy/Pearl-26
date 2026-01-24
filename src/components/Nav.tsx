import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";

interface NavLink {
  id: string;
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: "01", title: "HOME", href: "/" },
  { id: "02", title: "EVENTS", href: "/events" },
  { id: "03", title: "SPONSORS", href: "/sponsors" },
  { id: "04", title: "GALLERY", href: "/gallery" },
  { id: "05", title: "SCHEDULE", href: "/schedule" },
];

const socialLinks = [
  { name: "Facebook", icon: <FaFacebookF />, href: "#" },
  { name: "Instagram", icon: <FaInstagram />, href: "#" },
  { name: "YouTube", icon: <FaYoutube />, href: "#" },
  { name: "Twitter", icon: <FaTwitter />, href: "#" },
];

const menuVars: Variants = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const containerVars: Variants = {
  initial: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const linkVars: Variants = {
  initial: {
    y: "30vh",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] },
  },
};

const hamburgerLineVars: Variants = {
  closed: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  open: (i: number) => ({
    x: 40,
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const closeIconVars: Variants = {
  closed: {
    rotate: -90,
    scale: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  open: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-end items-center text-white pointer-events-none">
        <button
          onClick={toggleMenu}
          className="group flex items-center justify-center cursor-pointer focus:outline-none pointer-events-auto"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={hamburgerLineVars}
                  animate={isOpen ? "open" : "closed"}
                  initial="closed"
                  className="h-1 bg-white block w-8 origin-right"
                />
              ))}
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={closeIconVars}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>
          </div>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-screen bg-[#e95d90] text-white z-40 origin-top"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="flex-1 flex flex-col justify-center px-8 md:px-24 md:border-r md:border-white/20">
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col gap-8 md:gap-12"
                >
                  {navLinks.map((link) => (
                    <div key={link.id} className="overflow-hidden">
                      <motion.div variants={linkVars}>
                        <Link
                          to={link.href}
                          onClick={toggleMenu}
                          className="group flex items-baseline gap-4 md:gap-8 text-white hover:text-black transition-colors duration-300"
                        >
                          <span className="text-xl md:text-3xl font-grotesk font-bold opacity-50 group-hover:opacity-100 transition-opacity pt-2">
                            {link.id}
                          </span>
                          <span
                            className="font-pearl text-5xl md:text-8xl uppercase tracking-wide leading-[0.85]"
                            style={{
                              textShadow: "3px 3px 0px rgba(0,0,0,0.5)",
                            }}
                          >
                            {link.title}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center bg-[#d64d80] md:bg-transparent">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex gap-6 mt-12 md:mt-0"
                >
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:-translate-y-1 cursor-pointer text-2xl"
                      style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMenu;
