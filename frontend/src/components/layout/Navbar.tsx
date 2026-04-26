"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { AuthButton } from "@/components/ui/auth-button";
export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { openSignIn, openSignUp } = useAuthModal();
  const { data: session } = useSession();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 pointer-events-auto"
    >
      <div className="absolute inset-0 bg-[#0a051d]/60 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300" />
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto relative z-10" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-4 group">
            <div className="h-12 w-12 relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-primary/50 shadow-lg shadow-black/20">
              <img src="/logo.png" alt="VaultVision Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
        

        <div className="hidden lg:flex lg:gap-x-12">
          {pathname.startsWith("/dashboard") ? (
            // Centered Dashboard Nav (As requested)
            <>
              {[
                { name: 'Command Center', href: '/dashboard/hub' },
                { name: 'Register', href: '/dashboard/upload' },
                { name: 'Analyze', href: '/dashboard/analyze' },
                { name: 'Detections', href: '/dashboard/detections' },
                { name: 'Reports', href: '/dashboard/reports' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={item.href} className={`text-sm font-bold leading-6 transition-colors relative group ${
                    pathname === item.href ? 'text-primary' : 'text-slate-300 hover:text-white'
                  }`}>
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </>
          ) : (
            // Landing Page Nav
            ['Impact', 'Product', 'Use Cases'].map((item, i) => (

              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                {session.user?.image ? (
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full border border-primary/50" />
                ) : (
                  <User className="w-4 h-4 text-primary" />
                )}
                <span className="text-sm font-medium text-slate-300">{session.user?.name?.split(' ')[0]}</span>
              </div>
              <AuthButton variant="logout" className="px-6 py-2">
                Log Out
              </AuthButton>
            </>
          ) : (
            <>
              <AuthButton variant="secondary" onClick={openSignIn} className="px-6 py-2">
                Log In
              </AuthButton>
              <AuthButton variant="primary" onClick={openSignUp} className="px-6 py-2">
                Get Started
              </AuthButton>
            </>
          )}
        </div>
      </nav>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-[#0a051d]/95 backdrop-blur-xl border-b border-white/5 p-4 shadow-xl"
        >
          <div className="space-y-4">
            {['Impact', 'Product', 'Use Cases'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-base font-semibold text-slate-300 hover:text-white p-2">
                {item}
              </a>
            ))}
            <hr className="border-white/5" />
            <div className="flex flex-col gap-3 pt-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 p-2 text-slate-300">
                    {session.user?.image && (
                      <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="font-semibold">{session.user?.name}</span>
                  </div>
                  <AuthButton variant="logout" className="w-full">
                    Log Out
                  </AuthButton>
                </>
              ) : (
                <>
                  <AuthButton variant="secondary" onClick={openSignIn} className="w-full">
                    Log In
                  </AuthButton>
                  <AuthButton variant="primary" onClick={openSignUp} className="w-full">
                    Get Started
                  </AuthButton>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
