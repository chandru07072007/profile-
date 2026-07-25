import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Disc, Loader, Sparkles, TrendingUp, Megaphone, Smartphone, Compass } from "lucide-react";
import { ServiceCard } from "../types";

interface ServicesProps {
  onOpenContact: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

  const servicesList: ServiceCard[] = [
    {
      id: "frontend-arch",
      title: "Frontend Architecture & Motion",
      description: "I sculpt high-impact, enduring user interfaces. From custom reactive systems and state managers to comprehensive motion layouts, responsive designs, and adaptive single-page architectures that establish absolute UI precision.",
      tags: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript"],
      icon: "compass"
    },
    {
      id: "backend-eng",
      title: "Backend Engineering & APIs",
      description: "I design robust, high-throughput server systems and scalable API structures. Blending clean, secure controller layers with resilient route compression, JSON payload validators, and optimized routing.",
      tags: ["Node.js", "FastAPI", "Python Flask", "Express", "Fastify", "REST APIs", "GraphQL"],
      icon: "sparkles"
    },
    {
      id: "db-systems",
      title: "Database Design & Caching",
      description: "I engineer reliable relational models and secure data schemas. Designing high-integrity database indexes, structured search queries, ACID-compliant transactions, and high-performance Redis cache strategies.",
      tags: ["PostgreSQL", "Cloud SQL", "Firestore", "Drizzle ORM", "ACID", "Redis Caching"],
      icon: "trending"
    },
    {
      id: "cloud-infra",
      title: "Cloud Infrastructure & DevOps",
      description: "I orchestrate secure, containerized deployment pipelines and auto-scaling cloud ingress networks. Constructing Dockerized delivery schemes on Google Cloud Run with unified security credentials.",
      tags: ["Docker", "AWS", "Cloud Run", "CI/CD Pipelines", "Container Routing", "VPC", "Server Scaling"],
      icon: "smartphone"
    },
    {
      id: "ai-workflows",
      title: "Generative AI & Agent Workflows",
      description: "I build modern AI integrations powered by Google Gemini. Developing semantic search engines, contextual intelligence pipelines, and automated agent workflows to handle complex backend automation.",
      tags: ["n8n", "Gemini API", "LLM Pipelines", "Semantic Search", "Prompt Engineering", "Agents"],
      icon: "megaphone"
    }
  ];

