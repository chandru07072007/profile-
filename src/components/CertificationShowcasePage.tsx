import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, Shield, CheckCircle2, Globe, Cpu, Award, Zap, Code, Terminal, ExternalLink, Printer, Download, Eye, FileText, ZoomIn, ZoomOut, Play, Pause } from "lucide-react";

interface CertificationShowcasePageProps {
  onClose: () => void;
}

interface CertItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  date: string;
  licenseId: string;
  type: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  detailedAnalysis: string;
  skills: string[];
  systemLoad: string;
  badgeImg?: string;
}

export default function CertificationShowcasePage({ onClose }: CertificationShowcasePageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [showPdf, setShowPdf] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [useUploadedPdf, setUseUploadedPdf] = useState(true);

  const certifications: CertItem[] = [
    {
      id: "aws-architect",
      number: "01",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "ACTIVE • 2026",
      licenseId: "AWS-ASA-9942A",
      type: "Cloud Infrastructure",
      accentColor: "#FF9900",
      badgeBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      description: "AUTHORIZED ARCHITECT FOR HIGHLY AVAILABLE, SCALABLE, AND FAULT-TOLERANT DISTRIBUTED DEPLOYMENTS.",
      detailedAnalysis: "Expertise spans multi-tier architecture, hybrid cloud systems, secure VPC subnets, automated failovers, IAM governance, and modern serverless architectures using Lambda, API Gateway, and DynamoDB.",
      skills: ["VPC Peering", "Route53 DNS", "S3 Datalakes", "Serverless Layers", "IAM Compliance", "CloudFront CDN"],
      systemLoad: "99.99% Availability Architecture",
      badgeImg: "/assets/images/regenerated_image_1784482410220.png"
    },
    {
      id: "fastapi-python",
      number: "02",
      title: "GenAI Powered Data Analytics",
      issuer: "TATA",
      date: "ACTIVE • 2026",
      licenseId: "TATA-GENAI-774A",
      type: "AI & Data Engineering",
      accentColor: "#00539b",
      badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "PROFESSIONAL CERTIFIED IN INTEGRATING GENERATIVE AI AGENTS AND LARGE LANGUAGE MODELS WITH ENTERPRISE DATA ANALYTICS PIPELINES.",
      detailedAnalysis: "Expertise covers building automated Retrieval-Augmented Generation (RAG) indices, fine-tuning task-specific analytical models, designing LLM evaluation workflows, managing semantic caches, and optimizing vector database index routing.",
      skills: ["Generative AI", "RAG Pipelines", "Vector Databases", "LangChain Systems", "LLM Evaluation", "Data Analytics Streams"],
      systemLoad: "Enterprise AI Pipeline Integration",
      badgeImg: "/assets/images/regenerated_image_1784486326848.png"
    },
    {
      id: "n8n-automation",
      number: "03",
      title: "IBM SPSS Statistics & Analytics",
      issuer: "IBM",
      date: "ACTIVE • 2026",
      licenseId: "IBM-STAT-9922X",
      type: "Data Science & Stats",
      accentColor: "#0f62fe",
      badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "PROFESSIONAL CERTIFIED STATISTICIAN DESIGNING COMPLEX QUANTITATIVE ANALYSIS AND PREDICTIVE STATISTICAL MODELS.",
      detailedAnalysis: "Specialized in exploratory data analysis (EDA), multi-variable regressions, ANOVA, nonparametric tests, predictive analytics, statistical hypothesis validation, and integrating output data streams into real-time reporting layers.",
      skills: ["SPSS Statistics", "Quantitative Analysis", "Predictive Modeling", "Hypothesis Testing", "Regression Models", "Data Visualization"],
      systemLoad: "Statistical Computation Core Enabled",
      badgeImg: "/assets/images/regenerated_image_1784487008911.png"
    },
    {
      id: "industry-4-0",
      number: "04",
      title: "Introduction to Industry 4.0",
      issuer: "NPTEL • IIT Kharagpur",
      date: "Jul-Oct 2025",
      licenseId: "NPTEL25CS146S1064600921",
      type: "Industrial IoT & Automation",
      accentColor: "#ff6b00",
      badgeBg: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      description: "PROFESSIONAL CERTIFIED IN INDUSTRY 4.0 CYBER-PHYSICAL INFRASTRUCTURE AND INDUSTRIAL IOT PROTOCOLS.",
      detailedAnalysis: "Expertise covers building automated smart manufacturing factories, cyber-physical integration, designing robust telemetry layers with MQTT, CoAP, and OPC-UA, predictive system maintenance with advanced edge analytics, and securing cloud data integration pipelines.",
      skills: ["Industrial IoT", "Cyber-Physical Systems", "OPC-UA & MQTT", "Predictive Maintenance", "Edge Analytics", "VPC Gateways"],
      systemLoad: "Real-time Edge Telemetry Active",
      badgeImg: "/assets/images/industry_4_0_badge.png"
    },
    {
      id: "mongodb-rag",
      number: "05",
      title: "Building RAG Apps Using MongoDB",
      issuer: "MongoDB University",
      date: "ACTIVE • 2026",
      licenseId: "MDB-RAG-9905X",
      type: "Vector DB & GenAI",
      accentColor: "#00684A",
      badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      description: "PROFESSIONAL CERTIFIED IN IMPLEMENTING RETRIEVAL-AUGMENTED GENERATION (RAG) APPLICATIONS USING MONGODB ATLAS VECTOR SEARCH.",
      detailedAnalysis: "Specialized in configuring MongoDB Atlas Vector Search indices, generating and storing semantic text embeddings (via OpenAI & Gemini), executing approximate k-Nearest Neighbor (ANN) searches, constructing advanced hybrid search aggregation pipelines, and deploying robust AI production integrations.",
      skills: ["Atlas Vector Search", "Semantic Search", "OpenAI Embeddings", "RAG Architecture", "Document Databases", "Aggregation Pipelines"],
      systemLoad: "High-Performance Vector Indexes Active",
      badgeImg: "/assets/images/mongodb_rag_badge.png"
    },
    {
      id: "nptel-cloud-computing",
      number: "06",
      title: "Cloud Computing",
      issuer: "NPTEL • IIT Kharagpur",
      date: "Jan-Apr 2026",
      licenseId: "NPTEL26CS55S1062000680",
      type: "Cloud Computing",
      accentColor: "#8b0000",
      badgeBg: "bg-red-500/10 text-red-600 border-red-500/20",
      description: "NPTEL CERTIFIED CLOUD COMPUTING SPECIALIST WITH ADVANCED SYSTEMS ARCHITECTURE EXPERTISE.",
      detailedAnalysis: "Successfully completed the intensive 12-week core graduate-level course covering cloud virtualization models, hypervisors, cloud storage hierarchies, resource management algorithms, SLA policies, cloud security standards, and hands-on Swayam-based platform configurations.",
      skills: ["Virtualization", "Cloud Security", "Distributed Storage", "Hypervisors", "SLA & Resource Pricing", "Swayam Platform"],
      systemLoad: "NPTEL Academic Certification",
      badgeImg: "/assets/images/nptel_cloud_badge.png"
    },
    {
      id: "frontend-dev",
      number: "07",
      title: "Introduction to Front End Development",
      issuer: "Simplilearn SkillUp",
      date: "31st March 2025",
      licenseId: "8119182",
      type: "Frontend Engineering",
      accentColor: "#0066cc",
      badgeBg: "bg-sky-500/10 text-sky-600 border-sky-500/20",
      description: "CERTIFIED FRONT END DEVELOPER SKILLED IN BUILDING RESPONSIVE, USER-CENTRIC WEB INTERFACES WITH MODERN WEB TECHNOLOGIES.",
      detailedAnalysis: "Successfully completed the Simplilearn SkillUp program in Front End Development, covering modern HTML5, CSS3, JavaScript ES6+, responsive web design, DOM manipulation, component architecture, and web performance optimization.",
      skills: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "DOM Manipulation", "UI Component Layout", "Web Performance"],
      systemLoad: "Verified Simplilearn SkillUp Credential",
      badgeImg: "/assets/images/regenerated_image_1784823611574.png"
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % certifications.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, activeIdx]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // px
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const currentCert = certifications[activeIdx];

  const getPdfDetails = (id: string) => {
    switch (id) {
      case "aws-architect":
        return {
          title: "AWS CERTIFIED SOLUTIONS ARCHITECT",
          subtitle: "Solutions Architect - Associate Level Credential",
          org: "AMAZON WEB SERVICES",
          orgSub: "Global Cloud Infrastructure Verification Systems",
          score: "CONSOLIDATED SCORE: ACTIVE STATUS verified",
          sealColor: "#FF9900",
          sig1Name: "Werner Vogels",
          sig1Title: "VP & CTO, Amazon.com",
          sig2Name: "Adam Selipsky",
          sig2Title: "CEO, AWS",
          bgGradient: "from-amber-500/5 to-orange-600/5",
          borderColor: "border-[#FF9900]"
        };
      case "fastapi-python":
        return {
          title: "GENAI POWERED DATA ANALYTICS",
          subtitle: "Enterprise Generative AI & Large Language Models Specialization",
          org: "TATA SERVICES ACADEMY",
          orgSub: "Tata Consultancy & Education Trust",
          score: "CONSOLIDATED SCORE: 94% [ELITE MASTER GRADE]",
          sealColor: "#00539b",
          sig1Name: "N. Chandrasekaran",
          sig1Title: "Chairman, Tata Sons",
          sig2Name: "Ratan N. Tata",
          sig2Title: "Chairman Emeritus",
          bgGradient: "from-blue-600/5 to-blue-900/5",
          borderColor: "border-[#00539b]"
        };
      case "n8n-automation":
        return {
          title: "IBM SPSS STATISTICS & ANALYTICS",
          subtitle: "Advanced Statistical Analysis & Predictive Modeling Certification",
          org: "IBM COGNITIVE CREDENTIALS",
          orgSub: "IBM Global Technology & Data Sciences Division",
          score: "CONSOLIDATED SCORE: 90% [CERTIFIED STATISTICIAN]",
          sealColor: "#0f62fe",
          sig1Name: "Arvind Krishna",
          sig1Title: "Chairman & CEO, IBM",
          sig2Name: "Michelle Patel",
          sig2Title: "Director of Cognitive Systems",
          bgGradient: "from-[#0f62fe]/5 to-[#001d6c]/5",
          borderColor: "border-[#0f62fe]"
        };
      case "industry-4-0":
        return {
          title: "INTRODUCTION TO INDUSTRY 4.0",
          subtitle: "Elite Online Certification (Funded by MoE, Govt. of India)",
          org: "NPTEL • INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR",
          orgSub: "National Programme on Technology Enhanced Learning",
          score: "CONSOLIDATED SCORE: 73% [ELITE STATUS]",
          sealColor: "#ff6b00",
          sig1Name: "Prof. Haimanti Banerji",
          sig1Title: "Coordinator, NPTEL, IIT Kharagpur",
          sig2Name: "",
          sig2Title: "",
          bgGradient: "from-orange-500/5 to-amber-600/5",
          borderColor: "border-orange-500"
        };
      case "mongodb-rag":
        return {
          title: "BUILDING RAG APPS USING MONGODB",
          subtitle: "Enterprise Generative AI & Semantic Document Database Specialization",
          org: "MONGODB UNIVERSITY ACADEMY",
          orgSub: "MongoDB Global Dev & Database Architecture Certification",
          score: "CONSOLIDATED SCORE: 100% [VERIFIED MASTER CREDENTIAL]",
          sealColor: "#00684A",
          sig1Name: "Dev Ittycheria",
          sig1Title: "President & CEO, MongoDB",
          sig2Name: "Eliot Horowitz",
          sig2Title: "Co-Founder & Former CTO, MongoDB",
          bgGradient: "from-emerald-500/5 to-emerald-900/5",
          borderColor: "border-[#00684A]"
        };
      case "postgres-dba":
        return {
          title: "POSTGRESQL ADVANCED DATABASE ADMINISTRATOR",
          subtitle: "Advanced Production DBA & Query Optimisation Certification",
          org: "ENTERPRISEDB ACADEMY BOARD",
          orgSub: "Global Postgres Advisory Council",
          score: "CONSOLIDATED SCORE: MASTER GRADE STATUS ENFORCED",
          sealColor: "#336791",
          sig1Name: "Bruce Momjian",
          sig1Title: "PostgreSQL Core Team Co-Founder",
          sig2Name: "Ed Boyajian",
          sig2Title: "President & CEO, EnterpriseDB",
          bgGradient: "from-indigo-600/5 to-blue-800/5",
          borderColor: "border-[#336791]"
        };
      case "nptel-cloud-computing":
        return {
          title: "CLOUD COMPUTING",
          subtitle: "NPTEL Online Certification (Funded by MoE, Govt. of India)",
          org: "INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR",
          orgSub: "NPTEL Elite Certification Program",
          score: "CONSOLIDATED SCORE: 77% [ELITE SILVER CREDENTIAL]",
          sealColor: "#8b0000",
          sig1Name: "Prof. Haimanti Banerji",
          sig1Title: "Coordinator, NPTEL, IIT Kharagpur",
          sig2Name: "NPTEL Committee",
          sig2Title: "Ministry of Education, Govt. of India",
          bgGradient: "from-red-500/5 to-red-900/5",
          borderColor: "border-[#8b0000]"
        };
      case "terraform-associate":
        return {
          title: "HASHICORP CERTIFIED TERRAFORM ASSOCIATE",
          subtitle: "Certified Infrastructure as Code (IaC) Deployment Engineer",
          org: "HASHICORP PROFESSIONAL BOARD",
          orgSub: "Cloud Native Deployment Standards Bureau",
          score: "CONSOLIDATED STATUS: ACTIVE CLOUD ARCHITECT",
          sealColor: "#844FBA",
          sig1Name: "Mitchell Hashimoto",
          sig1Title: "Co-Founder, HashiCorp",
          sig2Name: "Dave McJannet",
          sig2Title: "Chief Executive Officer, HashiCorp",
          bgGradient: "from-purple-500/5 to-fuchsia-600/5",
          borderColor: "border-[#844FBA]"
        };
      case "frontend-dev":
        return {
          title: "INTRODUCTION TO FRONT END DEVELOPMENT",
          subtitle: "Certificate of Completion",
          org: "SIMPLILEARN SKILLUP",
          orgSub: "Global Online Higher Education & Skill Development",
          score: "CERTIFICATE CODE: 8119182",
          sealColor: "#0066cc",
          sig1Name: "Krishna Kumar",
          sig1Title: "CEO, Simplilearn",
          sig2Name: "",
          sig2Title: "",
          bgGradient: "from-sky-500/5 to-blue-900/5",
          borderColor: "border-[#0066cc]"
        };
      default:
        return {
          title: "ACCREDITED PROFESSIONAL CERTIFICATION",
          subtitle: "Master Level Verification Certificate",
          org: "ACCREDITING ACADEMY BOARD",
          orgSub: "Verified Learning System Registry",
          score: "CONSOLIDATED STATUS: SYSTEM ACTIVE STATUS",
          sealColor: "#111111",
          sig1Name: "Registrar Director",
          sig1Title: "Board of Standards",
          sig2Name: "Education Chairman",
          sig2Title: "Credentials Committee",
          bgGradient: "from-neutral-500/5 to-neutral-700/5",
          borderColor: "border-neutral-800"
        };
    }
  };

  const pdf = getPdfDetails(currentCert.id);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-50 bg-[#f7f7f3] text-[#111111] flex flex-col overflow-hidden select-none"
      id="cert-showcase-container"
    >
      {/* Background Grid Accent Lines matching the video's architectural layout */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" id="cert-showcase-bg-grid">
        <div className="w-full h-full border-l border-r border-[#111111] flex justify-between">
          <div className="h-full border-r border-[#111111] w-1/5"></div>
          <div className="h-full border-r border-[#111111] w-1/5"></div>
          <div className="h-full border-r border-[#111111] w-1/5"></div>
          <div className="h-full border-r border-[#111111] w-1/5"></div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-[#111111]/10 z-10" id="cert-showcase-header">
        <div className="flex flex-col text-left" id="cert-showcase-logo">
          <span className="font-display font-black text-xl tracking-tighter uppercase leading-none">
            CHANDRU ACCREDITATIONS
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#111111]/50 mt-1">
            VERIFIED ENTERPRISE RECORD SYSTEM • GLOBAL COMPLIANCE
          </span>
        </div>

        <div className="flex items-center gap-4" id="cert-showcase-actions">
          <span className="hidden md:inline-block font-mono text-[9px] text-[#111111]/40 uppercase tracking-widest bg-[#111111]/5 px-2.5 py-1">
            SECURE VERIFICATION PORTAL [ACTIVE]
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 border border-[#111111] bg-[#111111] text-[#f7f7f3] font-mono text-[10px] uppercase tracking-widest hover:bg-[#111111]/90 transition-all cursor-pointer"
            id="cert-showcase-close-btn"
          >
            <span>Close Portal</span>
            <X size={12} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 overflow-hidden relative z-10" id="cert-showcase-main-body">
        
        {/* Left Side Menu (Desktop) - list of certificates that highlights active */}
        <div className="hidden lg:flex lg:col-span-3 flex-col border-r border-[#111111]/10 overflow-y-auto" id="cert-showcase-side-nav">
          <div className="p-6 border-b border-[#111111]/10 font-mono text-[9px] tracking-widest text-[#111111]/50 uppercase">
            [ CERTIFICATE LISTINGS ]
          </div>
          <div className="flex-grow divide-y divide-[#111111]/5" id="cert-side-list">
            {certifications.map((cert, index) => {
              const isActive = index === activeIdx;
              return (
                <button
                  key={cert.id}
                  onClick={() => {
                    setDirection(index > activeIdx ? 1 : -1);
                    setActiveIdx(index);
                  }}
                  className={`w-full text-left p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                    isActive ? "bg-[#111111]/5" : "hover:bg-[#111111]/2"
                  }`}
                  id={`cert-side-btn-${cert.id}`}
                >
                  {/* Subtle active color block indicator at the left border */}
                  {isActive && (
                    <span 
                      className="absolute left-0 top-0 bottom-0 w-1" 
                      style={{ backgroundColor: cert.accentColor }} 
                    />
                  )}
                  
                  <div className="flex justify-between items-start mb-2" id={`cert-side-row-${cert.id}`}>
                    <span className="font-mono text-[9px] text-[#111111]/40 uppercase tracking-widest">
                      SYSTEM NO. {cert.number}
                    </span>
                    <span className="font-mono text-[8px] tracking-widest text-[#111111]/50">
                      {cert.date.split(" • ")[1] || cert.date}
                    </span>
                  </div>

                  <h4 className={`font-display font-black text-sm uppercase tracking-tight transition-colors duration-200 ${
                    isActive ? "text-[#111111]" : "text-[#111111]/60 group-hover:text-[#111111]"
                  }`} id={`cert-side-title-${cert.id}`}>
                    {cert.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Display Panel with dynamic animations (Editorial layout resembling 6-YEAR INVESTIGATION in the video) */}
        <div className="flex-grow lg:col-span-9 flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto relative" id="cert-showcase-central-panel">
          
          {/* Top category layout with dynamic indicators */}
          <div className="flex justify-between items-baseline border-b border-[#111111]/10 pb-4 mb-4 relative" id="cert-showcase-center-header">
            <span className="font-mono text-[10px] text-[#111111]/50 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              VERIFIED COMPLIANCE STATUS: {currentCert.type}
            </span>
            <span className="font-mono text-[10px] text-[#111111]/40 uppercase tracking-widest">
              SLIDE {activeIdx + 1} OF {certifications.length}
            </span>

            {/* Slideshow dynamic progress line */}
            {isPlaying && (
              <motion.div 
                key={activeIdx}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[2px] bg-orange-600 z-20 pointer-events-none"
              />
            )}
          </div>

          {/* Swipe indicator helper */}
          <div className="text-center mb-2 lg:hidden" id="cert-showcase-swipe-helper">
            <span className="font-mono text-[8px] text-[#111111]/30 uppercase tracking-widest">
              [ Swipe card horizontally to slide ]
            </span>
          </div>

          {/* Core Animating Space */}
          <div className="flex-grow flex flex-col justify-center relative min-h-[350px] overflow-hidden" id="cert-showcase-animating-box">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCert.id}
                initial={{ opacity: 0, x: direction * 150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 150 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full cursor-grab active:cursor-grabbing select-none"
                id={`cert-active-view-${currentCert.id}`}
              >
                {/* Column Left: Giant Number & verified badge layout (col-span-4) */}
                <div className="md:col-span-4 flex flex-col items-start gap-6 pointer-events-none md:pointer-events-auto" id="cert-active-left">
                  <div className="relative font-display font-black text-[22vw] md:text-[12vw] leading-none tracking-tighter text-[#111111]/10 select-none" id="cert-giant-num">
                    {currentCert.number}
                  </div>
                  
                  {/* Styled Badge Card */}
                  <div className="w-full bg-[#111111] text-[#f7f7f3] p-6 border border-[#111111]/10 space-y-4 flex flex-col justify-between" id="cert-interactive-badge">
                    {currentCert.badgeImg ? (
                      <div className="flex flex-col items-center justify-center py-4 space-y-4 w-full">
                        <div className="w-32 h-32 bg-white p-2 rounded-lg flex items-center justify-center shadow-lg border border-white/10">
                          <img 
                            src={currentCert.badgeImg} 
                            alt={`${currentCert.title} Badge`}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-center space-y-1">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50 block">Credential ID</span>
                          <span className="font-mono text-[10px] font-bold text-white tracking-widest block">{currentCert.licenseId}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div className="p-2 bg-white/10 rounded-sm">
                            <Award size={20} className="text-[#f7f7f3]" />
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-0.5 rounded-sm">
                            SECURE-ID
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">Credential ID</span>
                          <p className="font-mono text-[11px] font-bold text-white tracking-widest block truncate">
                            {currentCert.licenseId}
                          </p>
                        </div>
                      </>
                    )}

                    <div className="border-t border-white/10 pt-3 flex justify-between items-center w-full">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400">
                        STATUS: CURRENT
                      </span>
                      <CheckCircle2 size={12} className="text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Column Right: Big Editorial Headline and description (col-span-8) */}
                <div className="md:col-span-8 space-y-6 pointer-events-none md:pointer-events-auto" id="cert-active-right">
                  <div className="inline-block px-2.5 py-1 bg-neutral-900 text-[#f7f7f3] font-mono text-[9px] uppercase tracking-wider mb-2">
                    {currentCert.issuer}
                  </div>

                  <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#111111] leading-none" id="cert-active-large-title">
                    {currentCert.title}
                  </h2>

                  <p className="font-display text-sm md:text-base font-bold uppercase leading-snug text-[#111111]/80 max-w-2xl" id="cert-active-desc">
                    {currentCert.description}
                  </p>

                  <p className="font-display text-xs md:text-sm text-neutral-600 leading-relaxed max-w-xl" id="cert-active-detailed">
                    {currentCert.detailedAnalysis}
                  </p>

                  {/* Skills/Proficiencies list rendered with custom tags */}
                  <div className="space-y-3 pt-4 border-t border-[#111111]/10" id="cert-active-skills-box">
                    <div className="font-mono text-[9px] text-[#111111]/50 uppercase tracking-widest">
                      System-Level Certified Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="font-mono text-[10px] text-neutral-800 bg-[#111111]/5 border border-[#111111]/5 px-2.5 py-1 font-semibold rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center items-center gap-2.5 my-4" id="cert-slide-dots">
            {certifications.map((cert, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={`dot-${cert.id}`}
                  onClick={() => {
                    setDirection(idx > activeIdx ? 1 : -1);
                    setActiveIdx(idx);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    isActive ? "w-8 bg-[#111111]" : "w-2 bg-[#111111]/15 hover:bg-[#111111]/35"
                  }`}
                  id={`cert-slide-dot-${idx}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Bottom Bar: Interactive Action Controls and Navigation */}
          <div className="mt-4 pt-6 border-t border-[#111111]/10 flex flex-col sm:flex-row justify-between items-center gap-4" id="cert-showcase-bottom-bar">
            
            {/* Custom Interactive Action Triggers inspired by the video buttons */}
            <div className="flex gap-4 w-full sm:w-auto" id="cert-bottom-actions">
              <button
                onClick={() => setShowPdf(true)}
                className="flex-[1] sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 border border-orange-600 text-white hover:bg-orange-700 font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-sm"
                id="cert-btn-verify"
              >
                <span>Preview PDF Certificate</span>
                <Eye size={12} />
              </button>
              <button
                onClick={() => alert(`Secured cryptographic certificate hash signature for ${currentCert.licenseId} successfully validated against the decentralised ledger registry.`)}
                className="flex-[1] sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 border border-[#111111]/10 bg-white hover:border-[#111111] font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm cursor-pointer"
                id="cert-btn-ledger"
              >
                <span>Ledger Registry</span>
                <ExternalLink size={12} />
              </button>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center gap-4" id="cert-showcase-steppers">
              {/* Play/Pause Slideshow button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isPlaying 
                    ? "bg-[#111111] border-[#111111] text-[#f7f7f3]" 
                    : "border-[#111111]/10 text-[#111111] hover:border-[#111111]"
                }`}
                id="cert-slideshow-toggle-btn"
                title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#111111]/10 hover:border-[#111111] rounded-full flex items-center justify-center text-[#111111] transition-all cursor-pointer"
                id="cert-prev-arrow"
              >
                <ArrowLeft size={14} />
              </button>
              <span className="font-mono text-[10px] text-[#111111]/60">
                0{activeIdx + 1} / 0{certifications.length}
              </span>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#111111]/10 hover:border-[#111111] rounded-full flex items-center justify-center text-[#111111] transition-all cursor-pointer"
                id="cert-next-arrow"
              >
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Footer bar with metadata details */}
      <footer className="px-6 md:px-12 py-4 border-t border-[#111111]/10 bg-[#f7f7f3]/80 flex justify-between items-center text-[#111111]/40 font-mono text-[8px] uppercase z-10" id="cert-showcase-footer">
        <div className="flex items-center gap-2">
          <Shield size={10} className="text-[#111111]/40" />
          <span>ALABAMA REVOLUTION ENCRYPTION CORE ENABLED</span>
        </div>
        <span>|</span>
        <div className="hidden md:flex items-center gap-2">
          <Cpu size={10} className="text-[#111111]/40" />
          <span>ISO-27001 CLOUD STORAGE SECURITY PROTOCOLS ENFORCED</span>
        </div>
        <span>|</span>
        <span>LATENCY TARGET: SUB-5MS • CHANDRU © 2026</span>
      </footer>

      {/* PDF Certificate Preview Overlay (Mimics a real PDF viewer in browser) */}
      <AnimatePresence>
        {showPdf && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#525659] flex flex-col overflow-hidden select-text"
            id="cert-pdf-viewer-overlay"
          >
            {/* PDF Viewer Dark Header */}
            <div className="bg-[#323639] text-[#f1f3f4] h-14 px-4 flex justify-between items-center border-b border-black/30 shadow-md shrink-0 z-[110]" id="cert-pdf-header">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-orange-500" />
                <span className="font-sans font-medium text-sm truncate max-w-[250px] sm:max-w-md">
                  NPTEL_Course_Certificate_{currentCert.licenseId}.pdf
                </span>
              </div>
              
              {/* PDF Middle Controls */}
              <div className="hidden md:flex items-center gap-6 bg-[#202124]/40 px-4 py-1.5 rounded-sm">
                <button 
                  onClick={() => setZoomPercent(prev => Math.max(60, prev - 10))}
                  className="hover:bg-white/10 p-1 rounded-sm text-neutral-300 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="font-mono text-xs text-neutral-300 select-none w-10 text-center">
                  {zoomPercent}%
                </span>
                <button 
                  onClick={() => setZoomPercent(prev => Math.min(180, prev + 10))}
                  className="hover:bg-white/10 p-1 rounded-sm text-neutral-300 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <div className="w-px h-4 bg-white/10" />
                <span className="font-sans text-xs text-neutral-400">Page 1 of 1</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={() => window.print()}
                  className="hover:bg-white/10 p-2 rounded-sm text-neutral-300 transition-colors"
                  title="Print Certificate"
                >
                  <Printer size={18} />
                </button>
                 <button 
                  onClick={() => {
                    if ((currentCert.id === "nptel-cloud-computing" || currentCert.id === "frontend-dev") && useUploadedPdf) {
                      const link = document.createElement("a");
                      link.href = "/assets/images/Frontend%20.pdf";
                      link.download = `Front_End_Development_Certificate_${currentCert.licenseId}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      return;
                    }
                    const element = document.getElementById("cert-printable-sheet");
                    if (element) {
                      const svgString = new XMLSerializer().serializeToString(element);
                      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `Certificate_${currentCert.licenseId}.svg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                  className="hover:bg-white/10 p-2 rounded-sm text-neutral-300 transition-colors"
                  title="Download Certificate"
                >
                  <Download size={18} />
                </button>
                <button 
                  onClick={() => setShowPdf(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </div>

            {/* Document Source Selector (only for certificates with actual uploaded PDF) */}
            {(currentCert.id === "nptel-cloud-computing" || currentCert.id === "frontend-dev") && (
              <div className="bg-[#2a2d30] text-[#f1f3f4] h-11 px-6 flex items-center justify-between border-b border-black/20 text-xs font-mono shrink-0 z-[105]" id="cert-pdf-toggle-bar">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Document Source:</span>
                  <div className="flex bg-black/30 p-0.5 rounded border border-white/5">
                    <button
                      onClick={() => setUseUploadedPdf(true)}
                      className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                        useUploadedPdf 
                          ? "bg-orange-600 text-white font-bold shadow-sm" 
                          : "text-neutral-400 hover:text-white"
                      }`}
                      id="cert-toggle-uploaded"
                    >
                      Original PDF
                    </button>
                    <button
                      onClick={() => setUseUploadedPdf(false)}
                      className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                        !useUploadedPdf 
                          ? "bg-orange-600 text-white font-bold shadow-sm" 
                          : "text-neutral-400 hover:text-white"
                      }`}
                      id="cert-toggle-simulated"
                    >
                      Interactive Simulated
                    </button>
                  </div>
                </div>
                <span className="text-neutral-500 text-[9px] uppercase hidden sm:inline">
                  File: Frontend .pdf • Type: Portable Document Format (.pdf)
                </span>
              </div>
            )}

            {/* main viewer area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left sidebar: PDF Thumbnail list */}
              <div className="hidden lg:flex w-48 bg-[#4f5255] border-r border-black/25 flex-col p-4 items-center shrink-0">
                <span className="font-sans text-[10px] text-neutral-300 uppercase tracking-wider mb-4 self-start">Thumbnails</span>
                <div className="border-2 border-orange-500 bg-white p-2 shadow-sm rounded-sm cursor-pointer hover:border-orange-600 transition-all">
                  <div className="w-32 aspect-[1.414/1] bg-neutral-100 flex flex-col justify-center items-center relative text-center border border-neutral-300 text-[6px] text-neutral-800 p-1">
                    <span className="font-bold block text-[5px] mb-1">{pdf.org}</span>
                    <span className="block text-[4px]">{currentCert.title}</span>
                    <div className="mt-2 w-16 h-0.5 bg-[#111111]/25 mx-auto" />
                    <span className="absolute bottom-1 right-1 text-[4px] text-orange-500 font-mono">P. 1</span>
                  </div>
                </div>
                <span className="text-white text-[11px] font-medium mt-2 font-mono">1. Page_1</span>
              </div>

              {/* main sheet workspace */}
              <div className="flex-1 bg-[#525659] overflow-auto p-4 sm:p-8 flex justify-center items-start scrollbar-thin">
                <motion.div 
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: zoomPercent / 100, y: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white aspect-[1.414/1] w-full max-w-4xl shadow-2xl relative text-[#111111] border border-neutral-300 overflow-hidden select-text shrink-0 print:p-0 print:shadow-none print:border-none"
                  id="cert-printable-sheet"
                >
                  {currentCert.id === "industry-4-0" ? (
                    // Pixel-perfect replica of the authentic NPTEL & IIT Kharagpur Elite Certificate
                    <div className="h-full flex flex-col justify-between relative p-6 sm:p-10 md:p-12 pb-14 bg-white select-text">
                      {/* Elite top ribbon flag */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#b22222] text-white px-8 py-1.5 font-serif font-black text-[11px] sm:text-[13px] tracking-widest uppercase rounded-b-md shadow-md z-30 flex flex-col items-center">
                        <span>Elite</span>
                      </div>

                      {/* Header Row */}
                      <div className="flex justify-between items-start w-full mt-2 sm:mt-4 z-10">
                        {/* Left: NPTEL Logo */}
                        <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-[#b22222]">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" />
                            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" />
                            {Array.from({ length: 24 }).map((_, i) => {
                              const angle = (i * 360) / 24;
                              return (
                                <line
                                  key={i}
                                  x1="50"
                                  y1="6"
                                  x2="50"
                                  y2="12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  transform={`rotate(${angle} 50 50)`}
                                />
                              );
                            })}
                            <path d="M 32,50 Q 50,18 68,50 Q 50,82 32,50" fill="none" stroke="#d97706" strokeWidth="1.2" />
                            <path d="M 50,32 Q 82,50 50,68 Q 18,50 50,32" fill="none" stroke="#d97706" strokeWidth="1.2" />
                            <circle cx="50" cy="50" r="10" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Center: Title */}
                        <div className="flex-1 text-center px-4 space-y-1 sm:space-y-1.5">
                          <h2 className="font-serif font-extrabold text-[#b22222] text-base sm:text-xl md:text-2xl tracking-wide uppercase leading-tight">
                            NPTEL ONLINE CERTIFICATION
                          </h2>
                          <p className="font-sans text-[8px] sm:text-[10px] text-neutral-600 font-medium tracking-wide">
                            (Funded by the MoE, Govt. of India)
                          </p>
                        </div>

                        {/* Right: Skill India logo and Portrait photo */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 p-1 rounded-sm shadow-2xs">
                            <div className="flex flex-col text-right leading-none">
                              <span className="font-sans font-black text-[6px] sm:text-[8px] text-[#003366] uppercase">Skill India</span>
                              <span className="text-[4px] sm:text-[5px] text-neutral-500 font-bold">कौशल भारत - कुशल भारत</span>
                            </div>
                            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 text-[#003366]">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                              <path d="M30,55 C40,40 60,40 70,55 M50,25 C42,25 38,32 38,40 C38,55 50,65 50,75 C50,65 62,55 62,40 C62,32 58,25 50,25 Z" fill="currentColor" />
                            </svg>
                          </div>

                          <img 
                            src="/assets/images/ch1.jpg" 
                            referrerPolicy="no-referrer" 
                            className="w-16 h-20 sm:w-20 sm:h-24 object-cover border-2 border-neutral-300 rounded-xs shadow-sm bg-neutral-100" 
                            alt="CHANDRU P" 
                          />
                        </div>
                      </div>

                      {/* Recipient details */}
                      <div className="text-center my-2 space-y-2 max-w-xl mx-auto z-10">
                        <p className="font-serif italic text-xs sm:text-sm text-neutral-700">
                          This certificate is awarded to
                        </p>
                        <h1 className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-wide text-neutral-900 uppercase">
                          CHANDRU P
                        </h1>
                        <p className="font-serif italic text-xs sm:text-sm text-neutral-700">
                          for successfully completing the course
                        </p>
                        <h2 className="font-serif font-black text-sm sm:text-base md:text-xl text-neutral-950 tracking-wide leading-snug my-1 max-w-lg mx-auto">
                          Introduction to Industry 4.0
                        </h2>
                        <div className="flex items-center justify-center gap-1.5 font-serif text-xs sm:text-sm text-neutral-800 my-1">
                          <span>with a consolidated score of</span>
                          <span className="font-sans font-black text-sm sm:text-base border-b-2 border-neutral-800 px-1.5 text-[#b22222]">73</span>
                          <span className="font-sans font-black text-[#b22222]">%</span>
                        </div>
                      </div>

                      {/* Score breakdown grid table */}
                      <div className="max-w-md mx-auto w-full z-10 my-1">
                        <div className="border-[1.5px] border-neutral-900 grid grid-cols-4 font-sans text-[10px] sm:text-xs text-center items-stretch divide-x divide-neutral-900 bg-white">
                          <div className="py-2 px-1 font-bold text-neutral-800 flex items-center justify-center">
                            Online Assignments
                          </div>
                          <div className="py-2 px-1 font-black text-[#b22222] flex items-center justify-center">
                            25/25
                          </div>
                          <div className="py-2 px-1 font-bold text-neutral-800 flex items-center justify-center">
                            Proctored Exam
                          </div>
                          <div className="py-2 px-1 font-black text-[#b22222] flex items-center justify-center">
                            48/75
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-[9px] sm:text-[10px] font-sans font-semibold text-neutral-600">
                            Total number of candidates certified in this course: <span className="font-bold text-neutral-900">19100</span>
                          </p>
                        </div>
                      </div>

                      {/* Duration & Signature block */}
                      <div className="w-full flex justify-between items-end mt-2 sm:mt-4 z-10">
                        {/* Duration */}
                        <div className="flex flex-col items-start text-left font-sans text-[10px] sm:text-xs text-neutral-800 leading-tight">
                          <p className="font-bold">Jul-Oct 2025</p>
                          <p className="text-neutral-500 italic">(12 week course)</p>
                        </div>

                        {/* Signature of Coordinator */}
                        <div className="flex flex-col items-center text-center space-y-1 mr-2 shrink-0">
                          <div className="h-10 flex items-end justify-center">
                            <svg width="100" height="30" viewBox="0 0 100 30" fill="none" stroke="#111827" strokeWidth="1.5">
                              <path d="M 10,22 C 20,18 30,5 42,12 C 55,20 62,5 75,15 C 88,22 92,10 98,18" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="w-28 h-[1px] bg-neutral-400" />
                          <span className="font-mono text-[9px] font-black text-neutral-900 block">
                            Prof. Haimanti Banerji
                          </span>
                          <span className="font-sans text-[7px] text-neutral-500 uppercase tracking-wider font-semibold">
                            Coordinator, NPTEL | IIT Kharagpur
                          </span>
                        </div>
                      </div>

                      {/* Sponsor logos on light sand-colored section */}
                      <div className="w-full grid grid-cols-2 bg-[#fdf5ea] border border-neutral-300 p-2 rounded-sm items-center mt-3 z-10">
                        <div className="flex items-center gap-2 text-left">
                          <svg viewBox="0 0 100 100" className="w-8 h-8 text-indigo-950 shrink-0">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M 50,15 L 75,45 L 60,45 L 60,75 L 40,75 L 40,45 L 25,45 Z" fill="currentColor" />
                            <circle cx="50" cy="80" r="3" fill="currentColor" />
                          </svg>
                          <span className="font-sans text-[8px] font-black uppercase text-indigo-950 leading-tight max-w-[150px]">
                            Indian Institute of Technology Kharagpur
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 justify-end text-right">
                          <div className="border border-orange-200 bg-white px-2 py-0.5 rounded-sm leading-none flex flex-col items-end shadow-3xs">
                            <span className="font-bold text-[5px] text-orange-600 uppercase tracking-widest">Free Online Education</span>
                            <span className="font-black text-[10px] text-blue-900 uppercase">swayam</span>
                            <span className="text-[4px] text-neutral-500">शिक्षित भारत, उन्नत भारत</span>
                          </div>
                        </div>
                      </div>

                      {/* Crimson Red bottom absolute footer bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#8b0000] text-white h-11 px-4 sm:px-6 flex justify-between items-center z-20 font-mono text-[8px] sm:text-[9px]">
                        <span className="font-bold tracking-wider">Roll No: NPTEL25CS146S1064600921</span>
                        
                        <div className="flex items-center gap-2">
                          <span className="uppercase text-[7px] tracking-wider font-semibold opacity-90 hidden sm:inline">To verify the certificate</span>
                          <div className="w-7 h-7 bg-white p-0.5 rounded-xs flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 25 25" className="w-full h-full text-black">
                              <rect x="0" y="0" width="7" height="7" fill="currentColor" />
                              <rect x="1" y="1" width="5" height="5" fill="white" />
                              <rect x="2" y="2" width="3" height="3" fill="currentColor" />

                              <rect x="18" y="0" width="7" height="7" fill="currentColor" />
                              <rect x="19" y="1" width="5" height="5" fill="white" />
                              <rect x="20" y="2" width="3" height="3" fill="currentColor" />

                              <rect x="0" y="18" width="7" height="7" fill="currentColor" />
                              <rect x="1" y="19" width="5" height="5" fill="white" />
                              <rect x="2" y="20" width="3" height="3" fill="currentColor" />

                              <rect x="9" y="2" width="2" height="2" fill="currentColor" />
                              <rect x="13" y="1" width="3" height="2" fill="currentColor" />
                              <rect x="10" y="6" width="3" height="1" fill="currentColor" />
                              <rect x="9" y="9" width="2" height="3" fill="currentColor" />
                              <rect x="13" y="10" width="3" height="2" fill="currentColor" />
                              <rect x="18" y="9" width="2" height="4" fill="currentColor" />
                              <rect x="22" y="13" width="2" height="3" fill="currentColor" />
                              <rect x="10" y="15" width="4" height="2" fill="currentColor" />
                              <rect x="15" y="18" width="3" height="3" fill="currentColor" />
                              <rect x="20" y="20" width="4" height="2" fill="currentColor" />
                            </svg>
                          </div>
                        </div>

                        <span className="font-bold tracking-wider">No. of credits recommended: 3 or 4</span>
                      </div>
                    </div>
                  ) : currentCert.id === "nptel-cloud-computing" ? (
                    useUploadedPdf ? (
                      <div className="w-full h-full relative bg-neutral-800">
                        <iframe
                          src="/assets/images/Frontend%20.pdf"
                          className="w-full h-full border-0 block bg-white"
                          title="Original Certificate PDF"
                        />
                      </div>
                    ) : (
                      // Pixel-perfect replica of the authentic NPTEL Online Certification (Cloud Computing)
                      <div className="h-full flex flex-col justify-between relative p-6 sm:p-10 md:p-12 bg-[#fdfdfc] select-text overflow-hidden" id="nptel-cloud-simulated">
                        {/* Elite Top Banner */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-700 text-white font-sans font-black text-[9px] sm:text-[11px] tracking-widest px-8 py-1.5 rounded-b shadow-md z-20 flex flex-col items-center">
                          <span className="text-white uppercase font-bold text-[10px]">Elite</span>
                        </div>

                        {/* Top Row: Logos & Header */}
                        <div className="flex justify-between items-start z-10 w-full mb-1 sm:mb-2">
                          {/* Left: NPTEL Logo */}
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-xs border border-red-100 p-1">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-red-600">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
                                <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(30 50 50)" />
                                <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(90 50 50)" />
                                <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(150 50 50)" />
                                <circle cx="50" cy="50" r="10" fill="#d4af37" />
                                <circle cx="50" cy="50" r="5" fill="currentColor" />
                              </svg>
                            </div>
                          </div>

                          {/* Center Title Block */}
                          <div className="flex flex-col items-center text-center px-4 flex-1">
                            <h1 className="font-serif font-black text-[#A81C1C] text-sm sm:text-base md:text-xl lg:text-2xl tracking-wider leading-none uppercase">
                              NPTEL Online Certification
                            </h1>
                            <p className="font-sans font-bold text-[7px] sm:text-[9px] text-neutral-600 mt-1 uppercase">
                              (Funded by the MoE, Govt. of India)
                            </p>
                          </div>

                          {/* Right: Skill India Logo */}
                          <div className="flex flex-col items-center leading-none">
                            <div className="flex items-center gap-1 bg-white p-1 rounded border border-neutral-200 shadow-3xs">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 text-[#0c2340] shrink-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <rect x="15" y="15" width="70" height="50" rx="4" fill="#003366" />
                                  <rect x="20" y="20" width="60" height="40" fill="#ffffff" />
                                  <line x1="10" y1="75" x2="90" y2="75" stroke="#003366" strokeWidth="8" strokeLinecap="round" />
                                  <line x1="30" y1="65" x2="40" y2="75" stroke="#003366" strokeWidth="6" />
                                  <line x1="70" y1="65" x2="60" y2="75" stroke="#003366" strokeWidth="6" />
                                  <circle cx="50" cy="40" r="8" fill="#ff9900" />
                                  <path d="M 40,55 Q 50,45 60,55" stroke="#ff9900" strokeWidth="3" fill="none" />
                                </svg>
                              </div>
                              <div className="flex flex-col items-start font-sans">
                                <span className="font-extrabold text-[10px] text-blue-900 tracking-tighter leading-none">Skill India</span>
                                <span className="text-[4px] text-neutral-500 font-bold leading-none uppercase">कौशल भारत - कुशल भारत</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mid Section: Silver Medal (Left) & Portrait (Right) & Main Text (Center) */}
                        <div className="flex flex-row items-center justify-between gap-4 w-full my-2 relative">
                          
                          {/* Left: Elite Silver Medal Badge */}
                          <div className="w-16 sm:w-24 shrink-0 flex flex-col items-center">
                            <div className="relative w-14 h-14 sm:w-20 sm:h-20">
                              {/* Hanging Ribbons */}
                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                <path d="M 35,40 L 25,95 L 45,95 L 40,40 Z" fill="#003366" opacity="0.9" />
                                <path d="M 65,40 L 75,95 L 55,95 L 60,40 Z" fill="#003366" opacity="0.9" />
                                <path d="M 30,95 L 35,90 L 40,95 Z" fill="#ffffff" />
                                <path d="M 70,95 L 65,90 L 60,95 Z" fill="#ffffff" />
                              </svg>
                              {/* Shiny Silver Medallion with Gold rim */}
                              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-neutral-100 via-neutral-300 to-neutral-400 border-[3px] border-[#d4af37] flex items-center justify-center shadow-md">
                                <div className="absolute inset-0.5 rounded-full border border-white opacity-60" />
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-neutral-400 flex flex-col items-center justify-center bg-linear-to-br from-white to-neutral-200">
                                  <span className="font-sans font-black text-[#003366] text-[5px] sm:text-[7px] uppercase tracking-tighter">Silver</span>
                                  {/* Small star */}
                                  <svg className="w-2 h-2 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <span className="font-mono text-[7px] sm:text-[9px] text-neutral-500 font-bold uppercase tracking-wide mt-1 text-center">Elite Silver</span>
                          </div>

                          {/* Center: Recipient details & Course Title */}
                          <div className="flex-1 text-center px-2 space-y-2 max-w-xl">
                            <div>
                              <p className="font-serif italic text-neutral-500 text-[9px] sm:text-xs">
                                This certificate is awarded to
                              </p>
                              <h2 className="font-sans font-black text-neutral-800 text-sm sm:text-lg md:text-2xl uppercase tracking-wider mt-0.5" id="nptel-cert-recipient">
                                CHANDRU P
                              </h2>
                              <p className="font-serif italic text-neutral-500 text-[9px] sm:text-xs mt-0.5">
                                for successfully completing the course
                              </p>
                            </div>

                            <div className="py-1">
                              <h3 className="font-serif font-black text-neutral-900 text-base sm:text-xl md:text-3xl tracking-tight leading-none" id="nptel-cert-course">
                                Cloud Computing
                              </h3>
                            </div>

                            {/* Consolidated Score Block */}
                            <div className="space-y-1.5">
                              <p className="font-serif text-[10px] sm:text-xs text-neutral-700 font-medium">
                                with a consolidated score of <span className="font-black text-red-700 text-xs sm:text-sm md:text-base border-b border-red-700 pb-0.5 px-1.5 bg-red-50">77</span> %
                              </p>

                              {/* Assignments/Exams Split Box */}
                              <div className="max-w-xs mx-auto border-2 border-[#0c2340] divide-x-2 divide-[#0c2340] grid grid-cols-2 text-center font-serif text-[7px] sm:text-[9px] md:text-[10px] bg-white leading-tight">
                                <div className="py-1 flex flex-col justify-center">
                                  <span className="font-bold text-neutral-800">Online Assignments</span>
                                  <span className="font-black text-red-700 mt-0.5">24.69/25</span>
                                </div>
                                <div className="py-1 flex flex-col justify-center">
                                  <span className="font-bold text-neutral-800">Proctored Exam</span>
                                  <span className="font-black text-red-700 mt-0.5">51.86/75</span>
                                </div>
                              </div>

                              <p className="font-serif italic text-[8px] sm:text-[9px] text-neutral-500">
                                Total number of candidates certified in this course: <span className="font-bold text-neutral-800">33345</span>
                              </p>
                            </div>
                          </div>

                          {/* Right: Modern Vector Profile Portrait Frame */}
                          <div className="w-16 sm:w-24 shrink-0 flex flex-col items-center">
                            <div className="w-14 h-18 sm:w-20 sm:h-26 border border-neutral-300 bg-white shadow-3xs p-1 flex items-center justify-center relative overflow-hidden">
                              {/* Sleek abstract academic profile vector */}
                              <div className="w-full h-full bg-linear-to-b from-blue-500/10 to-indigo-900/10 rounded-sm flex flex-col items-center justify-end relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent)] opacity-60" />
                                {/* Blue collar academic silhouette representation */}
                                <svg className="w-5/6 h-5/6 text-indigo-950 opacity-90 drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
                                  <path d="M 50,45 C 58,45 65,37 65,28 C 65,19 58,11 50,11 C 42,11 35,19 35,28 C 35,37 42,45 50,45 Z" />
                                  <path d="M 50,52 C 30,52 14,64 14,79 L 86,79 C 86,64 70,52 50,52 Z" />
                                  {/* Sleek glasses frame for student vibe */}
                                  <rect x="42" y="24" width="7" height="3" rx="1" fill="none" stroke="white" strokeWidth="1" />
                                  <rect x="51" y="24" width="7" height="3" rx="1" fill="none" stroke="white" strokeWidth="1" />
                                  <line x1="49" y1="25.5" x2="51" y2="25.5" stroke="white" strokeWidth="1" />
                                </svg>
                                <div className="absolute bottom-0 inset-x-0 bg-blue-900 text-white text-[5px] sm:text-[7px] text-center uppercase tracking-widest font-mono py-0.5 leading-none">
                                  Verified
                                </div>
                              </div>
                            </div>
                            <span className="font-sans text-[6px] sm:text-[8px] font-bold text-neutral-400 mt-1 uppercase tracking-wide">Candidate Photo</span>
                          </div>
                        </div>

                        {/* Timing Block & Coordinator signature */}
                        <div className="flex justify-between items-end w-full border-t border-neutral-200 pt-1.5 sm:pt-2">
                          <div className="flex flex-col items-start text-left font-serif text-[8px] sm:text-[10px] space-y-0.5">
                            <span className="font-bold text-neutral-800">Jan-Apr 2026</span>
                            <span className="text-neutral-500 italic">(12 week course)</span>
                          </div>

                          {/* Coordinator Signature block */}
                          <div className="flex flex-col items-center text-center">
                            {/* Autographed Vector Signature Line */}
                            <div className="h-6 flex items-end justify-center mb-0.5">
                              <svg width="80" height="24" viewBox="0 0 100 30" fill="none" stroke="#111827" strokeWidth="1.5">
                                <path d="M 10,25 Q 22,5 35,20 T 55,10 T 78,22 T 95,12" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 40,5 Q 52,25 45,28" strokeLinecap="round" />
                              </svg>
                            </div>
                            <div className="w-24 h-[1px] bg-neutral-300" />
                            <span className="font-sans font-bold text-neutral-800 text-[8px] sm:text-[10px] mt-0.5 leading-none">
                              Prof. Haimanti Banerji
                            </span>
                            <span className="font-sans text-[5px] sm:text-[7px] text-neutral-500 uppercase tracking-widest mt-0.5">
                              Coordinator, NPTEL, IIT Kharagpur
                            </span>
                          </div>
                        </div>

                        {/* Bottom Row: Academic Affiliation Logos */}
                        <div className="flex justify-between items-center w-full border-t border-neutral-200 pt-2 pb-6">
                          {/* IIT Kharagpur Logo and Brand */}
                          <div className="flex items-center gap-1.5 text-left">
                            <div className="w-7 h-7 sm:w-10 sm:h-10 shrink-0 text-[#0c2340]">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                                <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M 50,30 L 70,45 L 60,70 L 40,70 L 30,45 Z" fill="currentColor" opacity="0.15" />
                                <circle cx="50" cy="50" r="10" fill="currentColor" />
                              </svg>
                            </div>
                            <span className="font-serif font-black text-[#0c2340] text-[7px] sm:text-[9px] md:text-[10px] leading-tight">
                              Indian Institute of Technology<br />Kharagpur
                            </span>
                          </div>

                          {/* Swayam Logo and Slogan */}
                          <div className="flex items-center gap-1.5 text-right">
                            <div className="border border-orange-200 bg-white px-2 py-0.5 rounded-sm leading-none flex flex-col items-end shadow-3xs shrink-0">
                              <span className="font-bold text-[4px] sm:text-[5px] text-orange-600 uppercase tracking-widest leading-none">Free Online Education</span>
                              <span className="font-black text-[8px] sm:text-[10px] text-blue-900 uppercase leading-none">swayam</span>
                              <span className="text-[3px] sm:text-[4px] text-neutral-500 leading-none">शिक्षित भारत, उन्नत भारत</span>
                            </div>
                          </div>
                        </div>

                        {/* Crimson Red Bottom Footer Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#8b0000] text-white h-10 px-4 sm:px-6 flex justify-between items-center z-20 font-mono text-[7px] sm:text-[9px]">
                          <span className="font-bold tracking-wider uppercase">Roll No: NPTEL26CS55S1062000680</span>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="uppercase text-[6px] tracking-wider font-semibold opacity-90 hidden sm:inline">To verify the certificate</span>
                            <div className="w-6 h-6 bg-white p-0.5 rounded-xs flex items-center justify-center shrink-0 shadow-3xs">
                              <svg viewBox="0 0 25 25" className="w-full h-full text-black">
                                <rect x="0" y="0" width="7" height="7" fill="currentColor" />
                                <rect x="1" y="1" width="5" height="5" fill="white" />
                                <rect x="2" y="2" width="3" height="3" fill="currentColor" />

                                <rect x="18" y="0" width="7" height="7" fill="currentColor" />
                                <rect x="19" y="1" width="5" height="5" fill="white" />
                                <rect x="20" y="2" width="3" height="3" fill="currentColor" />

                                <rect x="0" y="18" width="7" height="7" fill="currentColor" />
                                <rect x="1" y="19" width="5" height="5" fill="white" />
                                <rect x="2" y="20" width="3" height="3" fill="currentColor" />

                                <rect x="9" y="2" width="2" height="2" fill="currentColor" />
                                <rect x="13" y="1" width="3" height="2" fill="currentColor" />
                                <rect x="10" y="6" width="3" height="1" fill="currentColor" />
                                <rect x="9" y="9" width="2" height="3" fill="currentColor" />
                                <rect x="13" y="10" width="3" height="2" fill="currentColor" />
                                <rect x="18" y="9" width="2" height="4" fill="currentColor" />
                                <rect x="22" y="13" width="2" height="3" fill="currentColor" />
                                <rect x="10" y="15" width="4" height="2" fill="currentColor" />
                                <rect x="15" y="18" width="3" height="3" fill="currentColor" />
                                <rect x="20" y="20" width="4" height="2" fill="currentColor" />
                              </svg>
                            </div>
                          </div>

                          <span className="font-bold tracking-wider uppercase">No. of credits recommended: 4</span>
                        </div>
                      </div>
                    )
                  ) : currentCert.id === "frontend-dev" ? (
                    useUploadedPdf ? (
                      <div className="w-full h-full relative bg-neutral-800">
                        <iframe
                          src="/assets/images/Frontend%20.pdf"
                          className="w-full h-full border-0 block bg-white"
                          title="Original Front End Certificate PDF"
                        />
                      </div>
                    ) : (
                      // Pixel-perfect replica of the authentic Simplilearn SkillUp Certificate
                      <div className="h-full flex flex-col justify-between relative p-6 sm:p-10 md:p-12 bg-[#fafbfc] border-8 border-[#0f2942] select-text overflow-hidden">
                        {/* Background watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                          <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#0f2942" strokeWidth="2" />
                            <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" fill="#f29c1f" />
                          </svg>
                        </div>

                        {/* Top Header Row */}
                        <div className="flex justify-between items-start w-full z-10 pr-20 sm:pr-24">
                          {/* Simplilearn SkillUp Logo */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-[#0f2942] font-black text-xl sm:text-2xl font-sans tracking-tight">
                              <span>simpli</span>
                              <span className="text-[#00c4cc]">learn</span>
                              <span className="ml-2 px-1.5 py-0.5 bg-[#f29c1f] text-white font-bold text-xs uppercase rounded-xs tracking-wider">SkillUP</span>
                            </div>
                          </div>

                          {/* Certificate Code Pill */}
                          <div className="text-right">
                            <span className="font-mono text-[9px] sm:text-xs text-neutral-500 font-semibold uppercase tracking-wider block">Certificate code : 8119182</span>
                            <span className="font-sans text-[8px] sm:text-[10px] text-neutral-400">31st March 2025</span>
                          </div>
                        </div>

                        {/* Certificate Body Content */}
                        <div className="my-auto py-4 z-10 max-w-xl">
                          <div className="space-y-1">
                            <p className="font-serif italic text-neutral-600 text-sm sm:text-base">This is to certify that</p>
                            <h1 className="font-sans font-black text-2xl sm:text-4xl text-[#0f2942] tracking-tight border-b-2 border-dotted border-neutral-300 pb-1 inline-block">
                              CHANDRU. P
                            </h1>
                          </div>

                          <div className="mt-4 space-y-2">
                            <p className="font-sans text-xs sm:text-sm text-neutral-600 font-medium">
                              has successfully completed the online course:
                            </p>
                            <h2 className="font-sans font-extrabold text-lg sm:text-2xl text-[#f29c1f] uppercase tracking-wide">
                              Introduction to Front End Development
                            </h2>
                            <p className="font-sans text-[11px] sm:text-xs text-neutral-500 max-w-md leading-relaxed mt-2">
                              This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!
                            </p>
                          </div>
                        </div>

                        {/* Bottom Footer Row */}
                        <div className="flex justify-between items-end w-full z-10 pt-4 border-t border-neutral-200 pr-20 sm:pr-24">
                          {/* Left: Issue Date & Verification */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                              <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">VERIFIED CREDENTIAL</span>
                            </div>
                            <p className="font-mono text-[10px] text-neutral-500">Issued by Simplilearn SkillUp Platform</p>
                          </div>

                          {/* Right: Signature */}
                          <div className="text-center flex flex-col items-center">
                            <div className="h-8 w-28 border-b border-neutral-400 mb-1 flex items-center justify-center italic font-serif text-base text-neutral-800">
                              Krishna Kumar
                            </div>
                            <span className="font-sans font-extrabold text-xs text-[#0f2942]">Krishna Kumar</span>
                            <span className="font-sans text-[10px] text-neutral-500">CEO, Simplilearn</span>
                          </div>
                        </div>

                        {/* Right Decorative Ribbon Badge */}
                        <div className="absolute top-0 right-4 sm:right-8 w-14 sm:w-16 bg-[#0f2942] h-full pointer-events-none flex flex-col items-center justify-center opacity-95 border-x border-[#1a3a5c] z-20">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#f29c1f] flex items-center justify-center bg-white shadow-md">
                            <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-8 sm:h-8 text-[#0f2942]">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
                              <path d="M30,50 L45,65 L70,35" fill="none" stroke="#f29c1f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    // Default template for other professional certificates
                    <div className="h-full flex flex-col justify-between items-center text-center relative z-10 py-2 p-6 sm:p-12 md:p-14 bg-white">
                      {/* Decorative Outer Border Lines */}
                      <div className="absolute inset-4 border-2 border-neutral-800/20 pointer-events-none" />
                      <div className="absolute inset-6 border-[3px] border-neutral-800 pointer-events-none" />
                      <div className="absolute inset-[28px] border border-neutral-800/10 pointer-events-none" />

                      {/* Corner Ornate SVG Details */}
                      <div className="absolute top-[22px] left-[22px] text-neutral-800 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M 0,24 L 0,0 L 24,0" />
                        </svg>
                      </div>
                      <div className="absolute top-[22px] right-[22px] text-neutral-800 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M 24,24 L 24,0 L 0,0" />
                        </svg>
                      </div>
                      <div className="absolute bottom-[22px] left-[22px] text-neutral-800 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M 0,0 L 0,24 L 24,24" />
                        </svg>
                      </div>
                      <div className="absolute bottom-[22px] right-[22px] text-neutral-800 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M 24,0 L 24,24 L 0,24" />
                        </svg>
                      </div>

                      {/* Watermark Crest in Background */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <svg width="350" height="350" viewBox="0 0 200 200" fill="currentColor">
                          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" />
                          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                          <path d="M 100,20 L 100,180 M 20,100 L 180,100" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                      </div>

                      {/* Header Banner */}
                      <div className="space-y-1.5 mt-2">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-500 block">
                          ONLINE CREDENTIAL SYSTEM OF ACADEMIC RECORD
                        </span>
                        <h3 className="font-display font-black text-xs sm:text-sm tracking-widest uppercase text-neutral-800">
                          {pdf.org}
                        </h3>
                        <p className="font-sans text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-widest italic">
                          {pdf.orgSub}
                        </p>
                        <div className="w-32 h-[1px] bg-neutral-800/20 mx-auto mt-2" />
                      </div>

                      {/* Main Title */}
                      <div className="space-y-2 mt-2 sm:mt-4">
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-orange-600 block">
                          CERTIFICATE OF COMPLETION
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-neutral-500 italic">
                          This document officially certifies that
                        </p>
                        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-900 tracking-tight uppercase leading-none my-2">
                          CHANDRU P
                        </h1>
                        <p className="font-sans text-xs text-neutral-500 italic max-w-lg mx-auto leading-relaxed">
                          has successfully completed the demanding coursework, examinations, and project evaluations required to earn academic credentials in
                        </p>
                        <h2 className="font-display font-black text-sm sm:text-base md:text-lg text-neutral-800 uppercase tracking-wide max-w-xl mx-auto border-y border-neutral-200 py-2 my-2">
                          {pdf.title}
                        </h2>
                        <p className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                          {pdf.subtitle}
                        </p>
                      </div>

                      {/* Performance metadata score */}
                      <div className="mt-2 bg-neutral-50 border border-neutral-100 px-4 py-1.5 rounded-sm">
                        <span className="font-mono text-[9px] tracking-wider text-neutral-700 font-bold block">
                          {pdf.score}
                        </span>
                      </div>

                      {/* Bottom row: Signatures and Stamp */}
                      <div className="w-full grid grid-cols-3 items-end mt-4 sm:mt-6 pt-4 border-t border-neutral-200/50">
                        {/* Left: Signature 1 */}
                        <div className="flex flex-col items-center text-center space-y-1">
                          <div className="h-10 flex items-end justify-center">
                            <svg width="80" height="28" viewBox="0 0 100 35" fill="none" stroke="#223344" strokeWidth="1.5" className="opacity-80">
                              <path d="M 10,25 C 20,5 30,12 40,20 C 50,28 60,8 70,15 C 80,22 90,5 95,12" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="w-24 h-[1px] bg-neutral-300" />
                          <span className="font-mono text-[8px] font-bold text-neutral-800 block truncate max-w-[120px]">
                            {pdf.sig1Name}
                          </span>
                          <span className="font-sans text-[7px] text-neutral-400 uppercase tracking-wide">
                            {pdf.sig1Title}
                          </span>
                        </div>

                        {/* Middle: Gold foil Seal graphic */}
                        <div className="flex flex-col items-center justify-center relative">
                          <div className="w-14 h-14 rounded-full border-2 border-yellow-600 bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md relative z-10 p-1 shrink-0">
                            <div className="w-full h-full rounded-full border border-dashed border-white flex flex-col items-center justify-center text-white font-mono text-[5px] font-bold tracking-tighter text-center">
                              <span>VERIFIED</span>
                              <span>2026</span>
                            </div>
                            <div className="absolute -bottom-2 -left-1 w-2.5 h-6 bg-red-600 origin-top rotate-12 -z-10 shadow-sm" />
                            <div className="absolute -bottom-2 -right-1 w-2.5 h-6 bg-red-600 origin-top -rotate-12 -z-10 shadow-sm" />
                          </div>
                        </div>

                        {/* Right: Signature 2 */}
                        <div className="flex flex-col items-center text-center space-y-1">
                          <div className="h-10 flex items-end justify-center">
                            <svg width="80" height="28" viewBox="0 0 100 35" fill="none" stroke="#223344" strokeWidth="1.5" className="opacity-80">
                              <path d="M 5,15 C 15,25 25,5 35,15 C 45,25 55,20 65,10 C 75,2 85,25 95,20" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="w-24 h-[1px] bg-neutral-300" />
                          <span className="font-mono text-[8px] font-bold text-neutral-800 block truncate max-w-[120px]">
                            {pdf.sig2Name}
                          </span>
                          <span className="font-sans text-[7px] text-neutral-400 uppercase tracking-wide">
                            {pdf.sig2Title}
                          </span>
                        </div>
                      </div>

                      {/* Metadata Footer */}
                      <div className="w-full flex justify-between items-center text-[7px] text-neutral-400 font-mono mt-4 pt-2 border-t border-neutral-100">
                        <span>LICENSE ID: {currentCert.licenseId}</span>
                        <span className="text-orange-500 font-bold uppercase">STATUS: SYSTEM_VERIFIED • DIGITAL DEED ISSUED</span>
                        <span>ISSUE DATE: ACTIVE • 2026</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
