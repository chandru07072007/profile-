import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, Eye, ExternalLink } from "lucide-react";
import { ProjectItem, ShowcaseProject } from "../types";

interface WorkProps {
  onOpenContact: () => void;
  onOpenProjects?: () => void;
}

export default function Work({ onOpenContact, onOpenProjects }: WorkProps) {
  // Horizontal list items matching [01] to [04] in video
  const horizontalProjects: ProjectItem[] = [
    {
      id: "ecosphere-esg",
      title: "ECOSPHERE ESG PLATFORM",
      category: "Sustainability System",
      tags: ["MongoDB", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600",
      number: "01",
      liveUrl: "https://unique-empanada-472b52.netlify.app/login"
    },
    {
      id: "medivault-agent",
      title: "MEDIVAULT AI AGENT",
      category: "Multi-Agent System",
      tags: ["Gemini AI", "React", "Node.js"],
      image: "/assets/images/regenerated_image_1784454044724.png",
      number: "02",
      liveUrl: "https://medipack-frontend.onrender.com/"
    },
    {
      id: "geoai-digital-twin",
      title: "DIGITAL TWIN FOR HYDROGEOLOGICAL ASSESSMENT & GEOTECHNICAL RISK",
      category: "GeoAI Research",
      tags: ["GeoAI", "Digital Twin", "Hydrogeology"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
      number: "03"
    },
    {
      id: "blind-pay",
      title: "BLIND-PAY VOICE SYSTEM",
      category: "Accessibility Engine",
      tags: ["Web Speech", "Secure Pay", "Node.js"],
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600",
      number: "04"
    }
  ];

  // Large showcase projects from 00:20-00:22 in the video
  const showcases: ShowcaseProject[] = [
    {
      id: "smart-irrigation",
      title: "HYDROSENSE - SMART IRRIGATION",
      subtitle: "IOT WATER CONSERVATION BLUEPRINT",
      description: "Designed and engineered an automated smart irrigation telemetry dashboard utilizing custom soil sensors, dynamic flow triggers, and scheduling rules to optimize agricultural resource efficiency by up to 40%.",
      image: "/assets/images/regenerated_image_1784454042892.jpg",
      isCutCorner: true
    },
    {
      id: "package-system",
      title: "MEDIVAULT RESUMABLE FILE UPLOAD",
      subtitle: "RECOVERABLE MULTIPART S3 DATALAKE",
      description: "A highly resilient, resumable medical asset upload platform with encrypted user credential vaults, parallel multi-part chunk recovery, bucket-session matching, and background lifecycle cleanup tools built using FastAPI, MongoDB, React, and S3-compatible cloud storage.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800",
      isCutCorner: true
    },
    {
      id: "accessible-news",
      title: "ACCESSIBLE NEWS READER",
      subtitle: "INCLUSIVE VOICE & DYNAMIC ECOSYSTEM",
      description: "Developed a modern high-contrast digital news reader tailored specifically for visually impaired and elderly users. Features customized speech synthesis engines, adaptive font layouts, and AI-summarized note cards.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
      isCutCorner: true
    }
  ];

  return (
    <section 
      id="work-section"
      className="bg-[#0b0b0b] border-t border-white/5 py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Editorial Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-16 gap-4" id="work-section-header">
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-3">
          <span className="text-white font-bold" id="work-number">[ 03 ]</span>
          <span>Featured Systems</span>
        </div>
        <div className="font-display text-sm text-neutral-400 font-semibold uppercase tracking-widest" id="work-title-tag">
          Portfolio
        </div>
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest" id="work-angle-tag">
          The Repositories
        </div>
      </div>

      {/* Giant "MASTERPIECE" Headline */}
      <div className="mb-16 select-none" id="work-giant-headline">
        <h2 className="font-display font-black text-6xl md:text-8xl xl:text-9xl text-white uppercase leading-none tracking-tighter">
          MASTERPIECE
        </h2>
      </div>

      {/* Horizontal grid of projects [01] to [04] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28" id="work-horizontal-grid">
        {horizontalProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group flex flex-col justify-between border border-white/5 bg-neutral-900/20 hover:bg-neutral-900/60 p-4 relative min-h-[360px]"
            id={`project-card-${project.id}`}
          >
            {/* Top row: [01] number and category */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-xs text-neutral-500" id={`project-num-${project.id}`}>
                [{project.number}]
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-black/40 border border-white/5 px-2 py-0.5" id={`project-cat-${project.id}`}>
                {project.category}
              </span>
            </div>

            {/* Middle: Beautiful image with zoom hover */}
            <div className="aspect-square w-full overflow-hidden bg-neutral-950 border border-white/5 relative mb-6" id={`project-img-container-${project.id}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye size={16} />
                </div>
              </div>
            </div>

            {/* Bottom: Title & arrow action */}
            <div className="space-y-2 mt-auto">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-tight group-hover:text-neutral-300 transition-colors">
                  {project.title}
                </h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 hover:bg-emerald-900 transition-colors shrink-0"
                    id={`project-live-btn-${project.id}`}
                  >
                    <span>Live</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap" id={`project-tags-${project.id}`}>
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] text-neutral-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Large Featured Showcase Block Grid */}
      <div className="space-y-28 mb-16" id="work-showcase-grid">
        {showcases.map((showcase, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={showcase.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
              id={`showcase-${showcase.id}`}
            >
              {/* Image Frame Column (col-span-7) */}
              <div className={`col-span-1 lg:col-span-7 ${isEven ? "" : "lg:order-2"}`} id={`showcase-img-col-${showcase.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl ${showcase.isCutCorner ? "clip-chamfer-tr" : ""}`}
                  id={`showcase-card-${showcase.id}`}
                >
                  <img 
                    src={showcase.image} 
                    alt={showcase.title}
                    className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Small absolute plus icons on visual frame margins */}
                  <div className="absolute top-4 right-4 text-white font-mono text-xs animate-pulse">+</div>
                  <div className="absolute bottom-4 left-4 text-white font-mono text-xs animate-pulse">+</div>
                </motion.div>
              </div>

              {/* Text Description Column (col-span-5) */}
              <div className={`col-span-1 lg:col-span-5 space-y-6 ${isEven ? "" : "lg:order-1"}`} id={`showcase-text-col-${showcase.id}`}>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">[ Featured Showcase ]</span>
                <h3 className="font-display font-black text-2xl md:text-3.5xl text-white uppercase leading-none tracking-tighter">
                  {showcase.title}
                </h3>
                <p className="font-display text-neutral-400 text-sm md:text-base leading-relaxed">
                  {showcase.description}
                </p>

                {/* Micro branding indicators */}
                <div className="flex items-center gap-4 text-neutral-600 font-mono text-[9px] uppercase border-t border-b border-white/5 py-3" id={`showcase-meta-${showcase.id}`}>
                  <span>STYLING: MODERN BRUTALIST</span>
                  <span>|</span>
                  <span>CLIENT: GLOBAL VENTURES</span>
                </div>

                <button 
                  onClick={onOpenContact}
                  className="flex items-center gap-4 text-white hover:text-neutral-400 transition-colors uppercase font-mono text-xs tracking-widest group cursor-pointer"
                  id={`showcase-btn-${showcase.id}`}
                >
                  <span>Inquire About Collab</span>
                  <span className="w-10 h-10 border border-white/10 group-hover:border-white/30 rounded-full flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Link: See All Project */}
      <div className="flex justify-center mt-20 pt-12 border-t border-white/5" id="work-see-all-box">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onOpenProjects || onOpenContact}
          className="flex items-center gap-4 px-8 py-4 border border-white/15 hover:border-white/40 bg-black/40 text-white font-mono text-xs uppercase tracking-widest cursor-pointer group"
          id="see-all-projects-btn"
        >
          <span>See All Projects</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </motion.button>
      </div>

    </section>
  );
}
