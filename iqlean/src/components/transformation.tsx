import { BeforeAfter } from "./before-after";
import { Reveal } from "./reveal";

export function Transformation() {
  return (
    <section className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-10 px-1 text-center md:mb-14">
          <p className="eyebrow mb-4 text-gold">Przesuń i porównaj</p>
          <h2 className="h-section mx-auto max-w-[18ch]">Ten sam pokój. Jeden dzień różnicy.</h2>
        </Reveal>
        <Reveal>
          <BeforeAfter before="/media/reno-before.jpg" after="/media/reno-after.jpg" alt="Salon po remoncie" />
        </Reveal>
        <p className="mt-4 text-center text-[13px] text-mute">Wizualizacja poglądowa.</p>
      </div>
    </section>
  );
}
