"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/LuxButton";
import { getWhatsAppBookingLink } from "@/lib/whatsapp";

/* ── Floating Particle ─────────────────────────────────────────────────── */
function Particle({ i }: { i: number }) {
  const x = 5 + ((i * 137.5) % 90); // pseudo-random spread
  const delay = (i * 0.37) % 4;
  const size = 1 + (i % 3);
  const duration = 8 + (i % 6);
  return (
    <motion.div
      className="absolute rounded-full bg-white/30 pointer-events-none"
      style={{ left: `${x}%`, bottom: "-10px", width: size, height: size }}
      animate={{ y: [0, -(420 + (i % 200))], opacity: [0, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* ── Split-character animated heading ─────────────────────────────────── */
function AnimatedTitle({
  text,
  delay = 0,
  italic = false,
  className = "",
}: {
  text: string;
  delay?: number;
  italic?: boolean;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${char === " " ? "w-[0.28em]" : ""}`}
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: delay + i * 0.028,
            duration: 0.65,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Stat counter item ─────────────────────────────────────────────────── */
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
    >
      <span className="font-serif text-3xl sm:text-4xl font-light text-white">{value}</span>
      <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/45 font-medium mt-1">{label}</span>
    </motion.div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "25%"]);
  const contentY = useTransform(scrollY, [0, 600], ["0%", "18%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Rotating tagline words
  const taglines = ["Artistry.", "Excellence.", "Beauty.", "Luxury."];
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((s) => (s + 1) % taglines.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Video sources — free Mixkit salon stock videos
  const videos = [
    "https://assets.mixkit.co/videos/preview/mixkit-woman-having-her-hair-cut-at-a-salon-17849-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-getting-a-manicure-43025-large.mp4",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* ── Video Background ──────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Fallback background image — visible while video loads */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1800&q=85')" }}
        />

        <video
          ref={videoRef}
          src={videos[0]}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />

        {/* Film-grain scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)`,
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* ── Fade-in after video loads ──────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-black z-5 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: videoLoaded ? 0 : 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* ── Floating Particles ────────────────────────────── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>

      {/* ── Glowing orbs ─────────────────────────────────── */}
      <motion.div
        className="absolute z-5 pointer-events-none"
        style={{ top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute z-5 pointer-events-none"
        style={{ bottom: "15%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-4 max-w-6xl mx-auto"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          <motion.span
            className="w-12 h-px bg-white/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <span className="font-sans text-[10px] tracking-[0.65em] uppercase text-white/55 font-light">
            Premium Salon Experience
          </span>
          <motion.span
            className="w-12 h-px bg-white/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Main heading — character split */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light text-white leading-[1.05] tracking-tight mb-2">
          <div className="overflow-hidden">
            <AnimatedTitle text="Where Craftsmanship" delay={0.7} />
          </div>
          <div className="overflow-hidden flex items-center justify-center gap-4 mt-1">
            <AnimatedTitle text="Meets" delay={1.15} italic />
            <span className="inline-block min-w-[240px] sm:min-w-[320px] text-left overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  className="font-serif italic text-white/80 inline-block"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {taglines[currentSlide]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </h1>

        {/* Sub */}
        <motion.p
          className="font-sans text-sm sm:text-base text-white/65 font-light max-w-xl leading-relaxed mt-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
        >
          Relax. Refresh. Reconnect. Experience the premier standard in modern hair artistry, skin care, and expert grooming.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <WhatsAppButton href={getWhatsAppBookingLink()} />
          <Link
            href="#services"
            className="underline-reveal font-sans text-[11px] tracking-[0.4em] uppercase font-medium text-white/65 hover:text-white transition-colors duration-300"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* ── Animated Stats Row ─────────────────────────── */}
        <motion.div
          className="flex items-center justify-center gap-12 sm:gap-20 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          <StatItem value="500+" label="Happy Clients" delay={2.2} />
          <div className="w-px h-10 bg-white/15" />
          <StatItem value="15yrs" label="Experience" delay={2.35} />
          <div className="w-px h-10 bg-white/15" />
          <StatItem value="4" label="Specialities" delay={2.5} />
          <div className="w-px h-10 bg-white/15 hidden sm:block" />
          <StatItem value="⭐ 4.9" label="Rating" delay={2.65} />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-white/30">Scroll</span>
        <div className="relative w-px h-12 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white/60"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "40%" }}
          />
        </div>
      </motion.div>

      {/* ── Corner decorative lines ───────────────────────── */}
      <motion.div
        className="absolute top-6 left-6 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="w-10 h-px bg-white/25" />
        <div className="w-px h-10 bg-white/25 mt-0" />
      </motion.div>
      <motion.div
        className="absolute top-6 right-6 z-20 pointer-events-none flex flex-col items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="w-10 h-px bg-white/25" />
        <div className="w-px h-10 bg-white/25" />
      </motion.div>
    </section>
  );
}
