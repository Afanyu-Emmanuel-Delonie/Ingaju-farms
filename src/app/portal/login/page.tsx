"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import BrandPattern from "@/components/shared/BrandPattern";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router  = useRouter();
  const [busy,  setBusy]  = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) router.replace("/portal");
  }, [user, loading, router]);

  const handleGoogle = async () => {
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
      router.replace("/portal");
    } catch {
      setError("Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1C2321] p-8 sm:p-10 shadow-2xl">
          <BrandPattern />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-9 h-9">
                <Image src="/images/brand/Logo.png" alt="Ingaju Farms" fill className="object-contain" />
              </div>
              <div>
                <p className="text-white font-heading font-bold text-base leading-tight">Ingaju Farms</p>
                <p className="text-[#6DBE8C] text-[10px] font-body font-semibold uppercase tracking-widest">Operations Portal</p>
              </div>
            </div>

            <h1 className="font-heading text-2xl font-bold text-white leading-snug mb-2">
              Sign in to continue
            </h1>
            <p className="text-sm font-body text-white/50 mb-8 leading-relaxed">
              Access is restricted to authorized Ingaju team members and partners.
            </p>

            {/* Google button */}
            <button
              onClick={handleGoogle}
              disabled={busy}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-[#1C2321] font-body font-semibold text-sm rounded-xl px-5 py-3.5 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#3A7D5A] border-t-transparent animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {busy ? "Signing in..." : "Continue with Google"}
            </button>

            {error && (
              <p className="mt-4 text-xs font-body text-red-400 text-center">{error}</p>
            )}

            <p className="mt-8 text-center text-[11px] font-body text-white/25 leading-relaxed">
              By signing in you agree to Ingaju Farms internal data policies.<br />
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-body text-[#6B6259]">
          Need access? Contact <span className="text-[#3A7D5A] font-semibold">hello@ingajufarms.com</span>
        </p>
      </div>
    </div>
  );
}
