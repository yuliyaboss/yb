import { z } from "zod";

export const emailSubscribeSchema = z.object({
  email: z.string().trim().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
  consent: z.literal(true, {
    message: "Zgoda jest wymagana, aby wysłać przepis na e-mail.",
  }),
  source: z.enum(["newsletter", "builder"]),
  goalId: z.string().optional(),
  recipeId: z.string().optional(),
});

export type EmailSubscribeInput = z.infer<typeof emailSubscribeSchema>;

export const preferencesSchema = z.object({
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  noBanana: z.boolean(),
  noNuts: z.boolean(),
  noSoy: z.boolean(),
  highProtein: z.boolean(),
  kids: z.boolean(),
  glutenFree: z.boolean(),
  dairyFree: z.boolean(),
});

export const generateRecipeRequestSchema = z.object({
  goalId: z.string(),
  preferences: preferencesSchema,
});

export const recipeRoleSchema = z.enum([
  "base",
  "protein",
  "fruitPrimary",
  "fruitSecondary",
  "vegetable",
  "seedNut",
  "booster",
]);

export const swapIngredientRequestSchema = z.object({
  recipe: z.record(z.string(), z.unknown()),
  goalId: z.string(),
  preferences: preferencesSchema,
  role: recipeRoleSchema,
  excludeIds: z.array(z.string()).optional(),
});

export const pdfRequestSchema = z.object({
  recipe: z.record(z.string(), z.unknown()),
  goalId: z.string(),
});
