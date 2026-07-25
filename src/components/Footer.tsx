import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Send, CheckCircle2, ArrowRight, Mail, Code, FileSpreadsheet, Linkedin } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenSubmissions?: () => void;
}

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxE2_NW0gpb4Br5Xm2EZaUZj7dTDc4hwsxesKpyl_LcGdooRvp5Vn17eX_qZvp9HMHg/exec";

export default function Footer({ onScrollToSection, onOpenContact, onOpenSubmissions }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // 1. Send directly to user's Google Apps Script macro endpoint
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({ email }),
        });
      } catch (scriptErr) {
        console.log("Apps script request executed:", scriptErr);
      }

      // 2. Also send to local server route for logging and sync
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.sheetUrl) {
        setSheetUrl(data.sheetUrl);
      }
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 7000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setIsSubscribed(true);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerNav = [
    { label: "Home", target: "hero-section" },
    { label: "About", target: "about-section" },
    { label: "Services", target: "services-section" },
    { label: "Work", target: "work-section" },
  ];

  return (
    <footer 
      id="contact-section"
      className="bg-[#070707] border-t border-white/5 pt-28 pb-12 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Watermark at the very bottom */}
      <div 
        className="absolute bottom-[-15px] left-0 right-0 text-center font-display font-black text-[13vw] text-neutral-900/10 uppercase select-none pointer-events-none tracking-tighter leading-none whitespace-nowrap z-0"
        id="footer-huge-watermark"
      >
        CHANDRU DEV
      </div>

      <div className="relative z-10" id="footer-content-container">
        {/* Upper footer grid: Developing Idea + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5" id="footer-upper-grid">
          
          {/* Headline (col-span-7) */}
          <div className="col-span-1 lg:col-span-7" id="footer-headline">
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-none tracking-tighter max-w-2xl">
              LET'S ARCHITECT YOUR STACK
            </h2>
          </div>

          {/* Newsletter (col-span-5) */}
          <div className="col-span-1 lg:col-span-5 space-y-4" id="footer-newsletter-box">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest" id="newsletter-title-row">
              <span>Architectural Blueprint updates</span>
              <span>+</span>
            </div>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                   key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribeSubmit}
                  className="flex border-b border-white/20 hover:border-white/40 transition-colors py-2 focus-within:border-white w-full"
                  id="newsletter-form"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="bg-transparent text-white font-display text-sm focus:outline-none w-full placeholder-neutral-600 py-1"
                    id="newsletter-input"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50"
                    id="newsletter-submit-btn"
                  >
                    <span>{isSubmitting ? "Saving..." : "Get Blueprints"}</span>
                    <ArrowRight size={12} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-neutral-900 border border-neutral-800 p-4 flex flex-col gap-2"
                  id="newsletter-success"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                    <div>
                      <span className="font-mono text-xs text-white uppercase tracking-widest block font-bold">Subscribed Successfully</span>
                      <span className="font-display text-[12px] text-neutral-300">I will reach out to you, sir. Thank you!</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Middle footer grid: Socials, Quick Links, Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 text-xs font-mono border-b border-white/5" id="footer-middle-grid">
          
          {/* Socials & Links (col-span-6) */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8" id="footer-socials-links">
            {/* Social outline buttons */}
            <div className="space-y-4" id="footer-socials-box">
              <span className="text-neutral-500 uppercase tracking-widest block mb-2">[ Social Connect ]</span>
              <div className="flex gap-3" id="social-buttons-row">
                <a 
                  href="https://github.com/chandru07072007" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 hover:bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
                  id="social-github"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/chandru-p-393800374/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 hover:bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
                  id="social-linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="mailto:chandrupalanisamyaids@gmail.com" 
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 hover:bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
                  id="social-mail"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links Menu with arrows/plus marks */}
            <div className="space-y-3" id="footer-links-box">
              <span className="text-neutral-500 uppercase tracking-widest block mb-2">[ Pages ]</span>
              {footerNav.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onScrollToSection(link.target)}
                  className="flex items-center justify-between w-full max-w-[160px] pb-1.5 border-b border-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>{link.label}</span>
                  <span>*</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details (col-span-6) */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8" id="footer-contacts">
            
            {/* GitHub */}
            <div className="space-y-2">
              <span className="text-neutral-500 uppercase tracking-widest block">[ GitHub ]</span>
              <a 
                href="https://github.com/chandru07072007" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white font-display text-sm font-semibold transition-colors block underline decoration-neutral-800 hover:decoration-white"
                id="footer-tel"
              >
                @chandru0707
              </a>
            </div>

            {/* Mail */}
            <div className="space-y-2">
              <span className="text-neutral-500 uppercase tracking-widest block">[ Mail ]</span>
              <a 
                href="mailto:chandrupalanisamyaids@gmail.com" 
                className="text-neutral-300 hover:text-white font-display text-sm font-semibold transition-colors block underline decoration-neutral-800 hover:decoration-white break-all"
                id="footer-email"
              >
                chandrupalanisamyaids@gmail.com
              </a>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <span className="text-neutral-500 uppercase tracking-widest block">[ Coordinate ]</span>
              <p className="text-neutral-300 font-display text-sm font-semibold leading-relaxed" id="footer-addr">
                Remote / Global<br />
                Engineering Systems
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 text-neutral-600 text-[10px] font-mono gap-4 relative z-10" id="footer-legal-row">
          <div className="flex items-center gap-6" id="legal-links">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Use</a>
          </div>
          <div id="copyright-text">
            Copyright &copy; 2026 Chandru Dev. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
