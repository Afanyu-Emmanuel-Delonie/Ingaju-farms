"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import BrandPattern from "@/components/shared/BrandPattern";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isFirebaseConfigured && !loading && user) router.replace("/portal");
  }, [user, loading, router]);

  function validate() {
    const e: typeof errors = {};
    if (!form.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setBusy(true);
    // Simulate network delay — replace with Firebase signInWithEmailAndPassword later
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 600));
    router.replace("/portal");
  };

  const handleGoogle = async () => {
    setGoogleBusy(true);
    setErrors({});
    try {
      await signInWithGoogle();
      router.replace("/portal");
    } catch {
      setErrors({ general: "Google sign-in failed. Please try again." });
    } finally {
      setGoogleBusy(false);
    }
  };

  const isBusy = busy || googleBusy;

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-body font-medium text-[#6B6259] hover:text-[#1C2321] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl bg-[#1C2321] p-8 sm:p-10 shadow-2xl">
          <BrandPattern />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-9 h-9">
                <Image src="/images/brand/Logo.png" alt="Ingaju Farms" fill className="object-contain rounded-full" />
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

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-body font-semibold uppercase tracking-widest text-white/40">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                  placeholder="you@ingajufarms.com"
                  disabled={isBusy}
                  className={`rounded-xl bg-white/5 border px-4 py-3 text-sm font-body text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-50 ${errors.email ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-[#3A7D5A]"}`}
                />
                {errors.email && <p className="text-[11px] font-body text-red-400">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-body font-semibold uppercase tracking-widest text-white/40">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((er) => ({ ...er, password: undefined })); }}
                    placeholder="••••••••"
                    disabled={isBusy}
                    className={`w-full rounded-xl bg-white/5 border px-4 py-3 pr-11 text-sm font-body text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-50 ${errors.password ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-[#3A7D5A]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] font-body text-red-400">{errors.password}</p>}
              </div>

              {/* General error */}
              {errors.general && (
                <div className="rounded-xl bg-red-400/10 border border-red-400/20 px-4 py-3">
                  <p className="text-xs font-body text-red-400">{errors.general}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isBusy}
                className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-5 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {busy ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Signing in...
                  </>
                ) : success ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    Redirecting...
                  </>
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-body text-white/25 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={isBusy}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-[#1C2321] font-body font-semibold text-sm rounded-xl px-5 py-3.5 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleBusy ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#3A7D5A] border-t-transparent animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {googleBusy ? "Signing in..." : "Continue with Google"}
            </button>

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
