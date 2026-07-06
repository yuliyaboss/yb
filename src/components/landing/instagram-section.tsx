import Link from "next/link";
import { Camera } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";

const TILE_GRADIENTS = [
  "from-forest/70 to-forest-deep",
  "from-sand-dark/70 to-sand",
  "from-graphite/70 to-graphite-soft",
  "from-forest-light/70 to-forest",
  "from-sand/70 to-sand-dark",
  "from-forest-deep/70 to-graphite",
];

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Instagram"
        title="Bądź na bieżąco"
        description="Codzienna inspiracja, zakulisowe historie i nowe cele — dołącz do nas na Instagramie."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {TILE_GRADIENTS.map((gradient, index) => (
          <Link
            key={gradient}
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br transition-transform duration-300 hover:scale-[1.03] ${gradient}`}
            aria-label={`Zobacz post ${index + 1} na Instagramie Prime Era`}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-300 group-hover:bg-black/10 group-hover:opacity-100">
              <Camera className="size-6 text-white" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
