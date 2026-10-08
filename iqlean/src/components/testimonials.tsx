import { reviews } from "@/config/reviews";
import { Reveal } from "./reveal";

export function Testimonials() {
  if (reviews.length === 0) return null;
  return (
    <section id="opinie" className="bg-soft px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-14 px-1">
          <h2 className="h-section max-w-[16ch]">Co mówią klienci.</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <figure className="flex h-full flex-col rounded-[24px] bg-white p-8">
                <blockquote className="text-[17px] leading-relaxed">&bdquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-auto pt-6 text-[14px] text-mute">
                  <span className="font-semibold text-ink">{r.name}</span>
                  {r.place && <> · {r.place}</>}
                  {r.service && <> · {r.service}</>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
