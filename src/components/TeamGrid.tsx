"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { getWhatsAppBookingLink } from "@/lib/whatsapp";

const teamMembers = [
  {
    name: "Elena Rossi",
    role: "Artistic Director",
    specialty: "Colour & Balayage",
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
  },
  {
    name: "Julian Brooks",
    role: "Lead Dermal Clinician",
    specialty: "Skin Wellness & Facials",
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
  },
  {
    name: "Mei Chen",
    role: "Nail & Beauty Specialist",
    specialty: "Nail Art & Therapy",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80",
  },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className="group flex flex-col items-center text-center px-8 py-12 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-neutral-100 hover:bg-neutral-50 transition-colors duration-500"
    >
      {/* Portrait */}
      <div className="relative w-44 h-44 mb-7 overflow-hidden rounded-full ring-1 ring-neutral-200 group-hover:ring-neutral-400 transition-all duration-500 shadow-md">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        {/* Warm overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-neutral-900/10 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Name — Cormorant Garamond */}
      <h3 className="font-serif text-2xl font-medium text-neutral-900 mb-1">{member.name}</h3>
      <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-400 font-medium mb-5">{member.role}</p>

      {/* Divider */}
      <motion.div
        className="w-8 h-px bg-neutral-300 mb-5"
        whileInView={{ scaleX: [0, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
      />

      <div className="space-y-1.5 text-sm text-neutral-500 mb-7 font-sans">
        <p>Speciality: <span className="text-neutral-700 font-medium">{member.specialty}</span></p>
        <p>Experience: <span className="text-neutral-700 font-medium">{member.experience}</span></p>
      </div>

      {/* Book with stylist */}
      <a
        href={getWhatsAppBookingLink(`an appointment with ${member.name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-reveal font-sans text-[10px] tracking-[0.35em] uppercase font-semibold text-neutral-400 hover:text-neutral-900 transition-colors duration-300 inline-flex items-center gap-2 group/link"
      >
        Book with {member.name.split(" ")[0]}
        <motion.svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </a>
    </motion.div>
  );
}

export default function TeamGrid() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const headerControls = useAnimation();

  useEffect(() => {
    if (headerInView) headerControls.start("visible");
  }, [headerInView, headerControls]);

  return (
    <section id="team" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-3">
          <motion.p
            initial="hidden"
            animate={headerControls}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
            className="font-sans text-[10px] tracking-[0.45em] uppercase text-neutral-400 font-medium"
          >
            The Artists
          </motion.p>
          <motion.h2
            initial="hidden"
            animate={headerControls}
            variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } } }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-neutral-900"
          >
            Meet the Experts
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={headerControls}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.25 } } }}
            className="font-sans text-neutral-500 max-w-lg mx-auto text-base leading-relaxed"
          >
            Visionary artists with years of international training and a deep passion for transformative beauty.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
