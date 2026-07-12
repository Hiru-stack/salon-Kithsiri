"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getWhatsAppBookingLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/LuxButton";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 7:00 PM" },
  { day: "Sunday", time: "10:00 AM – 5:00 PM" },
];

const contactInfo = [
  { label: "Location", value: "123 Luxury Lane, Colombo 03", icon: "📍" },
  { label: "Phone", value: "+94 123 456 789", icon: "📞" },
  { label: "Email", value: "hello@kithsirisalon.com", icon: "✉️" },
];

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px bg-white/15 w-full"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: "left" }}
    />
  );
}

export default function Footer() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-60px" });
  const leftControls = useAnimation();
  useEffect(() => { if (leftInView) leftControls.start("visible"); }, [leftInView, leftControls]);

  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-60px" });
  const rightControls = useAnimation();
  useEffect(() => { if (rightInView) rightControls.start("visible"); }, [rightInView, rightControls]);

  return (
    <footer id="contact">
      {/* ── Main Contact Section ───────────────────────────── */}
      <section className="bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Left — Quote + CTA */}
          <div ref={leftRef} className="flex flex-col justify-center py-20 pr-0 lg:pr-20 border-b lg:border-b-0 lg:border-r border-white/10">
            <motion.p
              initial="hidden" animate={leftControls}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}
              className="font-sans text-[10px] tracking-[0.5em] uppercase text-white/40 font-medium mb-5"
            >
              Ready to Begin?
            </motion.p>

            {/* Serif heading — line by line reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial="hidden" animate={leftControls}
                variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight"
              >
                Reserve Your
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial="hidden" animate={leftControls}
                variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.85, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-light italic text-white/70 leading-tight"
              >
                Experience.
              </motion.h2>
            </div>

            <motion.p
              initial="hidden" animate={leftControls}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.45 } } }}
              className="font-sans text-white/55 text-sm leading-relaxed max-w-sm mb-10"
            >
              Our team of expert artists is ready to craft your perfect look. Book instantly through WhatsApp — no queues, no hassle.
            </motion.p>

            <motion.div
              initial="hidden" animate={leftControls}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } } }}
            >
              <WhatsAppButton href={getWhatsAppBookingLink()} />
            </motion.div>

            {/* Decorative large serif watermark */}
            <div className="absolute opacity-[0.03] pointer-events-none select-none hidden lg:block" style={{ bottom: "10%", left: "-2%" }}>
              <span className="font-serif text-[180px] font-bold text-white leading-none">K</span>
            </div>
          </div>

          {/* Right — Contact info + Hours */}
          <div ref={rightRef} className="flex flex-col justify-center py-20 pl-0 lg:pl-20 space-y-10">

            {/* Contact info items */}
            <div className="space-y-0">
              <motion.p
                initial="hidden" animate={rightControls}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
                className="font-sans text-[10px] tracking-[0.45em] uppercase text-white/35 font-medium mb-5"
              >
                Find Us
              </motion.p>
              {contactInfo.map((item, i) => (
                <motion.div key={item.label}>
                  <AnimatedLine delay={0.1 + i * 0.08} />
                  <motion.div
                    initial="hidden" animate={rightControls}
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15 + i * 0.1 } } }}
                    className="flex items-center justify-between py-4 group cursor-default"
                  >
                    <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/35 font-medium">{item.label}</span>
                    <span className="font-sans text-sm text-white/80 font-light">{item.value}</span>
                  </motion.div>
                </motion.div>
              ))}
              <AnimatedLine delay={0.4} />
            </div>

            {/* Opening hours */}
            <div className="space-y-0">
              <motion.p
                initial="hidden" animate={rightControls}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.5 } } }}
                className="font-sans text-[10px] tracking-[0.45em] uppercase text-white/35 font-medium mb-5"
              >
                Opening Hours
              </motion.p>
              {hours.map((h, i) => (
                <motion.div
                  key={h.day}
                  initial="hidden" animate={rightControls}
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.55 + i * 0.09 } } }}
                  onMouseEnter={() => setHoveredDay(i)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex items-center justify-between py-3.5 border-b border-white/8 group cursor-default"
                >
                  <span className={`font-sans text-sm transition-colors duration-300 ${hoveredDay === i ? "text-white" : "text-white/60"}`}>
                    {h.day}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Live dot on current-ish day */}
                    {i === 0 && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <span className={`font-sans text-sm font-medium transition-colors duration-300 ${hoveredDay === i ? "text-white" : "text-white/50"}`}>
                      {h.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Nav / Bottom Bar ─────────────────────────── */}
      <div className="bg-black py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center sm:text-left">
            <p className="font-sans text-[9px] tracking-[0.45em] text-white/25 uppercase mb-0.5">Salon</p>
            <p className="font-sans text-lg font-semibold tracking-[0.2em] uppercase text-white/80">Kithsiri</p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            {["Services", "Team", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="underline-reveal font-sans text-[10px] tracking-[0.35em] uppercase text-white/35 hover:text-white/70 transition-colors duration-300 font-medium"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-sans text-[10px] tracking-widest text-white/20 uppercase">
            © {new Date().getFullYear()} Kithsiri Salon
          </p>
        </div>
      </div>
    </footer>
  );
}
