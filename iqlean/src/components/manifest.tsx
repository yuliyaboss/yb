"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const TEXT =
  "Po remoncie zostaje pył, którego nie widać od razu. Siada w gniazdkach, na listwach, w szynach okien i wraca po każdym przetarciu. Usuwamy go warstwa po warstwie, aż przestaje wracać. Bez pośpiechu, bez rys i bez śladów po nas.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

export function Manifest() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = TEXT.split(" ");

  return (
    <section id="manifest" className="bg-white px-5 py-32 md:py-44">
      <div ref={ref} className="mx-auto max-w-[980px]">
        <p className="eyebrow mb-8 text-gold">Dlaczego I.Qlean</p>
        <p className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
