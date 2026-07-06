import type { PreferenceOption } from "@/types/preferences";

/** PRD section 8 — user preferences shown in the builder step. */
export const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    key: "vegan",
    label: "Wegańskie",
    description: "Wyłącznie składniki roślinne.",
    group: "diet",
  },
  {
    key: "vegetarian",
    label: "Wegetariańskie",
    description: "Bez mięsa, nabiał i jaja dozwolone.",
    group: "diet",
  },
  {
    key: "glutenFree",
    label: "Bez glutenu",
    description: "Wyłącznie składniki bezglutenowe.",
    group: "diet",
  },
  {
    key: "dairyFree",
    label: "Bez laktozy",
    description: "Bez mleka i produktów mlecznych.",
    group: "diet",
  },
  {
    key: "noBanana",
    label: "Bez banana",
    description: "Pomijamy banana w każdej formie.",
    group: "allergens",
  },
  {
    key: "noNuts",
    label: "Bez orzechów",
    description: "Bez orzechów i produktów orzechowych.",
    group: "allergens",
  },
  {
    key: "noSoy",
    label: "Bez soi",
    description: "Bez tofu, mleka i jogurtu sojowego.",
    group: "allergens",
  },
  {
    key: "highProtein",
    label: "Wysokobiałkowe",
    description: "Priorytet dla składników bogatych w białko.",
    group: "priorities",
  },
  {
    key: "kids",
    label: "Dla dzieci",
    description: "Łagodny smak i bezpieczne składniki.",
    group: "priorities",
  },
];

export const PREFERENCE_GROUP_LABELS: Record<PreferenceOption["group"], string> = {
  diet: "Styl diety",
  allergens: "Bez alergenów",
  priorities: "Priorytety",
};
