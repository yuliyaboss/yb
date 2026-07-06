import type { Metadata } from "next";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu i kreatora smoothie Prime Era.",
  path: "/regulamin",
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-display text-4xl font-medium">Regulamin</h1>
          <p className="text-muted-foreground mt-2 text-sm">Ostatnia aktualizacja: lipiec 2026</p>

          <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-display mb-2 text-xl font-medium">1. Postanowienia ogólne</h2>
              <p>
                Niniejszy regulamin określa zasady korzystania z serwisu {siteConfig.name}{" "}
                dostępnego pod adresem {siteConfig.url}, w tym z interaktywnego kreatora smoothie
                („Builder”).
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">2. Charakter usługi</h2>
              <p>
                {siteConfig.name} jest narzędziem inspiracyjnym i edukacyjnym. Generowane
                receptury oraz towarzyszące im opisy mają charakter informacyjny i nie stanowią
                porady medycznej, dietetycznej ani farmaceutycznej. Przed wprowadzeniem istotnych
                zmian w diecie skonsultuj się z lekarzem lub dietetykiem — w szczególności w
                przypadku ciąży, chorób przewlekłych, alergii pokarmowych lub przyjmowania leków.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">3. Zasady korzystania</h2>
              <p>
                Korzystanie z Buildera jest bezpłatne. Użytkownik odpowiada za prawidłowe
                wskazanie własnych preferencji i alergii — serwis dobiera składniki na podstawie
                podanych informacji, ale nie weryfikuje ich medycznie.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">4. Własność intelektualna</h2>
              <p>
                Zawartość serwisu, w tym logika rekomendacji, treści i design, stanowi własność{" "}
                Yuliya Busko i podlega ochronie prawnoautorskiej. Wygenerowany przepis możesz
                swobodnie wykorzystywać do użytku prywatnego.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">5. Odpowiedzialność</h2>
              <p>
                {siteConfig.name} dokłada starań, aby informacje o składnikach były rzetelne,
                jednak nie ponosi odpowiedzialności za indywidualne reakcje organizmu na
                zaproponowane składniki. Wartości odżywcze mają charakter orientacyjny.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">6. Dane osobowe</h2>
              <p>
                Zasady przetwarzania danych osobowych opisane są w{" "}
                <a href="/polityka-prywatnosci" className="text-forest underline">
                  polityce prywatności
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display mb-2 text-xl font-medium">7. Kontakt</h2>
              <p>
                Pytania dotyczące regulaminu prosimy kierować na adres{" "}
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
