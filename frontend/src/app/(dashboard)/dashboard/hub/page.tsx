"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UploadCloud, Search, ShieldAlert, FileText, Zap, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const hubOptions = [
  {
    name: "Register Official Media",
    description: "Ingest your assets into the secure AI Vault to enable real-time tracking.",
    href: "/dashboard/upload",
    icon: UploadCloud,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20"
  },
  {
    name: "Real-Time AI Detection",
    description: "Upload suspect content to detect edits, crops, and unauthorized usage via Vertex AI.",
    href: "/dashboard/analyze",
    icon: Search,
    color: "from-purple-500 to-indigo-400",
    shadow: "shadow-purple-500/20"
  },
  {
    name: "Risk Intelligence History",
    description: "Review all flagged incidents and automated risk level assessments.",
    href: "/dashboard/detections",
    icon: ShieldAlert,
    color: "from-rose-500 to-orange-400",
    shadow: "shadow-rose-500/20"
  },
  {
    name: "Evidence Engine Reports",
    description: "Access Gemini-powered legal proof and professional infringement reports.",
    href: "/dashboard/reports",
    icon: FileText,
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20"
  }
];

export default function CommandCenterPage() {
  return (
    <div className="space-y-12 py-10">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20"
        >
          <Zap className="h-8 w-8 text-primary shadow-glow" />
        </motion.div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          VaultVision Command Center
        </h1>
        <p className="text-xl text-slate-400 font-medium">
          A unified pipeline for detection, verification, and actionable intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {hubOptions.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={option.href} className="group block h-full">
              <div className={`h-full glass-card p-8 border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center group-hover:${option.shadow} hover:shadow-2xl`}>
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {option.name}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {option.description}
                </p>
                
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-primary font-bold">
                  Open Module <ShieldCheck className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-slate-500 hover:text-white">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
