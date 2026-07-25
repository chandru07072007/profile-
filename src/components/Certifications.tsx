import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ArrowUpRight, Shield, Zap, Cpu, Server, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface CredentialItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  date: string;
  licenseId: string;
  skills: string[];
  type: string;
  color: string;
}

interface CertificationsProps {
  onOpenShowcase: () => void;
}

export default function Certifications({ onOpenShowcase }: CertificationsProps) {
  const [showAll, setShowAll] = useState(false);

  const initialCredentials: CredentialItem[] = [
    {
      id: "aws-architect",
      number: "01",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Verify Active • 2026",
      licenseId: "AWS-ASA-9942A",
      type: "Cloud Infrastructure",
      color: "from-[#FF9900]/20 to-transparent",
      skills: ["VPC", "S3 Datalakes", "EC2", "IAM", "CloudFront", "Route53", "Serverless Architecture"]
    },
    {
      id: "fastapi-python",
      number: "02",
      title: "GenAI Powered Data Analytics",
      issuer: "TATA",
      date: "Verify Active • 2026",
      licenseId: "TATA-GENAI-774A",
      type: "AI & Data Engineering",
      color: "from-[#00539b]/20 to-transparent",
      skills: ["Generative AI", "RAG Pipelines", "Vector Databases", "LangChain Systems", "LLM Evaluation", "Data Analytics Streams"]
    },
    {
      id: "n8n-automation",
      number: "03",
      title: "IBM SPSS Statistics & Analytics",
      issuer: "IBM",
      date: "Verify Active • 2026",
      licenseId: "IBM-STAT-9922X",
      type: "Data Science & Stats",
      color: "from-[#0f62fe]/20 to-transparent",
      skills: ["SPSS Statistics", "Quantitative Analysis", "Predictive Modeling", "Hypothesis Testing", "Regression Models", "Data Visualization"]
    },
    {
      id: "industry-4-0",
      number: "04",
      title: "Introduction to Industry 4.0",
      issuer: "NPTEL • IIT Kharagpur",
      date: "Jul-Oct 2025",
      licenseId: "NPTEL25CS146S1064600921",
      type: "Industrial IoT & Automation",
      color: "from-[#ff6b00]/20 to-transparent",
      skills: ["Industrial IoT", "Cyber-Physical Systems", "OPC-UA / MQTT", "Predictive Maintenance", "Telemetry Streams"]
    }
  ];

  const extraCredentials: CredentialItem[] = [
    {
      id: "mongodb-rag",
      number: "05",
      title: "Building RAG Apps Using MongoDB",
      issuer: "MongoDB University",
      date: "Verify Active • 2026",
      licenseId: "MDB-RAG-9905X",
      type: "Vector DB & GenAI",
      color: "from-[#00684A]/20 to-transparent",
      skills: ["MongoDB Atlas", "Vector Search", "RAG Architecture", "Semantic Search", "LLM Embeddings", "Aggregation Framework"]
    },
    {
      id: "nptel-cloud-computing",
      number: "06",
      title: "Cloud Computing",
      issuer: "NPTEL • IIT Kharagpur",
      date: "Jan-Apr 2026",
      licenseId: "NPTEL26CS55S1062000680",
      type: "Cloud Computing",
      color: "from-[#8b0000]/20 to-transparent",
      skills: ["Virtualization", "Cloud Security", "Distributed Storage", "Hypervisors & Containers", "SLA & Resource Pricing", "Swayam Platform"]
    },
    {
      id: "frontend-dev",
      number: "07",
      title: "Introduction to Front End Development",
      issuer: "Simplilearn SkillUp",
      date: "31st March 2025",
      licenseId: "8119182",
      type: "Frontend Engineering",
      color: "from-[#0066cc]/20 to-transparent",
      skills: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "DOM Manipulation", "UI Components", "Web Optimization"]
    }
  ];

  const totalCredentialsCount = initialCredentials.length + extraCredentials.length;

  return (
    <section 
      id="certifications-section"
      className="bg-[#0b0b0b] border-t border-white/5 py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Absolute grid decoration lines to match the Swiss design */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" id="cert-grid-decor">
        <div className="w-full h-full border-l border-r border-white flex justify-between">
          <div className="h-full border-r border-white w-1/4"></div>
          <div className="h-full border-r border-white w-1/4"></div>
          <div className="h-full border-r border-white w-1/4"></div>
        </div>
      </div>

      {/* Editorial Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-16 gap-4" id="certifications-header">
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-3">
          <span className="text-white font-bold" id="cert-number">[ 05 ]</span>
          <span>Accreditation & Badges</span>
        </div>
        <div className="font-display text-sm text-neutral-400 font-semibold uppercase tracking-widest" id="cert-title-tag">
          Verified Status
        </div>
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest" id="cert-angle-tag">
          Enterprise Standards
        </div>
      </div>

      {/* Giant Editorial Heading (matching video's 6-YEAR INVESTIGATION style) */}
      <div className="mb-16 select-none" id="cert-giant-headline">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <h2 className="font-display font-black text-6xl md:text-8xl xl:text-9xl text-white uppercase leading-none tracking-tighter">
            VERIFIED.
          </h2>
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full" id="cert-badge-count">
            {showAll ? `${totalCredentialsCount} active professional credentials` : `${initialCredentials.length} featured certifications`}
          </span>
        </div>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="certifications-grid">
        {initialCredentials.map((cred) => (
          <motion.div
            key={cred.id}
            whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ duration: 0.3 }}
            className={`relative flex flex-col justify-between border border-white/5 bg-gradient-to-br ${cred.color} p-6 md:p-8 hover:bg-neutral-900/40 group transition-all duration-300 overflow-hidden`}
            id={`cert-card-${cred.id}`}
          >
            {/* Absolute diagonal "badge" label background for visual richness */}
            <div className="absolute top-4 right-4 text-neutral-700/30 group-hover:text-neutral-500/20 font-mono text-7xl font-bold select-none transition-colors duration-500">
              {cred.number}
            </div>

            {/* Content Top: Header & Status */}
            <div className="space-y-4 relative z-10" id={`cert-top-content-${cred.id}`}>
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm">
                  {cred.type}
                </span>
                <span className="font-mono text-[9px] text-neutral-500 flex items-center gap-1.5">
                  <CheckCircle2 size={10} className="text-emerald-500 animate-pulse" />
                  LIC: {cred.licenseId}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-white transition-colors">
                  {cred.title}
                </h3>
                <p className="font-display text-xs text-neutral-400 font-medium">
                  Issued by {cred.issuer}
                </p>
              </div>
            </div>

            {/* Content Middle: Technical Focus Grid / Badges */}
            <div className="my-6 space-y-3 relative z-10" id={`cert-mid-content-${cred.id}`}>
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-1.5">
                Acquired Proficiencies
              </div>
              <div className="flex flex-wrap gap-2">
                {cred.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="font-mono text-[10px] text-neutral-300 bg-white/[0.02] border border-white/5 px-2 py-1 hover:border-white/20 transition-all duration-300 rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Bottom: Call-To-Action verification button style */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto relative z-10" id={`cert-bottom-content-${cred.id}`}>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                {cred.date}
              </span>

              <a
                href="#contact-section"
                className="flex items-center gap-2 text-white hover:text-neutral-300 font-mono text-[10px] uppercase tracking-wider group/link transition-colors cursor-pointer"
              >
                <span>Request Verification</span>
                <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center bg-black/40 group-hover/link:bg-white group-hover/link:text-black transition-all">
                  <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </motion.div>
        ))}

        {/* Extra credentials rendered with Framer Motion when expanded */}
        <AnimatePresence>
          {showAll && extraCredentials.map((cred, idx) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
              className={`relative flex flex-col justify-between border border-white/5 bg-gradient-to-br ${cred.color} p-6 md:p-8 hover:bg-neutral-900/40 group transition-all duration-300 overflow-hidden`}
              id={`cert-card-${cred.id}`}
            >
              <div className="absolute top-4 right-4 text-neutral-700/30 group-hover:text-neutral-500/20 font-mono text-7xl font-bold select-none transition-colors duration-500">
                {cred.number}
              </div>

              <div className="space-y-4 relative z-10" id={`cert-top-content-${cred.id}`}>
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm">
                    {cred.type}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 flex items-center gap-1.5">
                    <CheckCircle2 size={10} className="text-emerald-500 animate-pulse" />
                    LIC: {cred.licenseId}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-white transition-colors">
                    {cred.title}
                  </h3>
                  <p className="font-display text-xs text-neutral-400 font-medium">
                    Issued by {cred.issuer}
                  </p>
                </div>
              </div>

              <div className="my-6 space-y-3 relative z-10" id={`cert-mid-content-${cred.id}`}>
                <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-1.5">
                  Acquired Proficiencies
                </div>
                <div className="flex flex-wrap gap-2">
                  {cred.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="font-mono text-[10px] text-neutral-300 bg-white/[0.02] border border-white/5 px-2 py-1 hover:border-white/20 transition-all duration-300 rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto relative z-10" id={`cert-bottom-content-${cred.id}`}>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                  {cred.date}
                </span>

                <a
                  href="#contact-section"
                  className="flex items-center gap-2 text-white hover:text-neutral-300 font-mono text-[10px] uppercase tracking-wider group/link transition-colors cursor-pointer"
                >
                  <span>Request Verification</span>
                  <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center bg-black/40 group-hover/link:bg-white group-hover/link:text-black transition-all">
                    <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Beautiful "See All" button trigger */}
      <div className="mt-12 flex justify-center" id="cert-see-all-container">
        <motion.button
          onClick={onOpenShowcase}
          whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-8 py-4 border border-white/10 bg-black hover:bg-neutral-900 transition-all duration-300 rounded-sm"
          id="cert-see-all-btn"
        >
          {/* Accent hover glow line at top */}
          <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>

          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white font-bold">
            SEE ALL CREDENTIALS
          </span>

          <span className="font-mono text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded-sm">
            +4 More
          </span>

          <motion.div
            className="text-neutral-400 group-hover:text-white transition-colors"
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative summary line */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center text-neutral-600 font-mono text-[9px] uppercase border-t border-white/5 pt-8 gap-4" id="cert-footer-meta">
        <div className="flex items-center gap-2">
          <Shield size={10} className="text-neutral-500" />
          <span>HIPAA & SOC-2 COMPLIANCE ENABLED</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-2">
          <Cpu size={10} className="text-neutral-500" />
          <span>SYSTEM-LEVEL AUTONOMY METRICS PROVEN</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-2">
          <Server size={10} className="text-neutral-500" />
          <span>DISTRIBUTED INFRASTRUCTURE VERIFIED</span>
        </div>
      </div>
    </section>
  );
}
