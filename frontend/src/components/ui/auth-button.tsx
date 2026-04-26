"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

interface AuthButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "logout";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function AuthButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: AuthButtonProps) {
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAuth = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (variant === "logout") {
      signOut();
    } else if (!session) {
      signIn("google");
    }
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      className="relative z-10"
    >
      <button
        type={type}
        onClick={handleAuth}
        className={cn(
          "relative flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 group overflow-hidden",
          variant === "primary" 
            ? "text-white" 
            : "text-slate-300 hover:text-white border border-white/10 bg-white/5 backdrop-blur-md",
          variant === "logout" && "text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/40",
          className
        )}
      >
        {/* Shimmer Effect for Primary */}
        {variant === "primary" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] via-[#00E5FF] to-[#0054A6] transition-all duration-500 group-hover:scale-105" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              animate={isHovered ? {
                x: ["100%", "-100%"],
              } : {}}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
              style={{ width: "200%" }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#00AEEF]/40" />
          </>
        )}

        {/* Border Glow for Secondary/Logout */}
        {(variant === "secondary" || variant === "logout") && (
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full border shadow-[0_0_15px_rgba(0,174,239,0.3)]",
            variant === "logout" ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "border-[#00AEEF]/50 shadow-[0_0_15px_rgba(0,174,239,0.3)]"
          )} />
        )}

        <span className="relative z-20 flex items-center gap-2">
          {children}
        </span>
      </button>
    </motion.div>
  );

  // If href is provided and it's NOT an auth action, use Link
  if (href && !session && variant !== "logout") {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
