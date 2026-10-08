import Link from "next/link";

import { nav, site } from "@/config/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-soft px-5 py-12 text-[13px] text-mute">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-8 md:flex-row md:items-center">
          <Link href="/" className="text-ink">
            <Logo />
          </Link>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={`/${n.href}`} className="hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 md:flex-row">
          <p>
            © {new Date().getFullYear()} I.Qlean · Profesjonalne sprzątanie po remoncie · {site.area}
          </p>
          <div className="flex gap-6">
            <a href="/polityka-prywatnosci" className="hover:text-ink">
              Polityka prywatności
            </a>
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-ink">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-ink">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
