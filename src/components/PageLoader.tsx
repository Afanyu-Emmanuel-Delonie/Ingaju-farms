"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image src="/images/brand/Logo.png" alt="Ingaju Farms" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-bold text-[#1C2321]">
                Ingaju <span className="text-[#D07A53]">Farms</span>
              </span>
              <span className="mt-1 text-[10px] font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">
                Organic & Circular
              </span>
            </div>

            {/* Loading bar */}
            <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-[#1C2321]/10">
              <motion.div
                className="h-full bg-[#3A7D5A]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
