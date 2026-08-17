"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/blog", label: "Blog Posts" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isFirebaseConfigured) return; // skip auth guard until Firebase is added
    if (!loading && !user && pathname !== "/portal/login") router.replace("/portal/login");
  }, [user, loading, router, pathname]);

  if (isFirebaseConfigured && (loading || (!user && pathname !== "/portal/login"))) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#3A7D5A] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (pathname === "/portal/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col">
      {/* Portal top bar */}
      <header className="w-full bg-[#1C2321] border-b border-white/5">
        <div className="container-pad mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <Image src="/images/brand/Logo.png" alt="Ingaju Farms" fill className="object-contain" />
            </div>
            <span className="text-white font-heading font-bold text-sm tracking-wide">Ingaju Portal</span>
            <span className="hidden sm:block text-white/20 text-xs ml-1">/ Operations</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/portal" ? pathname === "/portal" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-xs font-body font-semibold transition-colors ${
                    active ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {user?.photoURL && (
                <Image
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  width={30}
                  height={30}
                  className="rounded-full border border-white/20"
                />
              )}
              <span className="hidden sm:block text-xs font-body text-white/60">{user?.displayName ?? user?.email ?? "Admin"}</span>
            </div>
            <button
              onClick={signOut}
              className="text-xs font-body font-semibold text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav className="flex md:hidden items-center gap-1 container-pad mx-auto pb-3 -mt-1">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/portal" ? pathname === "/portal" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-body font-semibold transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
