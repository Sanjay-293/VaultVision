"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, ShieldCheck, Search, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DemoGuide() {
  const demoSteps = [
    {
      title: "1. Secure Official Assets",
      desc: "Go to the Registry and upload your official media. Our AI extracts a semantic signature to secure it in the Vault.",
      icon: ShieldCheck,
      action: "Open Registry",
      link: "/registry"
    },
    {
      title: "2. Test AI Detection",
      desc: "Upload a modified or cropped version of the same asset in the Detector. Watch the AI find the match instantly.",
      icon: Search,
      action: "Test Detector",
      link: "/detector"
    },
    {
      title: "3. Generate Legal Evidence",
      desc: "Review the Gemini-generated analysis and download your professional forensic PDF report for enforcement.",
      icon: FileDown,
      action: "View Dashboard",
      link: "/dashboard/hub"
    }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">How to Proceed with the Flow</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Follow these three steps to experience the full power of VaultVision's AI protection pipeline.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 flex flex-col items-center text-center group"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">{step.desc}</p>
              
              <Button asChild variant="outline" className="mt-auto border-primary/20 hover:border-primary/50 text-xs uppercase tracking-widest font-bold">
                <Link href={step.link}>
                  {step.action} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <Play className="w-8 h-8 text-primary fill-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Ready for the 2026 Solution Challenge</h3>
              <p className="text-slate-400 text-sm">Experience the end-to-end flow from asset registration to forensic enforcement.</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-6 text-lg font-bold shadow-lg shadow-primary/20">
            <Link href="/dashboard/hub">Launch Command Center</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
