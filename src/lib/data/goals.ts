import type { Goal, GoalId } from "@/types/goal";

/** The 11 builder goals (PRD section 6 + Załącznik A). */
export const GOALS: Goal[] = [
  {
    id: "primeEra",
    slug: "prime-era",
    name: "Prime Era",
    shortDescription: "Skóra, włosy i kobieca równowaga",
    heroQuestion: "Chcesz wesprzeć skórę, włosy i wewnętrzną równowagę?",
    iconName: "Sparkles",
    colorToken: "forest",
    emphasisTags: ["skinHairBalance", "healthyFat", "highAntioxidant", "highProtein"],
    explainerIntro:
      "Ten koktajl łączy zdrowe tłuszcze, antyoksydanty i porcję białka — składniki, które wspierają kondycję skóry i włosów oraz codzienną równowagę organizmu.",
    seo: {
      title: "Smoothie Prime Era — na skórę, włosy i równowagę | Prime Era",
      description:
        "Odkryj spersonalizowany przepis Prime Era: składniki dobrane pod skórę, włosy i kobiecą równowagę. Wygeneruj swój przepis w kilka sekund.",
    },
  },
  {
    id: "energia",
    slug: "energia",
    name: "Energia",
    shortDescription: "Stabilna energia na cały dzień",
    heroQuestion: "Potrzebujesz naturalnego zastrzyku energii?",
    iconName: "Zap",
    colorToken: "sand",
    emphasisTags: ["energy", "highFiber"],
    explainerIntro:
      "Ten koktajl bazuje na naturalnych cukrach i błonniku, które pomagają utrzymać stabilny poziom energii bez nagłego spadku.",
    seo: {
      title: "Smoothie na energię — naturalny zastrzyk mocy | Prime Era",
      description:
        "Spersonalizowany koktajl na energię dobrany do Twoich preferencji. Sprawdź, jak działa inteligentny kreator smoothie Prime Era.",
    },
  },
  {
    id: "koncentracja",
    slug: "koncentracja",
    name: "Koncentracja",
    shortDescription: "Skupienie i jasność umysłu",
    heroQuestion: "Chcesz poprawić koncentrację i skupienie?",
    iconName: "Brain",
    colorToken: "forest",
    emphasisTags: ["focus", "energy", "highFiber"],
    explainerIntro:
      "Ten koktajl wspiera stabilną energię i zawiera składniki kojarzone z utrzymaniem koncentracji przez dłuższy czas.",
    seo: {
      title: "Smoothie na koncentrację i skupienie | Prime Era",
      description:
        "Wygeneruj koktajl wspierający koncentrację — dobrany na podstawie Twojego celu i preferencji żywieniowych.",
    },
  },
  {
    id: "bialko",
    slug: "bialko",
    name: "Białko",
    shortDescription: "Wysokobiałkowe wsparcie diety",
    heroQuestion: "Szukasz wysokobiałkowego smoothie?",
    iconName: "Dumbbell",
    colorToken: "graphite",
    emphasisTags: ["highProtein"],
    explainerIntro:
      "Ten koktajl skupia się na gęstych źródłach białka, które mogą być elementem zbilansowanej, wysokobiałkowej diety.",
    seo: {
      title: "Wysokobiałkowe smoothie — kreator online | Prime Era",
      description:
        "Stwórz spersonalizowany, wysokobiałkowy koktajl smoothie dopasowany do Twoich preferencji żywieniowych.",
    },
  },
  {
    id: "zelazo",
    slug: "zelazo",
    name: "Żelazo",
    shortDescription: "Wsparcie w utrzymaniu poziomu żelaza",
    heroQuestion: "Chcesz wesprzeć swój poziom żelaza?",
    iconName: "Droplets",
    colorToken: "sand",
    emphasisTags: ["highIron", "vitaminC"],
    explainerIntro:
      "Ten koktajl łączy roślinne źródła żelaza z witaminą C, która pomaga w jego przyswajaniu.",
    seo: {
      title: "Smoothie na żelazo — z witaminą C | Prime Era",
      description:
        "Kreator koktajlu wspierającego poziom żelaza — roślinne źródła żelaza połączone z witaminą C.",
    },
  },
  {
    id: "poTreningu",
    slug: "po-treningu",
    name: "Po treningu",
    shortDescription: "Regeneracja, białko i nawodnienie",
    heroQuestion: "Trenowałaś/eś? Uzupełnij energię i białko.",
    iconName: "Activity",
    colorToken: "graphite",
    emphasisTags: ["postWorkout", "highProtein", "hydration"],
    explainerIntro:
      "Ten koktajl łączy białko, węglowodany i nawodnienie — trzy elementy, które warto uzupełnić po wysiłku fizycznym.",
    seo: {
      title: "Smoothie po treningu — białko i regeneracja | Prime Era",
      description:
        "Spersonalizowany koktajl po treningu: białko, węglowodany i nawodnienie w jednej szklance.",
    },
  },
  {
    id: "jelita",
    slug: "jelita",
    name: "Jelita",
    shortDescription: "Błonnik i wsparcie mikrobioty",
    heroQuestion: "Chcesz wesprzeć trawienie i mikrobiotę jelitową?",
    iconName: "Sprout",
    colorToken: "forest",
    emphasisTags: ["gutHealth", "highFiber"],
    explainerIntro:
      "Ten koktajl jest bogaty w błonnik i składniki wspierające naturalną mikroflorę jelitową.",
    seo: {
      title: "Smoothie na jelita i trawienie | Prime Era",
      description:
        "Koktajl bogaty w błonnik i składniki wspierające mikrobiotę jelitową — wygenerowany specjalnie dla Ciebie.",
    },
  },
  {
    id: "ukladNerwowy",
    slug: "uklad-nerwowy",
    name: "Układ nerwowy",
    shortDescription: "Spokój i wsparcie układu nerwowego",
    heroQuestion: "Potrzebujesz chwili spokoju dla układu nerwowego?",
    iconName: "Waves",
    colorToken: "sand",
    emphasisTags: ["nervousSystem", "calming"],
    explainerIntro:
      "Ten koktajl łączy magnez i adaptogeny kojarzone ze wsparciem prawidłowego funkcjonowania układu nerwowego.",
    seo: {
      title: "Smoothie na układ nerwowy i spokój | Prime Era",
      description:
        "Kreator koktajlu wspierającego układ nerwowy — magnez, adaptogeny i składniki na spokój.",
    },
  },
  {
    id: "odpornosc",
    slug: "odpornosc",
    name: "Odporność",
    shortDescription: "Witamina C i naturalna odporność",
    heroQuestion: "Chcesz wesprzeć naturalną odporność organizmu?",
    iconName: "Shield",
    colorToken: "forest",
    emphasisTags: ["immunity", "vitaminC", "highAntioxidant"],
    explainerIntro:
      "Ten koktajl obfituje w witaminę C i antyoksydanty, które wspierają naturalną odporność organizmu.",
    seo: {
      title: "Smoothie na odporność — witamina C | Prime Era",
      description:
        "Spersonalizowany koktajl wspierający odporność: witamina C i antyoksydanty w jednej szklance.",
    },
  },
  {
    id: "przeciwzapalny",
    slug: "przeciwzapalny",
    name: "Przeciwzapalny",
    shortDescription: "Składniki łagodzące i kojące",
    heroQuestion: "Szukasz koktajlu o działaniu kojącym dla organizmu?",
    iconName: "Snowflake",
    colorToken: "graphite",
    emphasisTags: ["antiInflammatory"],
    explainerIntro:
      "Ten koktajl bazuje na składnikach o niskim indeksie prozapalnym, takich jak kurkuma, imbir i owoce jagodowe.",
    seo: {
      title: "Smoothie przeciwzapalne — kurkuma i jagody | Prime Era",
      description:
        "Kreator koktajlu na bazie składników o działaniu kojącym: kurkuma, imbir, owoce jagodowe i więcej.",
    },
  },
  {
    id: "dlaDzieci",
    slug: "dla-dzieci",
    name: "Dla dzieci",
    shortDescription: "Łagodny smak, bezpieczne składniki",
    heroQuestion: "Szukasz smoothie odpowiedniego dla dziecka?",
    iconName: "Baby",
    colorToken: "sand",
    emphasisTags: ["kidsFriendly"],
    explainerIntro:
      "Ten koktajl został skomponowany z łagodnych w smaku, bezpiecznych składników odpowiednich dla najmłodszych.",
    seo: {
      title: "Smoothie dla dzieci — łagodne i smaczne | Prime Era",
      description:
        "Bezpieczny, łagodny w smaku koktajl dla dzieci — wygenerowany na podstawie preferencji Twojej rodziny.",
    },
  },
];

export function getGoalById(id: GoalId): Goal | undefined {
  return GOALS.find((goal) => goal.id === id);
}

export function getGoalBySlug(slug: string): Goal | undefined {
  return GOALS.find((goal) => goal.slug === slug);
}
