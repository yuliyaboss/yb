"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { nav } from "@/config/site";
import { Logo } from "./logo";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        dark ? "bg-transparent text-white" : "bg-white/72 text-ink backdrop-blur-xl backdrop-saturate-150 border-b border-black/5"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-5" aria-label="Główna nawigacja">
        <a href="#top" aria-label="I.Qlean, strona główna" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-[13px] md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="opacity-80 transition-opacity hover:opacity-100">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#kalkulator"
            className={`hidden rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors sm:inline-flex ${
              dark ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:bg-black"
            }`}
          >
            Wycena
          </a>
          <button
            className="md:hidden"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-8 pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a href={item.href} onClick={() => setOpen(false)} className="block py-2 text-[28px] font-semibold tracking-tight">
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
