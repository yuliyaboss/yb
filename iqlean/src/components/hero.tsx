"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

import { site } from "@/config/site";
import { ButtonLink } from "./button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black text-white">
      <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1080px] flex-col items-center justify-center px-5 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-5 text-white/75"
        >
          {site.area}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-display max-w-[14ch]"
        >
          Remont skończony. Reszta należy do nas.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="lead mt-6 max-w-[38ch] text-white/85"
        >
          Sprzątanie po remoncie i budowie w standardzie premium. Pył, farba, fugi, szkło. Wchodzisz do gotowego wnętrza.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ButtonLink href="#kalkulator" variant="light" className="min-w-[200px]">
            Policz wycenę
          </ButtonLink>
          <ButtonLink href="#uslugi" className="min-w-[200px] border border-white/50 bg-transparent hover:bg-white/10">
            Zobacz usługi
          </ButtonLink>
        </motion.div>
      </motion.div>

      <a
        href="#manifest"
        aria-label="Przewiń dalej"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
