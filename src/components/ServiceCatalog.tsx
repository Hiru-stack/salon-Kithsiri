"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { getWhatsAppBookingLink } from "@/lib/whatsapp";

type Service = {
  id: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
  image: string;
};

type Category = {
  key: string;
  label: string;
  tagline: string;
  heroImage: string;
  services: Service[];
};

const categories: Category[] = [
  {
    key: "hair",
    label: "Hair Artistry",
    tagline: "Precision cuts & colour crafted to perfection.",
    heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=85",
    services: [
      { id: "h1", title: "Signature Cut & Style", duration: "60 min", price: "Rs. 12,500", desc: "A precision haircut tailored to your unique features, followed by a professional, high-volume blowout.", featured: true, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80" },
      { id: "h2", title: "Balayage & Colour Melt", duration: "180 min", price: "Rs. 35,000+", desc: "Seamless, hand-painted highlights customized to deliver a natural, sun-kissed, multi-toned finish.", featured: true, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80" },
      { id: "h3", title: "Smoothing & Straightening", duration: "150 min", price: "Rs. 28,000", desc: "An advanced treatment designed to eliminate frizz, restore deep hair health, and deliver a sleek, mirror-like shine.", image: "https://images.unsplash.com/photo-1522337913774-e6c8f69f4fcd?w=500&q=80" },
    ],
  },
  {
    key: "nails",
    label: "Nail Therapy",
    tagline: "Elegant nail treatments for hands that speak.",
    heroImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=85",
    services: [
      { id: "n1", title: "Bespoke Gel Manicure", duration: "45 min", price: "Rs. 6,500", desc: "Precise cuticle care, deep hydration, and a flawless long-lasting gel finish.", featured: true, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80" },
      { id: "n2", title: "Intense Hydration Pedicure", duration: "60 min", price: "Rs. 8,500", desc: "Soothing foot soak, exfoliating scrub, and a tension-relieving massage with precision nail shaping.", image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=500&q=80" },
      { id: "n3", title: "Luxury Express Nail Refinement", duration: "30 min", price: "Rs. 4,500", desc: "A quick, clean refresh — nail shaping, cuticle cleanup, and a classic polish application.", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80" },
    ],
  },
  {
    key: "skin",
    label: "Dermal & Skin",
    tagline: "Restorative skin rituals for a luminous glow.",
    heroImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85",
    services: [
      { id: "s1", title: "Radiance Renewal Facial", duration: "60 min", price: "Rs. 18,000", desc: "A customized botanical treatment to deeply cleanse, exfoliate, and restore your skin's natural, luminous glow.", featured: true, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80" },
      { id: "s2", title: "Elite Brow Design", duration: "45 min", price: "Rs. 7,500", desc: "Precision brow mapping, expert shaping, and tinting to create perfectly symmetrical, naturally fuller brows.", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80" },
    ],
  },
  {
    key: "grooming",
    label: "Grooming",
    tagline: "Sharp, refined grooming for the modern gentleman.",
    heroImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=85",
    services: [
      { id: "g1", title: "Executive Grooming", duration: "45 min", price: "Rs. 8,500", desc: "Classic cut, hot towel treatment, and precision beard trim — the complete grooming session.", featured: true, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80" },
      { id: "g2", title: "Express Beard Sculpt", duration: "20 min", price: "Rs. 4,000", desc: "Quick, precise beard maintenance and crisp line-up to keep you looking sharp between appointments.", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80" },
    ],
  },
];

/* ── Service Row Item (left-side list) ─────────────────────────────── */
function ServiceRow({
  service,
  index,
  isActive,
  onHover,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.a
      href={getWhatsAppBookingLink(service.title)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group flex items-start gap-5 py-7 px-6 border-b border-neutral-100 cursor-pointer transition-colors duration-300 ${isActive ? "bg-neutral-900" : "hover:bg-neutral-50"}`}
    >
      {/* Number */}
      <span className={`font-sans text-[11px] tracking-widest pt-0.5 flex-shrink-0 font-semibold transition-colors duration-300 ${isActive ? "text-white/40" : "text-neutral-300"}`}>
        0{index + 1}
      </span>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <h3 className={`font-serif text-xl font-medium leading-snug transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-900"}`}>
            {service.title}
            {service.featured && (
              <span className={`ml-3 font-sans text-[9px] tracking-[0.35em] uppercase font-semibold ${isActive ? "text-white/50" : "text-neutral-400"}`}>
                Featured
              </span>
            )}
          </h3>
          <span className={`font-sans text-sm font-semibold flex-shrink-0 pt-0.5 transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-900"}`}>
            {service.price}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className={`font-sans text-[11px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${isActive ? "text-white/50" : "text-neutral-400"}`}>
            {service.duration}
          </p>
          {/* Arrow */}
          <motion.span
            className={`font-sans text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-1.5 transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-300 group-hover:text-neutral-900"}`}
            animate={{ x: isActive ? 4 : 0 }}
            transition={{ duration: 0.25 }}
          >
            Book
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

/* ── Main ServiceCatalog ───────────────────────────────────────────── */
export default function ServiceCatalog() {
  const [activeCategory, setActiveCategory] = useState("hair");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const current = categories.find((c) => c.key === activeCategory)!;

  // The image to show on the right panel
  const displayImage = hoveredService
    ? (current.services.find((s) => s.id === hoveredService)?.image ?? current.heroImage)
    : current.heroImage;

  // Section header animation
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const headerControls = useAnimation();
  useEffect(() => { if (headerInView) headerControls.start("visible"); }, [headerInView, headerControls]);

  return (
    <section id="services" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <motion.p
              initial="hidden" animate={headerControls}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
              className="font-sans text-[10px] tracking-[0.5em] uppercase text-neutral-400 font-medium"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial="hidden" animate={headerControls}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } } }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-neutral-900"
            >
              Our Services
            </motion.h2>
          </div>
          <motion.p
            initial="hidden" animate={headerControls}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.3 } } }}
            className="font-sans text-neutral-500 max-w-xs text-sm leading-relaxed md:text-right"
          >
            Every treatment is a signature experience, curated by masters of their craft.
          </motion.p>
        </div>

        {/* ── Category Tabs ──────────────────────────────────────── */}
        <div className="flex gap-0 border-b border-neutral-200 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setHoveredService(null); }}
              className={`relative flex-shrink-0 pb-4 px-5 sm:px-8 font-sans text-[11px] sm:text-xs tracking-widest uppercase font-medium transition-colors duration-300 focus:outline-none ${
                activeCategory === cat.key ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <motion.span
                  layoutId="serviceTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900"
                  transition={{ type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Editorial Split Layout ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px] border border-neutral-100 shadow-sm"
          >
            {/* Left — Service list */}
            <div className="flex flex-col divide-y divide-neutral-100 bg-white">
              {/* Category tagline */}
              <div className="px-6 py-5 bg-white border-b border-neutral-100">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-lg italic text-neutral-500 font-light"
                >
                  &ldquo;{current.tagline}&rdquo;
                </motion.p>
              </div>

              {current.services.map((svc, idx) => (
                <ServiceRow
                  key={svc.id}
                  service={svc}
                  index={idx}
                  isActive={hoveredService === svc.id}
                  onHover={setHoveredService}
                />
              ))}

              {/* CTA at bottom */}
              <div className="mt-auto px-6 py-5 bg-neutral-50 border-t border-neutral-100">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.35em] uppercase font-semibold text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                >
                  <span className="w-8 h-px bg-neutral-300 group-hover:w-12 group-hover:bg-neutral-900 transition-all duration-400" />
                  Not sure? Chat with us
                </a>
              </div>
            </div>

            {/* Right — Dynamic image panel */}
            <div className="relative hidden lg:block overflow-hidden bg-neutral-100 min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Image
                    src={displayImage}
                    alt="Service preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Subtle dark gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating service count */}
              <div className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-sm px-4 py-2">
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-medium">
                  {current.services.length} Services
                </p>
              </div>

              {/* Hover instruction */}
              <motion.div
                className="absolute bottom-5 left-5 z-10"
                animate={{ opacity: hoveredService ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/70 font-medium">
                  Hover a service to preview
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
