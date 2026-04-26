"use client";

import { motion } from "framer-motion";
import { Tv, Share2, Award, Zap } from "lucide-react";

export default function UseCasesPage() {
  const cases = [
    {
      title: "Live Stream Enforcement",
      desc: "Instantly detect and block unauthorized restreaming of live matches on Twitch, YouTube, and specialized illegal streaming sites.",
      icon: Tv,
      benefit: "Prevents immediate revenue loss from premium pay-per-view events.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"
    },
    {
      title: "Social Media Monitoring",
      desc: "Track unauthorized highlights and viral clips across TikTok, X, and Instagram to ensure rights compliance and brand safety.",
      icon: Share2,
      benefit: "Controls viral content distribution and maintains exclusivity.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    },
    {
      title: "NFT & Digital Memorabilia",
      desc: "Verify the authenticity of digital sports assets and prevent fraudulent trading of unauthorized highlight NFTs.",
      icon: Award,
      benefit: "Protects the value of official digital collectibles.",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80"
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
          Real-World <span className="text-gradient">Defense</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          From live stadiums to digital collectibles, VaultVision provides a unified shield across every distribution channel.
        </p>
      </motion.div>

      <div className="space-y-24">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <c.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight">{c.title}</h2>
              <p className="text-lg text-slate-400 leading-relaxed">{c.desc}</p>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                <Zap className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-1">Key Benefit</p>
                  <p className="text-white font-medium">{c.benefit}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden glass-panel group">
                <img 
                  src={c.image} 
                  alt={c.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
                   <p className="text-white font-bold">Case Study Example</p>
                   <p className="text-xs text-slate-400">Deployed for 2024 International Championships</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
