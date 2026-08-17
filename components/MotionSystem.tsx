"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0.94, y: 12 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScoreBar({ label, score, delay = 0 }: { label: string; score: number; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <span className="text-sm text-[#53606a]">{label}</span>
        <span className="font-serif text-2xl text-[#121a23]">{score}</span>
      </div>
      <div className="h-px bg-[#c8d0d2]">
        <motion.div
          className="h-px origin-left bg-[#274a5d]"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: score / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function BlackLabelMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(".black-hero-image", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: ".black-hero", start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.fromTo(
        ".journey-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".journey-track", start: "top 72%" },
        },
      );
      gsap.fromTo(
        ".journey-line-mobile",
        { scaleY: 0 },
        {
          scaleY: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: ".journey-track", start: "top 72%" },
        },
      );
    }, root);
    return () => context.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
