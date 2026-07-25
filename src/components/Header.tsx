import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Github, Send, Mail, Phone, MapPin } from "lucide-react";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenSubmissions?: () => void;
}

export default function Header({ onScrollToSection, onOpenContact, onOpenSubmissions }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", target: "hero-section" },
    { label: "About", target: "about-section" },
    { label: "Services", target: "services-section" },
    { label: "Work", target: "work-section" },
    { label: "Credentials", target: "certifications-section" },
    { label: "Hackfest '26", target: "hackfest" },
    { label: "Contact", target: "contact-section" },
  ];

  const handleLinkClick = (targetId: string) => {
    setIsMenuOpen(false);
    onScrollToSection(targetId);
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0b0b0b]/90 to-[#0b0b0b]/0 backdrop-blur-[2px] border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
        id="main-app-header"
      >
        {/* Left Side: Hamburger Menu Button */}
        <div className="flex items-center gap-4" id="header-left">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 border border-white/10 hover:border-white/30 rounded-none flex flex-col gap-1.5 items-center justify-center group cursor-pointer transition-colors bg-black/40"
            id="hamburger-btn"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X size={18} className="text-white group-hover:scale-110 transition-transform" />
            ) : (
              <>
                <span className="w-5 h-[1.5px] bg-white transition-all group-hover:w-6" id="h-line-1" />
                <span className="w-5 h-[1.5px] bg-white transition-all group-hover:w-4" id="h-line-2" />
                <span className="w-3 h-[1.5px] bg-white transition-all group-hover:w-6 self-start ml-[13px]" id="h-line-3" />
              </>
            )}
          </button>
          
          <div className="hidden lg:block font-mono text-[10px] tracking-widest text-neutral-500 uppercase" id="header-country-desktop">
            [ DEPT ] FULL STACK
          </div>
        </div>

        {/* Center Side: Chandru Logo */}
        <div 
          onClick={() => handleLinkClick("hero-section")}
          className="flex items-center justify-center gap-3 md:gap-6 cursor-pointer select-none group"
          id="header-center-logo"
        >
          <span className="hidden md:inline font-mono text-[10px] text-neutral-500 hover:text-white transition-colors duration-300 animate-spin-slow">+</span >
          <div className="border border-white/15 rounded-full w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center text-center bg-[#0b0b0b] group-hover:border-white/40 transition-colors duration-500">
            <span className="font-display font-black text-[9px] md:text-[10px] uppercase tracking-widest leading-none text-white">CHAN</span>
          </div>
          <span className="hidden md:inline font-mono text-[10px] text-neutral-500 hover:text-white transition-colors duration-300 animate-spin-slow delay-75">+</span >
        </div>

        {/* Right Side: GitHub Quick Link + Let's Talk Button */}
        <div className="flex items-center gap-3 sm:gap-4" id="header-right">
          <div className="hidden sm:flex flex-col items-end text-right font-mono" id="header-location">
            <a 
              href="https://github.com/chandru07072007" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-neutral-300 transition-colors text-[11px] tracking-wide flex items-center gap-1 font-bold uppercase"
            >
              <Github size={12} />
              <span>@chandru0707</span>
            </a>
            <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-0.5">[ DEVELOPER ]</span>
          </div>

          <button
            onClick={onOpenContact}
            className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 transition-all font-display text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-lg active:scale-95"
            id="lets-talk-btn"
          >
            Let's Talk
          </button>
        </div>
      </header>

      {/* Navigation Overlay Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0b0b0b]/95 z-30 backdrop-blur-md flex flex-col lg:flex-row p-6 md:p-12 pt-28 md:pt-32"
            id="nav-menu-overlay"
          >
            {/* Left side column: giant links */}
            <div className="flex-grow flex flex-col justify-center" id="nav-overlay-left">
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase mb-4">[ Navigation Menu ]</span>
              <nav className="flex flex-col gap-2 md:gap-4" id="overlay-nav-items">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.target}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="group flex items-center justify-between border-b border-white/5 py-2 md:py-3 cursor-pointer"
                    onClick={() => handleLinkClick(link.target)}
                    id={`nav-link-item-${idx}`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-neutral-600 group-hover:text-white transition-colors duration-300">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tighter text-neutral-300 group-hover:text-white group-hover:pl-4 transition-all duration-300">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right side column: Contact details & developer manifesto */}
            <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-between mt-8 lg:mt-0" id="nav-overlay-right">
              <div>
                <h4 className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase mb-6">[ About Chandru ]</h4>
                <p className="font-display text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide mb-8">
                  I am a high-end Full Stack Developer and Software Engineer. I combine rock-solid backend microservices, resilient relational database layouts, and modern responsive frontends into high-performance digital systems that scale.
                </p>

                <div className="space-y-4" id="overlay-contact-info">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <Github size={14} className="text-neutral-600" />
                    <a href="https://github.com/chandru07072007" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      github.com/chandru07072007
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <Mail size={14} className="text-neutral-600" />
                    <a href="mailto:chandrupalanisamyaids@gmail.com" className="hover:text-white transition-colors">
                      chandrupalanisamyaids@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <MapPin size={14} className="text-neutral-600" />
                    <span>Remote / Global Engineering</span>
                  </div>
                </div>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5" id="overlay-socials">
                <a 
                  href="https://github.com/chandru07072007" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 border border-white/10 hover:border-white/40 flex items-center gap-2 transition-colors text-neutral-400 hover:text-white font-mono text-[10px] uppercase"
                >
                  <Github size={12} />
                  <span>GitHub Profile</span>
                </a>


              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
