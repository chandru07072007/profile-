/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Certifications from "./components/Certifications";
import CertificationShowcasePage from "./components/CertificationShowcasePage";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import SubmissionsModal from "./components/SubmissionsModal";
import ProjectShowcaseStairs from "./components/ProjectShowcaseStairs";
import HackfestSection from "./components/HackfestSection";
import HackfestGallerySection from "./components/HackfestGallerySection";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [showProjectStairs, setShowProjectStairs] = useState(false);
  const [showCertShowcase, setShowCertShowcase] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Offset for the fixed header
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Track mouse position for custom brutalist star pointer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") !== null || 
        target.closest("a") !== null ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") !== null;
      
      setIsHoveringClickable(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="relative text-white selection:bg-white selection:text-black font-sans bg-[#0b0b0b] min-h-screen">
      {/* Subtle Noise Texture Overlay across the entire site */}
      <div className="noise-overlay" id="app-noise-bg" />

      {/* Dynamic Brutalist Pointer (custom star) */}
      <div className="hidden lg:block pointer-events-none fixed z-50 mix-blend-difference" id="custom-pointer">
        <motion.div
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: isHoveringClickable ? 1.5 : 1,
            rotate: isHoveringClickable ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
          className="text-white opacity-85"
        >
          {isHoveringClickable ? (
            // A brutalist crosshair on hover
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0V24M0 12H24" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            // Rotating star cursor normally
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
              <path d="M12 0L13.25 8.75L22 10L13.25 11.25L12 20L10.75 11.25L2 10L10.75 8.75L12 0Z" />
            </svg>
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <div key="loader-panel">
            <Loader onComplete={() => setIsLoaded(true)} />
          </div>
        ) : (
          <motion.div
            key="main-portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen justify-between relative"
            id="portfolio-main-wrapper"
          >
            {/* Nav Header */}
            <Header 
              onScrollToSection={scrollToSection} 
              onOpenContact={() => setIsContactOpen(true)}
              onOpenSubmissions={() => setIsSubmissionsOpen(true)}
            />

            {/* Layout content blocks */}
            <main className="flex-grow flex flex-col" id="portfolio-main-sections">
              <Hero onScrollToSection={scrollToSection} />
              <About onOpenContact={() => setIsContactOpen(true)} onScrollToSection={scrollToSection} />
              <Services onOpenContact={() => setIsContactOpen(true)} />
              <Work onOpenContact={() => setIsContactOpen(true)} onOpenProjects={() => setShowProjectStairs(true)} />
              <Certifications onOpenShowcase={() => setShowCertShowcase(true)} />
              <HackfestSection onOpenContact={() => setIsContactOpen(true)} />
              <HackfestGallerySection />
            </main>

            {/* Footer */}
            <Footer 
              onScrollToSection={scrollToSection} 
              onOpenContact={() => setIsContactOpen(true)}
              onOpenSubmissions={() => setIsSubmissionsOpen(true)}
            />

            {/* Let's Talk Strategic Contact brief planner */}
            <ContactModal 
              isOpen={isContactOpen} 
              onClose={() => setIsContactOpen(false)} 
            />

            {/* Submissions & Google Sheets Vault Modal */}
            <SubmissionsModal
              isOpen={isSubmissionsOpen}
              onClose={() => setIsSubmissionsOpen(false)}
            />

            {/* Interactive horizontal stairs portfolio showcase overlay */}
            <AnimatePresence>
              {showProjectStairs && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 z-50"
                  id="stairs-overlay-root"
                >
                  <ProjectShowcaseStairs onClose={() => setShowProjectStairs(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive high-contrast editorial certification showcase overlay */}
            <AnimatePresence>
              {showCertShowcase && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 z-50"
                  id="cert-showcase-overlay-root"
                >
                  <CertificationShowcasePage onClose={() => setShowCertShowcase(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
