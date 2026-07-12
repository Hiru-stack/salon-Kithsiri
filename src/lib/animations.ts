"use client";

import { useEffect, useRef } from "react";
import { useInView, useAnimation, type Variant } from "framer-motion";

type Variants = {
  hidden: Variant;
  visible: Variant;
};

export function useFadeInUp(delay = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay } },
  };

  return { ref, controls, variants, initial: "hidden", animate: controls };
}

export function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut", delay } },
  };

  return { ref, controls, variants, initial: "hidden", animate: controls };
}

export function useStaggerChildren(staggerDelay = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return { ref, controls, containerVariants, itemVariants, initial: "hidden", animate: controls };
}
