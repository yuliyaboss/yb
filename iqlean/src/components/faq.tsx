import { Plus } from "lucide-react";

import { Reveal } from "./reveal";

const faq = [
  {
    q: "Czy cena z kalkulatora jest ostateczna?",
    a: "To cena orientacyjna. Potwierdzamy ją po zdjęciach albo oględzinach. Czasem pod pyłem są zabrudzenia, których nie widać na pierwszy rzut oka, i wolimy powiedzieć o tym przed startem, a nie po.",
  },
  {
    q: "Czym różni się Express od Ultimate?",
    a: "Express to szybki porządek, żeby dało się wprowadzić: podłogi, parapety, podstawowe detale, okna w dwóch etapach. Ultimate obejmuje też pył ze ścian i sufitów, pełne doczyszczanie detali, materiałów delikatnych i okien w pięciu etapach.",
  },
  {
    q: "Ile to trwa?",
    a: "Express zwykle 4 do 10 godzin. Ultimate od jednego dnia, przy dużych metrażach dłużej. Dokładny czas podajemy przy potwierdzeniu terminu.",
  },
  {
    q: "Co to jest Air Washer?",
    a: "Urządzenie, które myje powietrze. Wyłapuje drobny pył, który po szlifowaniu i gipsowaniu długo unosi się w pomieszczeniu i osiada na świeżo umytych powierzchniach. Kosztuje 200 zł za zlecenie.",
  },
  {
    q: "Czy macie własny sprzęt i środki?",
    a: "Tak. Przyjeżdżamy z profesjonalnym sprzętem i środkami dobranymi do kamienia, drewna, szkła i armatury.",
  },
  {
    q: "Jak wyceniacie Ready to Market?",
    a: "Indywidualnie. Po oględzinach dostajesz listę prac i jedną cenę za całość. Możesz wybrać tylko część, na przykład malowanie i sprzątanie.",
  },
  {
    q: "Gdzie pracujecie?",
    a: "Warszawa i okolice. Jeśli jesteś dalej, napisz. Przy większym zleceniu dojedziemy.",
  },
  {
    q: "Kiedy ruszy mycie paneli i elewacji?",
    a: "W ciągu najbliższych miesięcy. Zapisz się na listę, a odezwiemy się jako pierwsi.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-soft px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[820px]">
        <Reveal className="mb-12 px-1">
          <h2 className="h-section">Pytania.</h2>
        </Reveal>
        <div className="divide-y divide-black/8 rounded-[28px] bg-white px-6 md:px-10">
          {faq.map((f) => (
            <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-tight">
                {f.q}
                <Plus size={20} className="shrink-0 text-mute transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqItems = faq;
