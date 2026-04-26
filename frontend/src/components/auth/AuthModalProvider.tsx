"use client";

import React, { createContext, useContext, useState } from "react";
import { AuthModal } from "./AuthModal";

interface AuthModalContextType {
  openSignIn: () => void;
  openSignUp: () => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const openSignIn = () => {
    setMode("signin");
    setIsOpen(true);
  };

  const openSignUp = () => {
    setMode("signup");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ openSignIn, openSignUp, closeModal }}>
      {children}
      <AuthModal isOpen={isOpen} onClose={closeModal} initialMode={mode} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
