"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type ButtonVariant = "fill" | "outline" | "ghost" | "light";

interface LuxButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconAfter?: boolean;
  magnetic?: boolean;
  as?: "a" | "button";
  onClick?: () => void;
}

// ─── Magnetic wrapper ─────────────────────────────────────────────────────────
function MagneticWrapper({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset} style={{ x: springX, y: springY }} className="inline-block">
      {children}
    </motion.div>
  );
}

// ─── Main LuxButton ───────────────────────────────────────────────────────────
export function LuxButton({
  children,
  variant = "fill",
  icon,
  iconAfter = true,
  magnetic = false,
  href,
  className = "",
  ...props
}: LuxButtonProps) {
  const [hovered, setHovered] = useState(false);

  const baseClass = `
    relative inline-flex items-center justify-center gap-3 overflow-hidden
    text-[11px] tracking-[0.35em] uppercase font-semibold font-sans
    px-9 py-4 transition-colors duration-300 focus:outline-none
    select-none cursor-pointer whitespace-nowrap
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    fill: "bg-neutral-900 text-white hover:bg-neutral-700",
    outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
    ghost: "text-neutral-900 hover:text-neutral-500",
    light: "bg-white text-neutral-900 hover:bg-neutral-50",
  };

  const inner = (
    <a
      href={href}
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {/* Sweep fill overlay */}
      <motion.span
        className="absolute inset-0 bg-white/10 pointer-events-none"
        initial={{ x: "-101%" }}
        animate={{ x: hovered ? "0%" : "-101%" }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Icon before */}
      {icon && !iconAfter && (
        <motion.span animate={{ x: hovered ? -2 : 0 }} transition={{ duration: 0.3 }}>
          {icon}
        </motion.span>
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Icon after */}
      {icon && iconAfter && (
        <motion.span
          className="relative z-10"
          animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
      )}
    </a>
  );

  return magnetic ? <MagneticWrapper>{inner}</MagneticWrapper> : inner;
}

// ─── Book CTA variant ─────────────────────────────────────────────────────
export function BookButton({ href, children = "Book Appointment" }: { href: string; children?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MagneticWrapper strength={0.2}>
      <motion.a
        href={href}
        className="relative inline-flex items-center gap-3 bg-neutral-900 text-white text-[11px] tracking-[0.35em] uppercase font-semibold px-10 py-4 overflow-hidden focus:outline-none"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
      >
        {/* Sweep on hover */}
        <motion.span
          className="absolute inset-0 bg-neutral-700 pointer-events-none"
          initial={{ x: "-101%" }}
          animate={{ x: hovered ? "0%" : "-101%" }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.svg
          className="w-4 h-4 text-white relative z-10 flex-shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </motion.svg>

        <span className="relative z-10">{children}</span>
      </motion.a>
    </MagneticWrapper>
  );
}

// ─── Floating Book FAB ────────────────────────────────────────────────────
export function FloatingBookButton({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Tooltip label */}
      <motion.span
        className="bg-neutral-900 text-white text-[10px] tracking-widest uppercase px-4 py-2.5 font-semibold pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
        transition={{ duration: 0.25 }}
      >
        Book Now
      </motion.span>

      {/* FAB */}
      <motion.a
        href={href}
        className="wa-pulse w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg border border-neutral-700"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        aria-label="Book Appointment"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
