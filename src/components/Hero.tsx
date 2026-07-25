import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles, Star, Github } from "lucide-react";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const sidebarLinks = [
    { label: "Home", target: "hero-section" },
    { label: "About", target: "about-section" },
    { label: "Services", target: "services-section" },
    { label: "Work", target: "work-section" },
  ];

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen bg-[#0b0b0b] pt-28 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Watermark Symbol */}
      <div 
        className="absolute -top-[5%] -left-[5%] text-neutral-900/10 font-bold select-none pointer-events-none text-[35vw] font-display leading-none z-0"
        id="hero-c-watermark"
      >
        &lt;CH&gt;
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 flex-grow" id="hero-main-grid">
        
        {/* Left column: Quick Menu Links & Floating Star (col-span-2) */}
        <div className="hidden lg:flex flex-col justify-between h-[450px] col-span-2" id="hero-quick-menu">
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase block mb-4">[ Index Menu ]</span>
            {sidebarLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => onScrollToSection(link.target)}
                className="flex items-center justify-between w-48 text-left border-b border-white/5 pb-2 text-neutral-400 hover:text-white transition-all group font-mono text-xs cursor-pointer"
                id={`hero-menu-item-${idx}`}
              >
                <span>{link.label}</span>
                <span className="transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Rotating brutalist star */}
          <div className="pl-2" id="hero-star-container">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="text-neutral-500 hover:text-white transition-colors cursor-help inline-block"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0L26.5 17.5L44 20L26.5 22.5L24 40L21.5 22.5L4 20L21.5 17.5L24 0Z" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Middle column: Massive Typography & Interactive Inline Blocks (col-span-5) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center text-left" id="hero-middle-heading">
          <div className="space-y-2 md:space-y-4">
            {/* Row 1 */}
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-black text-4xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-white uppercase flex items-center flex-wrap gap-x-4"
              id="hero-title-line-1"
            >
              <motion.span 
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="inline-block text-neutral-600"
              >
                +
              </motion.span>
            </motion.h1>

            {/* Row 2: contains embedded image card */}
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-display font-black text-4xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-white uppercase flex items-center flex-wrap gap-3"
              id="hero-title-line-2"
            >
              <span>Full Stack</span>
              
              {/* Inline Glowing Code Visual Image Frame */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="inline-block h-10 w-20 md:h-12 md:w-28 rounded-none overflow-hidden bg-neutral-800 border border-white/20 align-middle shadow-md"
                id="hero-inline-card"
              >
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400" 
                  alt="Future Code IDE Interface"
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <span>Engineer</span>
            </motion.h1>

            {/* Row 3 */}
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display font-black text-4xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-white uppercase"
              id="hero-title-line-3"
            >
              Digital
            </motion.h1>

            {/* Row 4 */}
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-display font-black text-4xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-white uppercase break-all"
              id="hero-title-line-4"
            >
              Force.
            </motion.h1>
          </div>

          <p className="mt-8 font-display text-neutral-400 text-sm md:text-base max-w-md leading-relaxed tracking-wide" id="hero-desc-para">
            I design and architect highly performant web systems, scalable database clusters, and interactive reactive interfaces. Blending elegant engineering with brutalist precision to turn ideas into absolute digital force.
          </p>

          {/* Call to action buttons */}
          <div className="mt-8 flex flex-wrap gap-4 items-center" id="hero-ctas">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onScrollToSection("about-section")} id="hero-arrow-cta">
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
                <ArrowDown size={16} className="text-neutral-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </div>
              <span className="font-mono text-xs text-neutral-500 group-hover:text-white uppercase tracking-widest transition-colors">Engineering Manifesto</span>
            </div>

            <a 
              href="https://github.com/chandru07072007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/10 hover:border-white/30 px-4 py-2 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors"
              id="hero-github-cta"
            >
              <Github size={14} />
              <span>Explore GitHub</span>
            </a>
          </div>
        </div>

        {/* Right column: Circular profile image (col-span-5) */}
        <div className="col-span-1 lg:col-span-5 h-full flex justify-center lg:justify-end items-center lg:-translate-y-16" id="hero-right-image">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[360px] aspect-square overflow-hidden rounded-full bg-white border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            id="hero-stairs-card"
          >
            <img 
              src="/assets/images/ch1.jpg" 
              alt="Chandru Portrait" 
              className="w-full h-full object-cover grayscale contrast-115 hover:scale-105 transition-transform duration-700 hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>

      {/* Hero bottom status footer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/5 z-10 gap-4 mt-8" id="hero-footer-status">
        <div className="flex items-center gap-8 font-mono text-[10px] text-neutral-500" id="hero-status-list">
          <div>
            <span className="text-white block">[ ENGINE ]</span>
            <span className="uppercase text-green-500 tracking-wider">● RUNNING STACK</span>
          </div>
          <div>
            <span className="text-white block">[ NODE COORDINATE ]</span>
            <span className="uppercase">GLOBAL REMOTE</span>
          </div>
          <div>
            <span className="text-white block">[ WORKSPACE ]</span>
            <span className="uppercase">GITHUB REPOS</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-neutral-500" id="hero-watermark-bottom">
          CHANDRU ENGINEERING PORTFOLIO v3.0
        </div>
      </div>
    </section>
  );
}
