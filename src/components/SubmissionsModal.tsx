import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, RefreshCw, FileSpreadsheet, Database, CheckCircle2, ShieldCheck } from "lucide-react";

interface Submission {
  id: string;
  timestamp: string;
  type: "Newsletter Subscriber" | "Consultation Inquiry";
  name: string;
  email: string;
  services: string;
  budget: string;
  idea: string;
  status: string;
}

interface SubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionsModal({ isOpen, onClose }: SubmissionsModalProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string>("https://sheets.google.com");
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      if (data.submissions) {
        setSubmissions(data.submissions);
        setTotalCount(data.total || data.submissions.length);
      }
      if (data.sheetUrl) {
        setSheetUrl(data.sheetUrl);
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubmissions();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="submissions-modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-neutral-950 border border-neutral-800 w-full max-w-4xl max-h-[85vh] flex flex-col rounded-xl shadow-2xl overflow-hidden font-mono"
            id="submissions-modal-container"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white tracking-wider uppercase font-display">Data Vault & Submissions</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-green-950 text-green-400 border border-green-800 font-bold">
                      Google Sheets Synced
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    "Chandru Dev - Subscriptions & Inquiries" spreadsheet records
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchSubmissions}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Refresh data"
                >
                  <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Sub-bar with Google Sheet actions */}
            <div className="px-6 py-3 bg-neutral-900/80 border-b border-neutral-800 flex flex-wrap justify-between items-center text-xs text-neutral-300 gap-3">
              <div className="flex items-center gap-2 text-neutral-400">
                <Database size={14} className="text-amber-400" />
                <span>Total Recorded Submissions: <strong className="text-white font-mono">{totalCount}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <FileSpreadsheet size={13} />
                  <span>Open in Google Sheets</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Google Drive</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Body Table / List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {submissions.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <ShieldCheck size={36} className="mx-auto text-neutral-600" />
                  <p className="text-neutral-400 text-sm">No submissions recorded in this session yet.</p>
                  <p className="text-neutral-500 text-xs">Use the Footer Newsletter form or Contact Consultation modal to submit new data.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub, idx) => (
                    <div
                      key={sub.id || idx}
                      className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-lg hover:border-neutral-700 transition-colors space-y-2"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-2 border-b border-neutral-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            sub.type === "Newsletter Subscriber"
                              ? "bg-blue-950 text-blue-400 border border-blue-800"
                              : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          }`}>
                            {sub.type}
                          </span>
                          <span className="text-white font-bold text-sm font-display">{sub.name}</span>
                          <span className="text-neutral-400 text-xs">&lt;{sub.email}&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span>{new Date(sub.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                        <div>
                          <span className="text-neutral-500 uppercase text-[10px] block font-semibold">Services Requested</span>
                          <span>{sub.services || "-"}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase text-[10px] block font-semibold">Budget Tier</span>
                          <span className="text-amber-400 font-bold">{sub.budget || "-"}</span>
                        </div>
                      </div>

                      {sub.idea && (
                        <div className="text-xs bg-neutral-950 p-2.5 rounded border border-neutral-900 text-neutral-300 leading-relaxed mt-1">
                          <span className="text-neutral-500 uppercase text-[9px] block font-bold mb-1">[ Submission Notes / Idea ]</span>
                          {sub.idea}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 flex justify-between items-center text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Google Drive OAuth Active for chandrupalanisamyaids@gmail.com</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Vault
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
