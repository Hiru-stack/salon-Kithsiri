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

// ─── WhatsApp CTA variant ─────────────────────────────────────────────────────
export function WhatsAppButton({ href, children = "Book on WhatsApp" }: { href: string; children?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MagneticWrapper strength={0.2}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-3 bg-neutral-900 text-white text-[11px] tracking-[0.35em] uppercase font-semibold px-10 py-4 overflow-hidden focus:outline-none"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
      >
        {/* Green sweep on hover */}
        <motion.span
          className="absolute inset-0 bg-[#25D366] pointer-events-none"
          initial={{ x: "-101%" }}
          animate={{ x: hovered ? "0%" : "-101%" }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.svg
          className="w-4 h-4 fill-current relative z-10 flex-shrink-0"
          viewBox="0 0 24 24"
          animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </motion.svg>

        <span className="relative z-10">{children}</span>
      </motion.a>
    </MagneticWrapper>
  );
}

// ─── Floating WhatsApp FAB ────────────────────────────────────────────────────
export function FloatingWhatsApp({ href }: { href: string }) {
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
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pulse w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        aria-label="Book on WhatsApp"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </motion.div>
  );
}
