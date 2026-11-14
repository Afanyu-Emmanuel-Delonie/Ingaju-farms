import React from "react";
import { Recycle, Wheat, ShoppingCart, GraduationCap, type LucideProps } from "lucide-react";

export type IconComponent = (p: { className?: string }) => React.ReactElement;

export function wrap(C: React.ComponentType<LucideProps>): IconComponent {
  function Wrapped({ className }: { className?: string }) {
    return <C {...({ className } as LucideProps)} />;
  }
  Wrapped.displayName = `Wrapped(${C.displayName ?? "Icon"})`;
  return Wrapped;
}

export function CropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 3 5c0 5 3 8 9 7" />
      <path d="M12 12c0-5 5-8 9-7-1 5-4 8-9 7" />
      <path d="M6 17c1.5 1.5 3.5 2.5 6 2.5s4.5-1 6-2.5" />
    </svg>
  );
}

export function CowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8c0-1.5 1-3 3-3h10c2 0 3 1.5 3 3v2c0 3-2 5-5 5H9c-3 0-5-2-5-5V8z" />
      <path d="M9 15v4" />
      <path d="M15 15v4" />
      <path d="M7 5L5 3" />
      <path d="M17 5l2-2" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <path d="M10 12.5c.5.5 1 .8 2 .8s1.5-.3 2-.8" />
    </svg>
  );
}

export const STAGE_ICONS: Record<string, IconComponent> = {
  soil: CropIcon,
  livestock: CowIcon,
  manure: wrap(Recycle),
  resources: wrap(Wheat),
  processing: wrap(ShoppingCart),
  learning: wrap(GraduationCap),
};
