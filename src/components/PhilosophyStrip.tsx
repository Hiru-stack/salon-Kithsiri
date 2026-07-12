"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView, useAnimation } from "framer-motion";

const pillars = [
  { icon: "✦", label: "Expert Craftsmanship", desc: "Trained by internationally certified masters." },
  { icon: "✦", label: "Premium Products", desc: "Only the finest professional-grade formulations." },
  { icon: "✦", label: "Bespoke Consultation", desc: "Every client receives a personalised treatment plan." },
  { icon: "✦", label: "Results-Driven Care", desc: "Techniques proven to deliver transformative results." },
];

function Pillar({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className="flex flex-col items-center text-center px-8 py-10 space-y-3 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-white/10"
    >
      <motion.span
        className="text-white/20 text-xl"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      >
        {pillar.icon}
      </motion.span>
      <h3 className="text-[11px] tracking-[0.4em] uppercase font-semibold text-white">{pillar.label}</h3>
      <p className="text-white/45 text-xs leading-relaxed max-w-[180px]">{pillar.desc}</p>
    </motion.div>
  );
}

export default function PhilosophyStrip() {
  return (
    <section className="bg-neutral-900 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {pillars.map((p, i) => (
            <Pillar key={p.label} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
