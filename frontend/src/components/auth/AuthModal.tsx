"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ShieldCheck, Globe, ChevronRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Mouse follow effect for the glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!modalRef.current) return;
      const rect = modalRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", { mode, email, password });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pt-[10vh] pointer-events-none">
            <motion.div
              ref={modalRef}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 350,
                layout: { duration: 0.3, ease: "easeOut" } 
              }}
              className="relative w-full max-w-md pointer-events-auto perspective-1000"
            >
              {/* Premium Glow Effect that follows mouse */}
              <div 
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rounded-2xl blur-2xl opacity-0 transition-opacity duration-500"
                style={{
                  opacity: 0.4,
                  background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 174, 239, 0.4), transparent)`,
                }}
              ></div>

              <div className="relative bg-[#0a051d]/85 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                
                {/* Decorative top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-all rounded-full hover:bg-white/5 z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8 pt-6">
                  {/* Logo with floating animation */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-cyan-500/15 rounded-full blur-xl animate-pulse" />
                      <div className="relative h-14 w-14 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl rotate-2 overflow-hidden p-2">
                        <img src="/logo.png" alt="VaultVision Logo" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                      {mode === "signin" ? "Welcome Back" : "Protect Your Assets"}
                    </h2>
                    <p className="text-slate-400 text-xs font-medium">
                      {mode === "signin" 
                        ? "Enter your credentials to access your dashboard" 
                        : "Join the elite sports organizations using VaultVision"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {mode === "signup" && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                              <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all text-sm"
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Work Email</label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@organization.com"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Password</label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2 mt-6 text-sm"
                    >
                      {mode === "signin" ? "Access Dashboard" : "Create Account"}
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>

                    <p className="text-center text-xs text-slate-500 pt-2">
                      {mode === "signin" ? "New to VaultVision?" : "Already have an account?"}{" "}
                      <button 
                        type="button"
                        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                        className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 decoration-cyan-400/30"
                      >
                        {mode === "signin" ? "Request Access" : "Sign In"}
                      </button>
                    </p>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-[0.3em] text-slate-600">
                        <span className="bg-[#0a051d] px-4">Enterprise Gateway</span>
                      </div>
                    </div>

                    <motion.button 
                      type="button"
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => signIn("google")}
                      className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-xl text-white transition-all text-sm font-semibold shadow-sm group"
                    >
                      <div className="bg-white p-1 rounded-sm mr-1">
                        <svg width="14" height="14" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                        </svg>
                      </div>
                      Continue with Google
                    </motion.button>
                  </form>

                  {/* Trust Badges */}
                  <div className="mt-10 flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span className="text-[8px] uppercase tracking-tighter font-bold text-white">SSL Encrypted</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Globe className="w-4 h-4 text-white" />
                      <span className="text-[8px] uppercase tracking-tighter font-bold text-white">Cloud Native</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Lock className="w-4 h-4 text-white" />
                      <span className="text-[8px] uppercase tracking-tighter font-bold text-white">GDPR Compliant</span>
                    </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </>
        )}
      </AnimatePresence>
    );
}
