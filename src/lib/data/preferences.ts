import type { PreferenceOption } from "@/types/preferences";

/** PRD section 8 — user preferences shown in the builder step. */
export const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    key: "vegan",
    label: "Wegańskie",
    description: "Wyłącznie składniki roślinne.",
  },
  {
    key: "vegetarian",
    label: "Wegetariańskie",
    description: "Bez mięsa, nabiał i jaja dozwolone.",
  },
  {
    key: "noBanana",
    label: "Bez banana",
    description: "Pomijamy banana w każdej formie.",
  },
  {
    key: "noNuts",
    label: "Bez orzechów",
    description: "Bez orzechów i produktów orzechowych.",
  },
  {
    key: "noSoy",
    label: "Bez soi",
    description: "Bez tofu, mleka i jogurtu sojowego.",
  },
  {
    key: "highProtein",
    label: "Wysokobiałkowe",
    description: "Priorytet dla składników bogatych w białko.",
  },
  {
    key: "kids",
    label: "Dla dzieci",
    description: "Łagodny smak i bezpieczne składniki.",
  },
  {
    key: "glutenFree",
    label: "Bez glutenu",
    description: "Wyłącznie składniki bezglutenowe.",
  },
  {
    key: "dairyFree",
    label: "Bez laktozy",
    description: "Bez mleka i produktów mlecznych.",
  },
];
