"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ModalVariant = "order" | "tour" | "training";

export interface ModalConfig {
  variant: ModalVariant;
  product?: string;   // pre-fills product/program name
  unit?: string;      // e.g. "liters", "kg", "head"
}

interface ModalCtx {
  open: (config: ModalConfig) => void;
  close: () => void;
  config: ModalConfig | null;
  isOpen: boolean;
}

const Ctx = createContext<ModalCtx | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ModalConfig | null>(null);

  return (
    <Ctx.Provider value={{
      config,
      isOpen: config !== null,
      open: (c) => setConfig(c),
      close: () => setConfig(null),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
