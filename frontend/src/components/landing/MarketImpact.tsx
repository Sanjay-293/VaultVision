"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Shield } from "lucide-react";

export function MarketImpact() {
  return (
    <section id="impact" className="relative py-24 bg-transparent">

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="glass-panel p-12 border-primary/20 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                The <span className="text-gradient">$28.3 Billion</span> Piracy Problem
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                According to a comprehensive study by <span className="text-white font-semibold italic">Synamedia & Ampere Analysis</span>, the global sports industry loses billions every year to unauthorized streaming and media distribution. 
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Recoupable Revenue</h3>
                    <p className="text-slate-400">VaultVision converts illegal viewers into legitimate subscribers by securing official assets.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">UN SDG Alignment</h3>
                    <p className="text-slate-400">Directly supporting SDG 9 (Innovation & Infrastructure) by protecting digital intellectual property.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="text-[12rem] font-black text-white/5 absolute -top-24 -left-12 pointer-events-none">
                  28.3
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-black p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 text-center min-w-[300px]">
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <div className="text-5xl font-extrabold text-white mb-2">$28.3B</div>
                  <div className="text-slate-500 uppercase tracking-widest text-sm font-bold">Annual Global Loss</div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-xs text-slate-500 italic">Verified by Industry Leaders</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
