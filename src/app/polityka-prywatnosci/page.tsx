import type { Metadata } from "next";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych i plików cookie w serwisie Prime Era.",
  path: "/polityka-prywatnosci",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-display text-4xl font-medium">Polityka prywatności</h1>
          <p className="text-muted-foreground mt-2 text-sm">Ostatnia aktualizacja: lipiec 2026</p>

          <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-display mb-2 text-xl font-medium">1. Administrator danych</h2>
              <p>
                Administratorem danych osobowych zbieranych w serwisie {siteConfig.name} jest
                operator serwisu, z którym można skontaktować się pod adresem{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-forest underline">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">2. Jakie dane przetwarzamy</h2>
              <p>Przetwarzamy wyłącznie dane niezbędne do działania usługi:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>adres e-mail — jeśli zdecydujesz się zapisać przepis lub zapisać się do newslettera,</li>
                <li>preferencje żywieniowe wybrane w kreatorze — przetwarzane lokalnie w Twojej przeglądarce,</li>
                <li>
                  dane analityczne (np. odsłony, kliknięcia) — wyłącznie po wyrażeniu zgody w banerze
                  cookies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">3. Podstawa prawna</h2>
              <p>
                Dane przetwarzamy na podstawie art. 6 ust. 1 lit. a) RODO (zgoda — np. newsletter,
                cookies analityczne) oraz lit. f) RODO (prawnie uzasadniony interes — zapewnienie
                bezpieczeństwa i podstawowego działania serwisu).
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">4. Pliki cookie</h2>
              <p>
                Serwis korzysta z niezbędnych plików cookie (zawsze aktywne) oraz opcjonalnych
                plików analitycznych i marketingowych (Google Analytics 4, Meta Pixel), które
                uruchamiamy wyłącznie po Twojej zgodzie. Szczegóły znajdziesz w{" "}
                <a href="/cookies" className="text-forest underline">
                  polityce cookies
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">5. Odbiorcy danych</h2>
              <p>
                Dane mogą być przekazywane dostawcom usług analitycznych i marketingowych (Google,
                Meta) w zakresie wynikającym z udzielonej zgody, wyłącznie w celu analizy ruchu i
                pomiaru skuteczności kampanii.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">6. Twoje prawa</h2>
              <p>Zgodnie z RODO przysługuje Ci prawo do:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>dostępu do swoich danych i otrzymania ich kopii,</li>
                <li>sprostowania i usunięcia danych,</li>
                <li>ograniczenia lub wniesienia sprzeciwu wobec przetwarzania,</li>
                <li>przenoszenia danych,</li>
                <li>cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem</li>
                <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">7. Okres przechowywania</h2>
              <p>
                Dane przechowujemy przez okres niezbędny do realizacji celu, dla którego zostały
                zebrane, a w przypadku zgody marketingowej — do jej wycofania.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">8. Kontakt</h2>
              <p>
                W sprawach związanych z ochroną danych osobowych napisz do nas na adres{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-forest underline">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
