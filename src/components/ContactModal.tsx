import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Send, Loader2, Compass, CheckCircle, ArrowRight, Download, RefreshCw } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BriefResult {
  theme: string;
  tagline: string;
  analysis: string;
  actionPlan: string[];
  artisticQuote: string;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(1); // 1: Form, 2: Loading, 3: Result
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [idea, setIdea] = useState("");
  const [loadingText, setLoadingText] = useState("Deconstructing concept...");
  const [briefResult, setBriefResult] = useState<BriefResult | null>(null);
  const [error, setError] = useState("");

  const servicesOptions = [
    { id: "identity-design", label: "Identity Design" },
    { id: "rebranding", label: "Rebranding" },
    { id: "marketing-analytics", label: "Marketing & Analytics" },
    { id: "social-media", label: "Social Media Management" },
    { id: "creative-campaigns", label: "Creative Campaigns" }
  ];

  const budgetOptions = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $35,000",
    "$35,000+"
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (!name || !email) {
      setError("Please fill in both name and email first.");
      return;
    }
    setError("");
    setStep(2);
    submitBrief();
  };

  const submitBrief = async () => {
    // Sequence of loader text transitions to simulate high-end analysis
    const texts = [
      "Deconstructing concept...",
      "Analyzing strategic market forces...",
      "Synthesizing visual aesthetics...",
      "Compiling brutalist blueprint..."
    ];
    
    let textIdx = 0;
    const interval = setInterval(() => {
      textIdx = (textIdx + 1) % texts.length;
      setLoadingText(texts[textIdx]);
    }, 1200);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          services: selectedServices,
          budget,
          idea
        })
      });

      const data = await response.json();
      clearInterval(interval);

      if (response.ok && data.result) {
        setBriefResult(data.result);
        setStep(3);
      } else {
        throw new Error(data.error || "Failed to process brief.");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setStep(1);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSelectedServices([]);
    setBudget("");
    setIdea("");
    setBriefResult(null);
    setStep(1);
    setError("");
  };

  const handleDownloadBrief = () => {
    if (!briefResult) return;
    const briefContent = `
========================================
MEDIA DIAME - CREATIVE STRATEGIC BRIEF
========================================
PREPARED FOR: ${name}
EMAIL: ${email}
BUDGET: ${budget || "Custom Project"}
SERVICES: ${selectedServices.join(", ")}
----------------------------------------
CONCEPT THEME: ${briefResult.theme}
TAGLINE: ${briefResult.tagline}

DESIGN ANALYSIS:
${briefResult.analysis}

TACTICAL ROADMAP:
${briefResult.actionPlan.join("\n")}

ARTISTIC INTENT QUOTE:
"${briefResult.artisticQuote}"

Generated & certified by Media Diame Creative Engine © 2026
========================================
    `;

    const element = document.createElement("a");
    const file = new Blob([briefContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Media_Diame_Brief_${name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        id="contact-modal-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0b0b0b] border border-white/10 w-full max-w-4xl relative clip-chamfer-tr overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px]"
          id="contact-modal-container"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-black/40"
            id="contact-modal-close"
          >
            <X size={16} />
          </button>

          {/* Left Panel: Branding & Concept (col-span-1) */}
          <div className="w-full md:w-[320px] bg-neutral-900/40 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between" id="contact-modal-sidebar">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Compass className="text-white animate-spin-slow" size={24} />
                <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase font-bold">Inquiry Pipeline</span>
              </div>

              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter leading-tight">
                LAUNCH YOUR DIGITAL FORCE
              </h3>
              
              <p className="font-display text-xs text-neutral-400 leading-relaxed">
                Provide us with the raw coordinates of your dream. Our algorithm and creative direction will forge an instant bespoke strategic blueprint.
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 font-mono text-[9px] text-neutral-500 space-y-2 uppercase" id="contact-modal-sidebar-meta">
              <div>[ PROCESSOR TIER ] v3.0</div>
              <div>[ SPEED ] 120 GFLOPS</div>
              <div>[ COPYRIGHT ] &copy; 2026 DIAME</div>
            </div>
          </div>

          {/* Right Panel: Content / Form Steps */}
          <div className="flex-grow p-8 md:p-12 overflow-y-auto h-full" id="contact-modal-content-area">
            
            {/* Step 1: Form Entry */}
            {step === 1 && (
              <div className="space-y-6 h-full flex flex-col justify-between" id="modal-step-form">
                <div>
                  <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">[ STEP 01 - COORDINATES ]</h4>
                  
                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs mb-4" id="modal-form-error">
                      {error}
                    </div>
                  )}

                  {/* Grid Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Your Name / Company</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-neutral-900 border border-white/5 focus:border-white/30 py-2.5 px-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Your Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@company.com"
                        className="w-full bg-neutral-900 border border-white/5 focus:border-white/30 py-2.5 px-3 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Services Selection */}
                  <div className="space-y-3 mb-6">
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Services Required</label>
                    <div className="flex flex-wrap gap-2" id="modal-services-toggles">
                      {servicesOptions.map((opt) => {
                        const isSelected = selectedServices.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleService(opt.id)}
                            className={`px-3 py-1.5 border font-mono text-[10px] uppercase transition-colors cursor-pointer ${
                              isSelected 
                                ? "bg-white text-black border-white" 
                                : "bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/20"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Options */}
                  <div className="space-y-3 mb-6">
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Project Budget tier</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="modal-budget-grid">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`py-2 text-center border font-mono text-[10px] uppercase transition-colors cursor-pointer ${
                            budget === opt 
                              ? "bg-white text-black border-white" 
                              : "bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Idea Details */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Describe your idea</label>
                    <textarea
                      required
                      rows={3}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Briefly describe what you'd like us to develop..."
                      className="w-full bg-neutral-900 border border-white/5 focus:border-white/30 py-2.5 px-3 text-sm focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end" id="modal-form-footer">
                  <button
                    onClick={handleNextStep}
                    disabled={!name || !email || !idea}
                    className="px-8 py-3 bg-white text-black font-display text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-3 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed shadow-md"
                    id="modal-generate-btn"
                  >
                    <span>Synthesize Brief</span>
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Loader animation */}
            {step === 2 && (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6" id="modal-step-loader">
                <Loader2 className="animate-spin text-white size-12" strokeWidth={1.5} />
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">[ Creative Core Computing ]</span>
                  <h4 className="font-display font-bold text-xl text-white tracking-wide uppercase transition-all duration-300">
                    {loadingText}
                  </h4>
                </div>
              </div>
            )}

            {/* Step 3: Result Analysis */}
            {step === 3 && briefResult && (
              <div className="space-y-6 h-full flex flex-col justify-between" id="modal-step-result">
                <div className="space-y-6">
                  {/* Result Header */}
                  <div className="flex items-start justify-between border-b border-white/5 pb-4">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">[ PROPOSAL CODE: MD-${Math.floor(1000 + Math.random() * 9000)} ]</span>
                      <h4 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                        {briefResult.theme}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 uppercase italic mt-1 font-bold">
                        "{briefResult.tagline}"
                      </p>
                    </div>
                    <span className="p-1.5 bg-neutral-900 border border-white/5 text-green-500 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <CheckCircle size={10} />
                      <span>Certified</span>
                    </span>
                  </div>

                  {/* Core Analysis */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">[ Strategic Direction ]</span>
                    <p className="font-display text-neutral-300 text-xs md:text-sm leading-relaxed tracking-wide bg-neutral-900/40 p-4 border border-white/5">
                      {briefResult.analysis}
                    </p>
                  </div>

                  {/* Action Plan Rows */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">[ Proposed Tactical Roadmap ]</span>
                    <div className="grid grid-cols-1 gap-2" id="modal-roadmap-list">
                      {briefResult.actionPlan.map((action, i) => (
                        <div 
                          key={i}
                          className="bg-neutral-900/20 border border-white/5 p-3 font-display text-xs text-neutral-300 flex items-baseline gap-3"
                        >
                          <span className="font-mono text-[9px] text-white bg-black border border-white/5 px-1.5 py-0.5 uppercase shrink-0">Phase 0{i + 1}</span>
                          <span className="leading-relaxed">{action.replace(/^Phase\s\d+:\s*/i, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Artistic Intent */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">[ Intentional Manifesto ]</span>
                    <p className="font-mono text-neutral-400 italic text-[11px]">
                      "{briefResult.artisticQuote}"
                    </p>
                  </div>
                </div>

                {/* Modal Result Action buttons */}
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center" id="modal-result-actions">
                  <div className="font-mono text-[9px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle size={10} />
                    <span>Recorded in Google Sheets</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
                      id="reset-brief-btn"
                    >
                      <RefreshCw size={12} />
                      <span>Configure New</span>
                    </button>
                    <button
                      onClick={handleDownloadBrief}
                      className="px-6 py-2.5 bg-white text-black font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
                      id="download-brief-btn"
                    >
                      <Download size={12} />
                      <span>Get Brief</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
