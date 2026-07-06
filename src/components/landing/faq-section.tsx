import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFaqSchema } from "@/lib/seo/schema-org";

export const FAQ_ITEMS = [
  {
    question: "Jak Prime Era dobiera składniki do koktajlu?",
    answer:
      "Nasz silnik rekomendacji ocenia każdy składnik pod kątem wybranego celu, Twoich preferencji i zgodności smakowej, a następnie układa recepturę tak, aby zawierała źródło białka, błonnika i antyoksydantów.",
  },
  {
    question: "Czy Prime Era zastępuje poradę dietetyka lub lekarza?",
    answer:
      "Nie. Prime Era to narzędzie inspiracyjne i edukacyjne. Nie diagnozujemy ani nie leczymy — w razie wątpliwości zdrowotnych skonsultuj się ze specjalistą.",
  },
  {
    question: "Czy mogę podmienić dowolny składnik?",
    answer:
      "Tak. Przy każdym składniku znajdziesz opcję zamiany na inny, dopasowany do tej samej roli w recepturze i Twoich preferencji.",
  },
  {
    question: "Czy koktajle są bezpieczne dla dzieci?",
    answer:
      "Wybierając preferencję „Dla dzieci”, otrzymasz recepturę złożoną wyłącznie z łagodnych, bezpiecznych składników. Zawsze sprawdzaj indywidualne alergie dziecka.",
  },
  {
    question: "Czy moje dane są bezpieczne?",
    answer:
      "Tak — przetwarzamy dane zgodnie z RODO. Adres e-mail wykorzystujemy wyłącznie za Twoją zgodą, a szczegóły znajdziesz w naszej polityce prywatności.",
  },
];

export function FaqSection() {
  const schema = buildFaqSchema(FAQ_ITEMS);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SectionHeading eyebrow="FAQ" title="Najczęstsze pytania" />

      <Accordion type="single" collapsible className="mt-12 w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
