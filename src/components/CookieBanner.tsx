import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CookieBannerProps {
  onOpenCookiePolicy: () => void;
}

export default function CookieBanner({ onOpenCookiePolicy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if consent has already been given or declined
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-5 z-[100] flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-600/10 rounded-xl text-red-500 border border-red-500/10 shadow-[0_0_8px_rgba(220,38,38,0.15)]">
                <Cookie className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-sans font-bold text-white tracking-wide">
                Informativa sui Cookie
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Chiudi informativa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Text */}
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Questo sito utilizza cookie tecnici e analitici per garantire la migliore esperienza di navigazione ed offrirti servizi in linea con le tue preferenze. Continuando a navigare accetti l'utilizzo dei cookie. Puoi consultare i dettagli completi nella nostra{" "}
            <button
              onClick={onOpenCookiePolicy}
              className="text-red-500 hover:text-red-400 font-medium underline focus:outline-none"
            >
              Cookie Policy
            </button>
            .
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-1 border-t border-neutral-800/50">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all"
            >
              Rifiuta
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-all keep-white"
            >
              Accetta Tutti
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
