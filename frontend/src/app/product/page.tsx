"use client";

import { motion } from "framer-motion";
import { Cpu, Brain, Layers, Zap, Search, ShieldCheck } from "lucide-react";

export default function ProductPage() {
  const features = [
    {
      title: "Hybrid AI Detection",
      desc: "Combines CLIP embeddings with traditional computer vision to detect edits, crops, and filters.",
      icon: Search,
      tech: "Vertex AI + CLIP"
    },
    {
      title: "Evidence Engine",
      desc: "Gemini 1.5 analyzes matches to generate legally-binding reports automatically.",
      icon: Brain,
      tech: "Gemini 1.5 Brain"
    },
    {
      title: "Risk Intelligence",
      desc: "Automated threat classification based on similarity, source, and temporal patterns.",
      icon: ShieldCheck,
      tech: "FastAPI Pipeline"
    },
    {
      title: "Scalable Vector Vault",
      desc: "Ultra-fast search across millions of assets using high-dimensional vector space.",
      icon: Layers,
      tech: "Qdrant + PostgreSQL"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight sm:text-7xl">
          The <span className="text-gradient">Engine</span> Behind the Vision
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          VaultVision is built on a high-performance, cloud-native stack designed to handle the massive throughput of global sports media.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        <div className="space-y-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative glass-panel p-10">
              <Cpu className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Cloud-Native Architecture</h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Leveraging Google Cloud's infrastructure for horizontal scalability. Our FastAPI backend handles thousands of concurrent analysis requests while our vector store ensures sub-second retrieval.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 hover:border-primary/30 transition-all"
              >
                <f.icon className="w-6 h-6 text-primary mb-4" />
                <h4 className="font-bold text-white mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 mb-4">{f.desc}</p>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                  {f.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-80 h-80 rounded-full border border-primary/20 flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full border-2 border-primary/40 border-dashed" />
            <div className="absolute w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,174,239,0.5)]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            
            {/* Satellite Icons */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-lg bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 text-center">
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.4em]">Proprietary AI Pipeline</p>
          </div>
        </div>
      </div>
    </div>
  );
}
