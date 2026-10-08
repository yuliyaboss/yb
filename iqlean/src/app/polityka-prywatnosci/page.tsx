import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { Logo } from "@/components/logo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 text-[24px] font-semibold tracking-tight">{children}</h2>
);

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-black/5 px-5">
        <div className="mx-auto flex h-14 max-w-[820px] items-center">
          <Link href="/" aria-label="I.Qlean, strona główna">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[820px] px-5 py-16 text-[16px] leading-relaxed text-ink/85 [&_li]:mt-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="h-section text-ink">Polityka prywatności</h1>
        <p className="mt-6 text-mute">Zasady ochrony danych osobowych w serwisie {site.url.replace("https://", "")}.</p>

        <H>Administrator danych</H>
        <p className="mt-3">
          Administratorem Twoich danych osobowych jest I.Qlean. Kontakt: e-mail{" "}
          <a className="text-[#0071e3]" href={`mailto:${site.email}`}>{site.email}</a>, telefon{" "}
          <a className="text-[#0071e3]" href={site.phoneHref}>{site.phone}</a>.
        </p>
        <p className="mt-3">
          Dane przetwarzamy zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO),
          ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych oraz innymi obowiązującymi przepisami.
        </p>

        <H>Jakie dane zbieramy</H>
        <p className="mt-3">Strona nie ma formularza zapisującego dane. Dane otrzymujemy, gdy sam się z nami skontaktujesz (e-mail, telefon, WhatsApp):</p>
        <ul>
          <li>imię i nazwisko (jeśli je podasz),</li>
          <li>adres e-mail,</li>
          <li>numer telefonu,</li>
          <li>adres nieruchomości (jeśli go podasz),</li>
          <li>treść wiadomości oraz parametry wyceny z kalkulatora.</li>
        </ul>
        <p className="mt-3">Podanie danych jest dobrowolne, ale potrzebne do odpowiedzi na zapytanie.</p>

        <H>Cele przetwarzania</H>
        <ul>
          <li>odpowiedź na zapytanie i przygotowanie wyceny,</li>
          <li>realizacja zamówionej usługi,</li>
          <li>kontakt telefoniczny i mailowy w sprawie oferty,</li>
          <li>wypełnienie obowiązków wynikających z przepisów prawa.</li>
        </ul>

        <H>Podstawy prawne</H>
        <ul>
          <li>art. 6 ust. 1 lit. a RODO: zgoda osoby, której dane dotyczą,</li>
          <li>art. 6 ust. 1 lit. b RODO: działania przed zawarciem umowy i jej realizacja,</li>
          <li>art. 6 ust. 1 lit. c RODO: obowiązki prawne administratora,</li>
          <li>art. 6 ust. 1 lit. f RODO: prawnie uzasadniony interes administratora, np. obrona przed roszczeniami.</li>
        </ul>

        <H>Jak długo przechowujemy dane</H>
        <p className="mt-3">
          Tak długo, jak to potrzebne do celu, w którym je zebraliśmy: do czasu wycofania zgody, przez czas współpracy, a potem do upływu
          terminów przedawnienia roszczeń lub obowiązków podatkowych.
        </p>

        <H>Odbiorcy danych</H>
        <p className="mt-3">
          Dane mogą trafić do dostawców usług technicznych: hostingu strony (Vercel Inc.), poczty e-mail (Google) i komunikatora
          (WhatsApp, Meta). Część z nich może przetwarzać dane poza Europejskim Obszarem Gospodarczym na podstawie standardowych
          klauzul umownych zatwierdzonych przez Komisję Europejską. W uzasadnionych przypadkach dane udostępniamy organom uprawnionym
          na podstawie przepisów prawa.
        </p>

        <H>Twoje prawa</H>
        <ul>
          <li>dostęp do danych i otrzymanie ich kopii,</li>
          <li>sprostowanie danych,</li>
          <li>usunięcie danych,</li>
          <li>ograniczenie przetwarzania,</li>
          <li>sprzeciw wobec przetwarzania,</li>
          <li>cofnięcie zgody w dowolnym momencie,</li>
          <li>skarga do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</li>
        </ul>

        <H>Pliki cookies</H>
        <p className="mt-3">
          Strona nie używa cookies analitycznych ani marketingowych. Serwer hostingu może zapisywać techniczne logi (np. adres IP)
          w celu zapewnienia bezpieczeństwa i prawidłowego działania strony. Jeśli w przyszłości dodamy narzędzia analityczne,
          poprosimy o zgodę i zaktualizujemy ten dokument.
        </p>

        <H>Zmiany</H>
        <p className="mt-3">Aktualna wersja polityki jest zawsze dostępna na tej stronie.</p>

        <H>Kontakt w sprawie danych</H>
        <p className="mt-3">
          <a className="text-[#0071e3]" href={`mailto:${site.email}`}>{site.email}</a> · <a className="text-[#0071e3]" href={site.phoneHref}>{site.phone}</a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
