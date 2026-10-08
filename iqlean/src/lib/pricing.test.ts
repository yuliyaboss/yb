import { describe, expect, it } from "vitest";
import { calculate } from "./pricing";

describe("calculate", () => {
  it("matches the old site's formula", () => {
    const { total } = calculate({ pakiet: "Express", meble: "bez", airWasher: false, metraz: 50, okna: 10, balkon: 7 });
    expect(total).toBe(15 * 50 + 35 * 10 + 35 * 7);
  });
  it("uses Ultimate rates with furniture and adds Air Washer", () => {
    const { total } = calculate({ pakiet: "Ultimate", meble: "z", airWasher: true, metraz: 40, okna: 0, balkon: 0 });
    expect(total).toBe(25 * 40 + 200);
  });
  it("returns 0 without floor area", () => {
    expect(calculate({ pakiet: "Express", meble: "bez", airWasher: true, metraz: 0, okna: 5, balkon: 0 }).total).toBe(0);
  });
  it("ignores negative and NaN input", () => {
    expect(calculate({ pakiet: "Express", meble: "bez", airWasher: false, metraz: 10, okna: -4, balkon: NaN }).total).toBe(150);
  });
});
