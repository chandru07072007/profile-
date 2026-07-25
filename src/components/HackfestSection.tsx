import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Play, 
  Volume2, 
  VolumeX, 
  Users, 
  Zap, 
  Code2, 
  Trophy, 
  ArrowUpRight, 
  Calendar, 
  Award, 
  ExternalLink,
  Flame
} from "lucide-react";

interface HackfestSectionProps {
  onOpenContact?: () => void;
}

export default function HackfestSection({ onOpenContact }: HackfestSectionProps) {
  const [activeTab, setActiveTab] = useState<"video1" | "video2">("video1");
  const [isMuted, setIsMuted] = useState(true);

  const videos = [
    {
      id: "video1",
      youtubeId: "HHUSqy5LJNQ",
      title: "Hackfest 2026 — Coordinator Team & Event Highlights",
      subtitle: "Official Organizing Committee & 42-Hour Hackathon Sprint",
      description: "Official video featuring Chandru and the Hackfest 2026 coordinator team orchestrating event logistics, technical tracks, participant mentorship, and live hacker arenas.",
      tags: ["COORDINATOR TEAM", "ORGANIZING COMMITTEE", "HACKFEST 2026"]
    },
    {
      id: "video2",
      youtubeId: "az5tBu8KkUE",
      title: "Hackfest 2026 — Coordinator Team & Grand Finale",
      subtitle: "Organizing Committee Keynote & Prize Distribution",
      description: "Live recording of the coordinator team directing the grand finale, keynote addresses, project evaluation panels, and prize distributions for Hackfest 2026.",
      tags: ["COORDINATOR TEAM", "FINALE & AWARDS", "ORGANIZING COMMITTEE"]
    }
  ];

  const stats = [
    { value: "500+", label: "Participant Hackers" },
    { value: "42 HRS", label: "Non-stop Innovation" },
    { value: "75+", label: "Projects Built" },
    { value: "₹1.5 LAKH", label: "Prize Pool & Grants" }
  ];

  return (
    <section 
      id="hackfest" 
      className="py-24 bg-black text-white relative overflow-hidden border-t border-neutral-900 font-sans selection:bg-white selection:text-black"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        
        {/* Header Section - Pure Black & White */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-800 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-block px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[11px] uppercase tracking-widest">
              [ EVENT COORDINATOR ]
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
              HACKFEST 2026
            </h2>

            <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Serving as <strong className="text-white">Event Coordinator</strong> for Hackfest 2026 — organizing developer tracks, technical mentorship, and live streaming for 500+ participants with ₹1.5 Lakh in prize pools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Calendar size={14} className="text-white" />
              <span>2026 EDITION</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
              <Award size={14} className="text-white" />
              <span>EVENT COORDINATOR</span>
            </div>
          </div>
        </div>



        {/* Stats Grid - Black & White */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="bg-[#080808] border border-neutral-800 p-5 space-y-1 hover:border-neutral-600 transition-colors"
            >
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Autoplay Video Section - Pure Black & White */}
        <div className="bg-[#050505] border border-neutral-800 p-4 sm:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-white" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                COORDINATOR TEAM VIDEO STREAM
              </span>
            </div>

            {/* Video Selector Tabs */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => setActiveTab(vid.id as any)}
                  className={`px-4 py-2 font-bold uppercase transition-all cursor-pointer border ${
                    activeTab === vid.id
                      ? "bg-white text-black border-white"
                      : "bg-black text-neutral-400 border-neutral-800 hover:text-white"
                  }`}
                  id={`btn-video-tab-${idx + 1}`}
                >
                  VIDEO 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
          {videos.map((vid) => {
            if (vid.id !== activeTab) return null;
            const embedUrl = `https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${vid.youtubeId}&controls=1&rel=0`;

            return (
              <div key={vid.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* 16:9 Player (8 cols) */}
                <div className="lg:col-span-8 relative aspect-video w-full bg-black border border-neutral-800 overflow-hidden shadow-2xl group">
                  <iframe
                    src={embedUrl}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 block"
                  />

                  {/* Audio Mute/Unmute Overlay Toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 z-20 px-3.5 py-2 bg-black/90 hover:bg-black text-white border border-neutral-700 font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    title={isMuted ? "Click to Unmute Audio" : "Mute Audio"}
                    id="btn-video-audio-toggle"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX size={14} className="text-neutral-400" />
                        <span>MUTED (CLICK TO UNMUTE)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} className="text-white" />
                        <span>AUDIO ACTIVE</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Video Info Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-4 font-mono">
                  <div className="space-y-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                      {vid.subtitle}
                    </span>
                    <h4 className="font-display font-bold text-xl text-white uppercase leading-snug">
                      {vid.title}
                    </h4>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {vid.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <a
                      href={`https://youtu.be/${vid.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white uppercase transition-colors"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