  // Map icon strings to Lucide icon components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "compass":
        return <Compass className="text-white/80 group-hover:text-white transition-colors duration-500 animate-spin-slow" size={32} />;
      case "sparkles":
        return <Sparkles className="text-white/80 group-hover:text-white transition-colors duration-500 animate-pulse" size={32} />;
      case "trending":
        return <TrendingUp className="text-white/80 group-hover:text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" size={32} />;
      case "smartphone":
        return <Smartphone className="text-white/80 group-hover:text-white transition-colors duration-500" size={32} />;
      case "megaphone":
        return <Megaphone className="text-white/80 group-hover:text-white transition-colors duration-500 animate-bounce" style={{ animationDuration: '3s' }} size={32} />;
      default:
        return <Disc className="text-white/80 group-hover:text-white transition-colors duration-500" size={32} />;
    }
  };

  return (
    <section 
      id="services-section"
      className="bg-[#0b0b0b] border-t border-white/5 py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Editorial Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-16 gap-4" id="services-section-header">
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-3">
          <span className="text-white font-bold" id="services-number">[ 02 ]</span>
          <span>Our Capability</span>
        </div>
        <div className="font-display text-sm text-neutral-400 font-semibold uppercase tracking-widest" id="services-title-tag">
          Services
        </div>
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest" id="services-angle-tag">
          The Skills that Ensure Success
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="services-content-grid">
        
        {/* Left column: Short prompt & CTA */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-between lg:h-[500px]" id="services-left-cta">
          <div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase leading-none tracking-tighter mb-6">
              THE SKILLS THAT ENSURE YOUR SUCCESS
            </h2>
            <p className="font-display text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide mb-8">
              Explore my operational skillsets. Click any card to examine the roadmap for each full-stack development stack.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-3.5 border border-white/10 hover:border-white/40 text-white font-mono text-xs uppercase tracking-widest bg-black/40 hover:bg-neutral-900 transition-colors rounded-none w-full max-w-[220px] cursor-pointer shadow-md"
            id="services-get-in-touch"
          >
            Get In Touch
          </button>
        </div>

        {/* Right column: Bento Grid (col-span-8) */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4" id="services-bento-grid">
          
          {/* Card 1: Identity Design (Vertical layout, spans 2 rows) */}
          {servicesList.slice(0, 1).map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
              onClick={() => setSelectedService(service)}
              className="md:row-span-2 border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/70 p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 group min-h-[420px]"
              id={`bento-card-${service.id}`}
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-black/40 border border-white/5 rounded-none" id={`bento-icon-box-${service.id}`}>
                  {renderIcon(service.icon)}
                </div>
                <div className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Plus size={16} className="transform group-hover:rotate-90 transition-transform" />
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="font-display text-neutral-400 text-xs md:text-sm leading-relaxed line-clamp-4">
                  {service.description}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5 pt-4" id={`bento-tags-${service.id}`}>
                  {service.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-[9px] text-neutral-500 bg-black/50 border border-white/5 px-2 py-0.5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Cards 2 to 5 (Grid items) */}
          <div className="grid grid-cols-1 gap-4" id="services-right-subgrid">
            {servicesList.slice(1, 3).map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                onClick={() => setSelectedService(service)}
                className="border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/70 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group min-h-[200px]"
                id={`bento-card-${service.id}`}
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-black/40 border border-white/5 rounded-none" id={`bento-icon-box-${service.id}`}>
                    {renderIcon(service.icon)}
                  </div>
                  <div className="w-8 h-8 border border-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Plus size={14} className="transform group-hover:rotate-90 transition-transform" />
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap gap-1" id={`bento-tags-${service.id}`}>
                    {service.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-[8px] text-neutral-500 bg-black/50 border border-white/5 px-2 py-0.5 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cards 4 & 5 (Bottom Row) */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4" id="services-bottom-row">
            {servicesList.slice(3, 5).map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                onClick={() => setSelectedService(service)}
                className="border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/70 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group min-h-[200px]"
                id={`bento-card-${service.id}`}
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-black/40 border border-white/5 rounded-none" id={`bento-icon-box-${service.id}`}>
                    {renderIcon(service.icon)}
                  </div>
                  <div className="w-8 h-8 border border-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Plus size={14} className="transform group-hover:rotate-90 transition-transform" />
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap gap-1" id={`bento-tags-${service.id}`}>
                    {service.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-[8px] text-neutral-500 bg-black/50 border border-white/5 px-2 py-0.5 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Detail Overlay Modal when card is clicked */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            id="service-detail-modal"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 p-8 md:p-12 max-w-lg w-full relative clip-chamfer-tr"
              id="service-modal-box"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                id="service-modal-close"
              >
                <X size={16} />
              </button>

              <div className="space-y-6" id="service-modal-content">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">[ Strategic Detail ]</span>
                <h3 className="font-display font-black text-3xl text-white uppercase tracking-tight">
                  {selectedService.title}
                </h3>
                
                <p className="font-display text-neutral-300 text-sm md:text-base leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <h4 className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">[ Core Sub-Deliverables ]</h4>
                  <div className="flex flex-wrap gap-2" id="service-modal-tags">
                    {selectedService.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-xs text-white bg-black/60 border border-white/5 px-3 py-1 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6" id="service-modal-actions">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onOpenContact();
                    }}
                    className="flex-grow py-3 bg-white text-black font-display text-xs font-bold uppercase tracking-wider text-center cursor-pointer hover:bg-neutral-200 transition-colors"
                  >
                    Select service & Consult
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider text-center cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
