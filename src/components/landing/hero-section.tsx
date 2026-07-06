"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { CtaButton } from "@/components/shared/cta-button";
import { GlassPanel } from "@/components/shared/glass-panel";
import { useAnalytics } from "@/hooks/use-analytics";

export function HeroSection() {
  const { track } = useAnalytics();

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="from-forest-light/25 absolute top-[-10%] left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br via-transparent to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="bg-sand/40 absolute right-[-10%] bottom-[-10%] -z-10 h-[420px] w-[420px] rounded-full blur-3xl"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-border bg-card/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
        >
          <Sparkles className="text-forest size-3.5" />
          Inteligentny kreator smoothie
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-balance text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
        >
          Czego potrzebuje
          <br />
          dziś Twoje ciało?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-muted-foreground text-balance max-w-xl text-lg"
        >
          Wybierz swój cel, a nasz silnik rekomendacji dobierze składniki, wyjaśni każdy wybór
          i przygotuje Twoją listę zakupów — w mniej niż minutę.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <CtaButton
            href="/builder"
            onClick={() => track("hero_cta_click", { location: "hero" })}
          >
            Stwórz swój koktajl
          </CtaButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 w-full max-w-md"
        >
          <GlassPanel className="flex flex-col gap-4 p-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
                Twój przepis
              </span>
              <span className="bg-primary/10 text-forest-deep rounded-full px-2.5 py-1 text-xs font-medium">
                Energia
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {["Napój owsiany", "Banan", "Mango", "Burak", "Siemię lniane"].map((name) => (
                <div
                  key={name}
                  className="border-border/60 flex items-center justify-between border-b py-1.5 text-sm last:border-b-0"
                >
                  <span>{name}</span>
                  <Leaf className="text-forest-light size-3.5" />
                </div>
              ))}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <ShieldCheck className="size-3.5" />
              Wyjaśniamy każdy dobrany składnik
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
