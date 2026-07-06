import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { GOALS } from "@/lib/data/goals";

const FOOTER_COLUMNS = [
  {
    title: "Produkt",
    links: [
      { label: "Kreator smoothie", href: "/builder" },
      { label: "Jak to działa", href: "/#jak-to-dziala" },
      ...GOALS.slice(0, 3).map((goal) => ({
        label: goal.name,
        href: `/cele/${goal.slug}`,
      })),
    ],
  },
  {
    title: "Prawne",
    links: [
      { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
      { label: "Regulamin", href: "/regulamin" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                  {column.title}
                </span>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Prime Era. Wszystkie prawa zastrzeżone.</span>
          <span>
            Treści mają charakter edukacyjny i nie zastępują porady lekarskiej ani dietetycznej.
          </span>
        </div>
      </div>
    </footer>
  );
}
