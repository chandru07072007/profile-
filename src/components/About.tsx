import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface AboutProps {
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function About({ onOpenContact, onScrollToSection }: AboutProps) {
  return (
    <section 
      id="about-section"
      className="bg-[#0b0b0b] border-t border-white/5 py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Editorial Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-16 gap-4" id="about-section-header">
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-3">
          <span className="text-white font-bold" id="about-number">[ 01 ]</span>
          <span>About Chandru</span>
        </div>
        <div className="font-display text-sm text-neutral-400 font-semibold uppercase tracking-widest" id="about-title-tag">
          Developer Philosophy
        </div>
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest" id="about-angle-tag">
          Engineering Mindset
        </div>
      </div>

      {/* Main Copy Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start" id="about-content-grid">
        
        {/* Left Columns (col-span-8) - Core Manifesto */}
        <div className="col-span-1 lg:col-span-8 space-y-10" id="about-manifesto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-display font-medium text-xl md:text-3xl leading-snug tracking-tight text-white"
            id="about-manifesto-para-1"
          >
            I Specialize In Engineering Digital Systems That Command Attention, Scale Gracefully under Heavy Traffic, And Function Flawlessly. Partnering With Product Teams, Agencies, And Startups globally, I Write High-Performance Backend Architectures And Intuitive Interfaces.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide"
            id="about-manifesto-para-2"
          >
            Following my technical architecture for the MediVault Enterprise System: We engineered a production-grade, HIPAA-compliant medical file transfer engine capable of handling 1GB to 3GB DICOM and healthcare imaging payloads. By breaking files into parallel 5MB chunks transmitted over secure S3-compatible datalakes, the platform mitigates browser memory constraints and network timeouts. Powered by a FastAPI backend, MongoDB states, and session-scoped JWT credential isolation, MediVault introduces automated multi-part recovery schemas that completely eliminate upload drops.
          </motion.p>
        </div>

        {/* Right Column (col-span-4) - Practical Strategy Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 lg:col-span-4 border-l border-white/5 pl-6 lg:pl-10 space-y-6"
          id="about-strategy-column"
        >
          <div className="flex items-center gap-2 text-neutral-400">
            <Sparkles size={16} />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">The Core Stack</span>
          </div>
          <p className="font-display text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide">
            My engineering strategy seamlessly binds TypeScript/React with rock-solid server architectures. Combining Docker, Node, Cloud Ingress, and ACID databases, I engineer modern workflows that scale smoothly from prototype to production.
          </p>

          <div className="pt-4" id="about-mini-collage">
            {/* Minimalist Grid and stamp layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-neutral-900 border border-white/5 flex items-center justify-center p-4">
                <div className="w-full h-full border border-dashed border-white/10 flex items-center justify-center font-mono text-[9px] text-neutral-600 text-center">
                  TS_REACT_DOCKER<br />POSTGRES_NODE
                </div>
              </div>
              <div className="aspect-square bg-neutral-900 border border-white/5 overflow-hidden">
                <img 
                  src="/assets/images/regenerated_image_1784455952461.jpg" 
                  alt="Abstract Brutalist Graphic" 
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Middle Row: Photo studio layout block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-24 items-center" id="about-studio-row">
        {/* Studio Image Column */}
        <div className="col-span-1 lg:col-span-8" id="about-studio-img-box">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-white/10"
            id="about-studio-img"
          >
            <img 
              src="/assets/images/regenerated_image_1784455949487.jpg" 
              alt="Photo Studio Setup" 
              className="w-full h-full object-cover grayscale contrast-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Text next to studio image */}
        <div className="col-span-1 lg:col-span-4 space-y-6" id="about-studio-text">
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">[ Vision Statement ]</span>
          <h3 className="font-display font-black text-3xl md:text-4xl text-white uppercase leading-none tracking-tighter">
            EVERY LINE SHAPES SYSTEM SPEED,
          </h3>
          <p className="font-display text-neutral-400 text-sm leading-relaxed max-w-sm">
            Whether structured through database indexing, API compression, layout state caches, or clean server processes, we design every component with high-fidelity performance.
          </p>

          <button 
            onClick={() => onScrollToSection("work-section")}
            className="flex items-center gap-4 text-white hover:text-neutral-400 transition-colors uppercase font-mono text-xs tracking-widest group cursor-pointer"
            id="about-view-work-btn"
          >
            <span>Get Started</span>
            <span className="w-10 h-10 border border-white/10 group-hover:border-white/30 rounded-full flex items-center justify-center transition-colors">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Large Banner: SEAMLESS DIGITAL EXPERIENCES */}
      <div className="mt-28 relative" id="about-banner-container">
        <div className="aspect-[21/9] w-full overflow-hidden bg-neutral-900 border border-white/10 relative" id="about-banner-image">
          <img 
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1200" 
            alt="Seamless Digital Experiences" 
            className="w-full h-full object-cover grayscale brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Central Overlay Text Content */}
          <div className="absolute inset-x-6 bottom-6 md:inset-x-12 md:bottom-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10" id="about-banner-overlay-content">
            <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-none tracking-tighter max-w-2xl">
              HIGH CONTRAST SOFTWARE SYSTEMS
            </h2>

            <button
              onClick={onOpenContact}
              className="px-6 py-3 border border-white/20 hover:border-white/50 text-white font-mono text-xs uppercase tracking-widest bg-black/60 backdrop-blur-md rounded-none group flex items-center gap-3 cursor-pointer"
              id="about-banner-btn"
            >
              <span>Get Started</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
