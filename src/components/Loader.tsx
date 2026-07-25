import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(10);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // High-contrast brutalist images to flash in the center collage
  const flashImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600",
    "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=600",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600"
  ];

  useEffect(() => {
    // Progress counter animation
    const duration = 2400; // 2.4 seconds total loader
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentRatio = stepCount / steps;
      
      // Easing curve for a dynamic loading feel
      let nextProgress = Math.floor(10 + currentRatio * 90);
      
      if (nextProgress >= 100) {
        nextProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500); // Hold at 100% briefly
      }
      setProgress(nextProgress);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Image flash interval
  useEffect(() => {
    if (progress >= 100) return;
    
    // Speed up image flashing as progress goes up
    const intervalTime = Math.max(100, 400 - (progress * 3.5));
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % flashImages.length);
    }, intervalTime);

    return () => clearInterval(imageTimer);
  }, [progress, flashImages.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 bg-[#0b0b0b] z-50 flex flex-col justify-between p-6 md:p-12"
      id="preloader-container"
    >
      {/* Top Header Row of Loader */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" id="loader-status-dot"></span>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">System Booting</span>
        </div>
        
        {/* Animated logo badge */}
        <div className="flex items-center gap-8" id="loader-logo-badge">
          <span className="font-mono text-xs text-neutral-500 animate-spin-slow">+</span>
          <div className="border border-neutral-800 rounded-full w-20 h-20 flex flex-col items-center justify-center p-2 text-center">
            <span className="font-display font-bold text-[10px] uppercase tracking-widest leading-none text-white">Media</span>
            <span className="font-display font-medium text-[9px] uppercase tracking-widest leading-none text-neutral-400 mt-1">Diame</span>
          </div>
          <span className="font-mono text-xs text-neutral-500 animate-spin-slow delay-150">+</span>
        </div>

        <div className="font-mono text-xs text-neutral-500" id="loader-year">[ 2026 ]</div>
      </div>

      {/* Center Stack Image collage */}
      <div className="relative flex-grow flex items-center justify-center overflow-hidden h-[45vh]" id="loader-image-collage">
        <AnimatePresence mode="popLayout">
          {flashImages.map((src, idx) => {
            // Only show image up to current progress ratio or current index
            const isVisible = idx === currentImageIndex && progress < 100;
            if (!isVisible) return null;

            // Generate some pseudo-random rotation and translation for creative organic feel
            const rotation = (idx % 2 === 0 ? 1 : -1) * (idx * 3 + 2);
            const scale = 1 + (idx * 0.02);

            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.85, rotate: rotation - 5 }}
                animate={{ 
                  opacity: 0.95, 
                  scale: scale, 
                  rotate: rotation,
                  transition: { duration: 0.15 } 
                }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.15 } }}
                className="absolute w-72 h-72 md:w-96 md:h-96 border-4 border-[#0b0b0b] shadow-2xl bg-neutral-900 overflow-hidden clip-chamfer-tr"
                id={`loader-flash-img-${idx}`}
              >
                <img
                  src={src}
                  alt="Creative Collage"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Floating text behind */}
        <div 
          className="absolute font-display font-bold text-[8vw] md:text-[6vw] text-neutral-900/30 uppercase select-none tracking-tighter whitespace-nowrap -z-10 pointer-events-none"
          id="loader-bg-text"
        >
          Media Creative Digital Partner
        </div>
      </div>

      {/* Progress display in Bottom Left */}
      <div className="flex justify-between items-end w-full pt-4 border-t border-neutral-900" id="loader-footer">
        <div>
          <div className="font-mono text-neutral-500 text-xs mb-1 uppercase tracking-widest">Engine Load</div>
          <div 
            className="font-display font-bold text-[12vw] leading-none text-white select-none tracking-tighter tabular-nums"
            id="loader-percentage-text"
          >
            {progress}%
          </div>
        </div>
        
        {/* Progress bar stretching across the bottom */}
        <div className="w-1/3 md:w-1/2 h-[2px] bg-neutral-900 overflow-hidden relative mb-4">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-white"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
