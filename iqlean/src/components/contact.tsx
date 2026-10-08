import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";

import { site, whatsappLink } from "@/config/site";
import { Reveal } from "./reveal";

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: "Najszybciej", href: whatsappLink("Dzień dobry, "), external: true },
  { icon: Phone, label: "Telefon", value: site.phone, href: site.phoneHref, external: false },
  { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}`, external: false },
  { icon: AtSign, label: "Instagram", value: "@i.qlean", href: site.instagram, external: true },
];

export function Contact() {
  return (
    <section id="kontakt" className="bg-ink px-4 py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-14 px-1">
          <h2 className="h-display max-w-[12ch]">Remont już za Tobą?</h2>
          <p className="lead mt-6 max-w-[44ch] text-white/65">
            Napisz, zadzwoń albo wyślij kilka zdjęć. Dobierzemy pakiet i termin, a resztą zajmiemy się sami. Od tego jesteśmy my.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                className="group flex h-full flex-col rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
              >
                <c.icon size={24} strokeWidth={1.6} className="text-gold" />
                <span className="mt-8 text-[14px] text-white/55">{c.label}</span>
                <span className="mt-1 break-all text-[18px] font-semibold tracking-tight">{c.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
