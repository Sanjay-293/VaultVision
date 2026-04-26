"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Globe, Shield } from "lucide-react";

export default function ImpactPage() {
  const stats = [
    { label: "Revenue Lost Annually", value: "$28B+", icon: DollarSign, color: "text-rose-500" },
    { label: "Pirated Streams Detected", value: "450k+", icon: TrendingUp, color: "text-blue-500" },
    { label: "Global Reach", value: "190+ Countries", icon: Globe, color: "text-emerald-500" },
    { label: "Asset Protection Rate", value: "99.9%", icon: Shield, color: "text-primary" },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight sm:text-7xl">
          The <span className="text-gradient">Impact</span> of Piracy
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Unlicensed sports media distribution isn't just a copyright issue—it's a multi-billion dollar threat to the sports ecosystem. VaultVision recovers that value.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 text-center hover:border-primary/50 transition-all group"
          >
            <div className={`mx-auto w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="glass-panel p-10 border-l-4 border-l-primary">
            <h3 className="text-2xl font-bold text-white mb-4">Protecting the Fan Experience</h3>
            <p className="text-slate-400 leading-relaxed">
              Pirated streams often host malicious content, scams, and low-quality feeds that damage the league's brand. By redirecting fans to official platforms, we ensure a premium experience.
            </p>
          </div>
          <div className="glass-panel p-10 border-l-4 border-l-emerald-500">
            <h3 className="text-2xl font-bold text-white mb-4">Empowering Rights Holders</h3>
            <p className="text-slate-400 leading-relaxed">
              We provide sports organizations with the evidence they need to take decisive legal action, converting piracy from a "cost of doing business" into an actionable enforcement pipeline.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden glass-panel border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80" 
            alt="Stadium Analytics" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
             <div className="text-center p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                <p className="text-primary font-black text-6xl mb-2">91%</p>
                <p className="text-white font-bold uppercase tracking-widest text-sm">Revenue Recovery Rate</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
