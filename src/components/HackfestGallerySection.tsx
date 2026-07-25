import React from "react";
import InfiniteGallery from "./ui/3d-gallery-photography";
import { Camera, Sparkles, Move3D } from "lucide-react";

export default function HackfestGallerySection() {
  const hackfestImages = [
    { src: "/gallery_1.jpeg", alt: "1st Prize Trophy & Merit Award Ceremony" },
    { src: "/gallery_2.jpeg", alt: "Hackathon 1st Place Certificate & Sponsorship" },
    { src: "/gallery_3.jpeg", alt: "Team Felicitation with HOD & Principal" },
    { src: "/gallery_4.jpeg", alt: "Stage Presentation & Cultural Fest Felicitation" },
    { src: "/gallery_5.jpeg", alt: "Hackfest Stage Award Distribution" },
    { src: "/gallery_6.jpeg", alt: "Hackathon Lab Coding Session & Audience" },
    { src: "/gallery_7.jpeg", alt: "Hackfest Organizing Committee & Mentors Group Photo" },
    { src: "/gallery_8.jpeg", alt: "1st Place Trophy Celebration with Team Members" },
  ];

  return (
    <section 
      id="hackfest-gallery" 
      className="relative w-full h-screen min-h-[600px] bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* 3D Canvas Stream (Takes full screen background) */}
      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        <InfiniteGallery
          images={hackfestImages}
          speed={1.2}
          visibleCount={12}
          className="h-full w-full"
        />
      </div>

      {/* Floating Header Overlay */}
      <div className="relative z-10 p-6 md:p-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/60 backdrop-blur-md p-4 sm:p-6 border border-white/10 pointer-events-auto">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase tracking-widest">
              <Camera size={12} className="text-white" />
              <span>3D IMMERSIVE EXHIBIT</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-none">
              HACKATHON GALLERY
            </h3>
          </div>

          <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
            <Move3D size={16} className="text-white animate-pulse" />
            <span>FULL SCREEN 3D DEPTH STREAM</span>
          </div>
        </div>
      </div>

      {/* Floating Instructions Overlay HUD */}
      <div className="relative z-10 p-6 md:p-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-neutral-300 bg-black/80 backdrop-blur-md px-6 py-4 border border-white/10 pointer-events-auto">
          <div className="flex items-center gap-2 text-white">
            <Sparkles size={14} className="text-neutral-300" />
            <span>Use mouse wheel, drag, or arrow keys to navigate the 3D gallery</span>
          </div>
          <div className="text-neutral-500 text-[10px] tracking-widest">
            AUTOPLAY ACTIVE • 360° DEPTH ENGINE
          </div>
        </div>
      </div>
    </section>
  );
}
