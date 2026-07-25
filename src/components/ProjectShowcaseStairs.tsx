import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, RefreshCw, Layers, Cpu, Database, Eye, Play, Film, ExternalLink } from "lucide-react";

interface ProjectShowcaseStairsProps {
  onClose: () => void;
}

interface StairsPanel {
  id: number;
  number: string;
  topic: string;
  title: string;
  bgColor: string; // Background color of the panel
  textColor: string; // Primary text color
  subTextColor: string; // Dimmed text color
  borderColor: string; // Border color between columns
  accentColor: string; // Vibrant accent color (often red/orange or deep black)
  image1: string; // Primary hero image
  image2?: string; // Secondary smaller image
  youtubeId?: string; // Embedded YouTube video ID
  liveUrl?: string; // Embedded or external live deployment URL
  leftCaption: string; // Brutalist sidebar caption
  rightDescription1: string; // High-level description block
  rightDescription2: string; // Technical details block
  metadata: string[]; // Key-value or list details
}

export default function ProjectShowcaseStairs({ onClose }: ProjectShowcaseStairsProps) {
  const [activeId, setActiveId] = useState<number>(2); // Default to panel 2 or 1
  const [showVideoMap, setShowVideoMap] = useState<Record<number, boolean>>({ 2: true });

  const panels: StairsPanel[] = [
    {
      id: 1,
      number: "1",
      topic: "ECOSPHERE / ESG COMPLIANCE",
      title: "ECOSPHERE ESG REGISTRY & COMPLIANCE",
      bgColor: "bg-[#d9dbd4]", // Sage green-tinted off-white
      textColor: "text-[#1c1d1a]",
      subTextColor: "text-[#5c5d5a]",
      borderColor: "border-[#1c1d1a]/10",
      accentColor: "bg-[#e54b4b]",
      image1: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
      image2: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600",
      liveUrl: "https://unique-empanada-472b52.netlify.app/login",
      leftCaption: "ECOSPHERE IS A PUBLIC-PRIVATE ENTERPRISE COMPLIANCE AND SUSTAINABILITY MANAGEMENT REGISTRY DESIGNED TO TRANSITION COMPLICATED CARBON ACCOUNTING SPREADSHEETS INTO LIVE SYSTEM INSIGHTS.",
      rightDescription1: "TRANSITIONING ORGANIZATIONS FROM ERROR-PRONE MANUAL REPORTING to automated, real-time sustainability metrics is our focus. EcoSphere monitors compliance variables, maps carbon quotas, and maintains immutable MongoDB audit cores.",
      rightDescription2: "THE REPOSITORY TRANSFORMS METRIC AUDITS BY PARSING GREENHOUSE DISCLOSURES DIRECTLY. IT INTRODUCES STREAMLINED CERTIFICATION WORKFLOWS AND REMOVES REPETITIVE REPORTING OVERHEAD COMPLETELY.",
      metadata: ["REGISTRY: ECOSPHERE-ESG", "DATABASE: MONGODB CORE", "LIVE APP: NETLIFY PORTAL"]
    },
    {
      id: 2,
      number: "2",
      topic: "MEDIVAULT / INTELLIGENT AGENTS",
      title: "MEDIVAULT MULTI-AGENT PACKAGE SYSTEM",
      bgColor: "bg-[#c5cbd3]", // Misty blue-grey
      textColor: "text-[#12151a]",
      subTextColor: "text-[#4d525a]",
      borderColor: "border-[#12151a]/10",
      accentColor: "bg-[#1c1d1a]",
      image1: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800",
      image2: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600",
      youtubeId: "ja58_QiGTkE",
      liveUrl: "https://medipack-frontend.onrender.com/",
      leftCaption: "MEDIVAULT INTRODUCES AUTOMATED MICRO-AGENT ROUTING SCHEMES FOR HIGHLY REGULATED MEDICINE PACKAGING LOGS AND REAL-TIME HEALTH DISPENSING METRICS.",
      rightDescription1: "WE BUILT MEDIPACK AI TO COORDINATE DISCRETE HEALTHCARE LOGS SECURELY. The multi-agent coordinator monitors container limits, triggers instant warning flags, and maintains transactional stability under load.",
      rightDescription2: "BY EMBEDDING INTUITIVE DIAGNOSTIC CHECKS, MEDIVAULT REDUCES COMPONENT COLD-STARTS AND PREVENTS DISPENSING DRIFTS WITH SECURE PACKAGING INTELLIGENT DEPLOYMENTS.",
      metadata: ["AGENT: MEDIPACK-AI-AGENTS", "TECH: JAVASCRIPT / NODE", "LIVE APP: RENDER DEPLOYMENT"]
    },
    {
      id: 3,
      number: "3",
      topic: "RESEARCH / GEOAI DIGITAL TWIN",
      title: "AN INTELLIGENT DIGITAL TWIN FOR HYDROGEOLOGICAL ASSESSMENT AND GEOTECHNICAL RISK ANALYSIS USING GEOAI",
      bgColor: "bg-[#ebdcd0]", // Warm off-white sand
      textColor: "text-[#241e1a]",
      subTextColor: "text-[#615a54]",
      borderColor: "border-[#241e1a]/10",
      accentColor: "bg-[#e54b4b]",
      image1: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
      image2: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600",
      leftCaption: "AN INTELLIGENT DIGITAL TWIN SIMULATION FRAMEWORK COMBINING GEOSPATIAL TELEMETRY, GEOAI PREDICTIVE RISK MODELS, AND REAL-TIME HYDROGEOLOGICAL MONITORING.",
      rightDescription1: "DEVELOPED AN ADVANCED GEOAI DIGITAL TWIN FOR HYDROGEOLOGICAL ASSESSMENT AND GEOTECHNICAL RISK ANALYSIS. Integrates subsurface hydro-data, soil moisture telemetry, slope stability predictive modeling, and spatial AI risk maps.",
      rightDescription2: "PROVIDES REAL-TIME RISK ASSESSMENTS FOR SUBSURFACE WATER FLOW, SLOPE FAILURE PREDICTION, AND ENVIRONMENTAL GEOTECHNICAL SAFEGUARDS USING GEOSPATIAL INTELLIGENCE ALGORITHMS.",
      metadata: ["RESEARCH: GEOAI DIGITAL TWIN", "DOMAIN: HYDROGEOLOGY & GEOTECH", "CORE: RISK ANALYSIS ENGINE"]
    },
    {
      id: 4,
      number: "4",
      topic: "ACCESSIBILITY / SECURE VOICE PAY",
      title: "BLIND-PAY VOICE PAYMENT ENGINE",
      bgColor: "bg-[#dc3545]", // Bold coral red
      textColor: "text-white",
      subTextColor: "text-white/70",
      borderColor: "border-white/10",
      accentColor: "bg-black",
      image1: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800",
      image2: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1200",
      leftCaption: "VISUAL INCLUSION DRIVES PAYMENT INTEGRITY. WE CHOSE REAL-TIME SPEECH FILTERS, SPOKEN RESPONSES, AND SECURE DIGITAL AUTHENTICATION TO REMOVE BARRIERS TO INDEPENDENT BILLING.",
      rightDescription1: "BLIND-PAY ESTABLISHES A VOICE-BASED SECURE TRANSACTION ECOSYSTEM FOR THE VISUALLY IMPAIRED. Utilizing highly stable browser speech synthesize elements, users control payment schedules hands-free.",
      rightDescription2: "OUR AUDIO PROTOCOLS REDUCE THE COGNITIVE STRUGGLE FOR VISUALLY IMPAIRED AND ELDERLY USERS, REPLACING CONFUSING TEXT FIELDS WITH EXTREMELY SAFE AUDITORY CONFIRMATIONS.",
      metadata: ["API: WEB SPEECH SYNTH", "STACK: JAVASCRIPT / NODE", "ACCESSIBILITY: WCAG AA+"]
    }
  ];

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-50 bg-[#0b0b0b] flex flex-col md:flex-row overflow-hidden select-none"
      id="stairs-main-container"
    >
      {/* Absolute top-right close trigger */}
      <div className="absolute top-6 right-6 z-[60]" id="stairs-close-box">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 border border-white/15 bg-black/80 text-white font-mono text-[11px] uppercase tracking-widest hover:border-white/40 hover:bg-neutral-900 transition-all cursor-pointer rounded-none"
          id="stairs-close-btn"
        >
          <span>Close Portfolio</span>
          <X size={14} />
        </button>
      </div>

      {/* Grid of panels */}
      <div className="flex-grow w-full h-full flex flex-col md:flex-row overflow-hidden" id="stairs-panels-grid">
        {panels.map((panel) => {
          const isActive = panel.id === activeId;
          return (
            <div
              key={panel.id}
              onClick={() => {
                if (!isActive) setActiveId(panel.id);
              }}
              className={`
                relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden border-b md:border-b-0 md:border-r ${panel.borderColor} ${panel.bgColor} ${panel.textColor}
                ${isActive ? "flex-[10] cursor-default" : "flex-[1] md:flex-[0.7] cursor-pointer hover:bg-opacity-95"}
              `}
              id={`stairs-panel-item-${panel.id}`}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  // Expanded Panel View (High Fidelity Editorial Layout as shown in the video)
                  <motion.div
                    key={`stairs-active-content-${panel.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between overflow-y-auto overflow-x-hidden relative"
                    id={`stairs-content-wrapper-${panel.id}`}
                  >
                    {/* Header Row of Expanded Panel */}
                    <div className="flex justify-between items-start border-b border-black/10 pb-6 mb-8 md:mb-12" id={`stairs-header-row-${panel.id}`}>
                      {/* Vildmark-style Left Logo branding */}
                      <div className="flex flex-col" id={`stairs-brand-${panel.id}`}>
                        <span className="font-display font-black text-lg md:text-2xl tracking-tighter uppercase leading-none">
                          CHANDRU DEV*
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 mt-1">
                          ARCHITECTURAL STUDIO © 2026
                        </span>
                      </div>

                      {/* Right Section Header indicator */}
                      <div className="hidden lg:flex flex-col text-right" id={`stairs-topic-indicator-${panel.id}`}>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold">
                          [ {panel.topic} ]
                        </span>
                      </div>
                    </div>

                    {/* Main editorial grid structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto" id={`stairs-editorial-grid-${panel.id}`}>
                      
                      {/* Column A: Left side caption & small image (col-span-3) */}
                      <div className="col-span-1 lg:col-span-3 space-y-6 hidden md:block" id={`stairs-col-a-${panel.id}`}>
                        {panel.image2 && (
                          <div className="aspect-[4/5] w-full overflow-hidden border border-black/10 relative bg-neutral-900" id={`stairs-col-a-img-${panel.id}`}>
                            <img 
                              src={panel.image2} 
                              alt="Blueprint backup viewport" 
                              className="w-full h-full object-cover grayscale contrast-110"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <p className={`font-display text-[10px] leading-relaxed uppercase tracking-wider text-left ${panel.subTextColor}`} id={`stairs-col-a-text-${panel.id}`}>
                          {panel.leftCaption}
                        </p>
                      </div>

                      {/* Column B: Hero visual & Title & numbers (col-span-6) */}
                      <div className="col-span-1 lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start" id={`stairs-col-b-${panel.id}`}>
                        
                        {/* Interactive Steps indicators matching "1 2 3 4" from video */}
                        <div className="flex items-baseline justify-center lg:justify-start gap-8" id={`stairs-steps-indicator-${panel.id}`}>
                          <span className="font-display font-black text-[12vw] lg:text-[10vw] leading-none tracking-tighter" id={`stairs-active-num-${panel.id}`}>
                            {panel.number}
                          </span>
                          <div className="flex flex-col text-left" id={`stairs-topic-box-${panel.id}`}>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold md:hidden">
                              [ {panel.topic} ]
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold">
                              SYSTEM REVISION STAGES
                            </span>
                            <div className="flex gap-2 mt-1" id={`stairs-indicator-dots-${panel.id}`}>
                              {panels.map((p) => (
                                <span 
                                  key={p.id} 
                                  className={`w-1.5 h-1.5 ${p.id === panel.id ? panel.accentColor : "bg-neutral-300"} rounded-full`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Demonstration Video Control Bar */}
                        {panel.youtubeId && (
                          <div className="w-full flex justify-between items-center bg-black/10 p-1.5 px-3 border border-black/10 text-xs font-mono rounded-xs" id={`stairs-video-bar-${panel.id}`}>
                            <span className="flex items-center gap-1.5 text-black font-bold uppercase tracking-wider text-[10px]">
                              <Film size={12} className="text-red-600" />
                              <span>Demonstration Video Demo</span>
                            </span>
                            <button
                              onClick={() => setShowVideoMap(prev => ({ ...prev, [panel.id]: !prev[panel.id] }))}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-[9px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
                              id={`stairs-toggle-video-btn-${panel.id}`}
                            >
                              <Play size={10} className="text-red-500 fill-red-500" />
                              <span>{showVideoMap[panel.id] !== false ? "View Poster Image" : "Play YouTube Video"}</span>
                            </button>
                          </div>
                        )}

                        {/* Large, beautiful hero image or YouTube video embed */}
                        <div className="aspect-[16/9] w-full overflow-hidden border border-black/10 relative shadow-md bg-neutral-900" id={`stairs-col-b-hero-frame-${panel.id}`}>
                          {panel.youtubeId && showVideoMap[panel.id] !== false ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${panel.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                              title={panel.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <img 
                              src={panel.image1} 
                              alt={panel.title} 
                              className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-102 transition-all duration-700"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>

                        {/* Big bold uppercase title */}
                        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase leading-none tracking-tighter text-left" id={`stairs-active-title-${panel.id}`}>
                          {panel.title}
                        </h2>
                      </div>

                      {/* Column C: Narrative text and Meta specs (col-span-3) */}
                      <div className="col-span-1 lg:col-span-3 space-y-6" id={`stairs-col-c-${panel.id}`}>
                        <div className="space-y-4" id={`stairs-col-c-descs-${panel.id}`}>
                          <p className="font-display text-xs md:text-sm font-semibold uppercase leading-normal text-left" id={`stairs-desc-1-${panel.id}`}>
                            {panel.rightDescription1}
                          </p>
                          <p className={`font-display text-[11px] leading-relaxed text-left ${panel.subTextColor}`} id={`stairs-desc-2-${panel.id}`}>
                            {panel.rightDescription2}
                          </p>
                        </div>

                        {/* Tech details panel specs */}
                        <div className="border-t border-black/10 pt-4 space-y-1" id={`stairs-col-c-meta-${panel.id}`}>
                          {panel.metadata.map((item, idx) => (
                            <div key={idx} className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-neutral-500" id={`stairs-meta-item-${panel.id}-${idx}`}>
                              <span>{item.split(":")[0]}</span>
                              <span className="font-bold text-black">{item.split(":")[1] || ""}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action link */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center" id={`stairs-action-row-${panel.id}`}>
                          {panel.liveUrl ? (
                            <a
                              href={panel.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2.5 px-4 py-2.5 bg-black text-white hover:bg-neutral-800 border border-black/20 font-mono text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer text-left shadow-md group"
                              id={`stairs-action-btn-${panel.id}`}
                            >
                              <span>Launch Live Web Portal</span>
                              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
                            </a>
                          ) : (
                            <button
                              onClick={onClose}
                              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold hover:opacity-75 transition-opacity cursor-pointer text-left"
                              id={`stairs-action-btn-${panel.id}`}
                            >
                              <span>Proceed to Deployment</span>
                              <ArrowRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Footer bar showing page coordinate specs */}
                    <div className="flex justify-between items-end border-t border-black/10 pt-6 mt-8" id={`stairs-footer-${panel.id}`}>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                        STAGE SPECIFICATION [ 0{panel.id} / 04 ]
                      </span>
                      <div className="flex items-center gap-6" id={`stairs-footer-nav-${panel.id}`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const prevId = panel.id === 1 ? 4 : panel.id - 1;
                            setActiveId(prevId);
                          }}
                          className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer"
                          id={`stairs-footer-prev-${panel.id}`}
                        >
                          <ArrowLeft size={10} />
                          <span>Prev</span>
                        </button>
                        <span className="text-neutral-300">|</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextId = panel.id === 4 ? 1 : panel.id + 1;
                            setActiveId(nextId);
                          }}
                          className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer"
                          id={`stairs-footer-next-${panel.id}`}
                        >
                          <span>Next</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Collapsed Thin Vertical Panel View (Acts as stairs handles)
                  <motion.div
                    key={`stairs-inactive-content-${panel.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex md:flex-col justify-between items-center py-4 md:py-12 px-6 md:px-0 relative"
                    id={`stairs-collapsed-panel-${panel.id}`}
                  >
                    {/* Big bold number at top */}
                    <span className="font-display font-black text-3xl md:text-5xl tracking-tighter" id={`stairs-collapsed-num-${panel.id}`}>
                      {panel.number}
                    </span>

                    {/* Side rotated vertical text on desktop / normal horizontal on mobile */}
                    <div className="md:rotate-90 md:origin-center md:whitespace-nowrap flex items-center" id={`stairs-collapsed-tag-${panel.id}`}>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold">
                        {panel.topic.split(" / ")[0]}
                      </span>
                    </div>

                    {/* Empty placeholder or small branding block on bottom */}
                    <div className="hidden md:block w-2 h-2 rounded-full bg-black/20" id={`stairs-collapsed-dot-${panel.id}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
