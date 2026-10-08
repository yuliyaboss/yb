// Opinie klientów. Dodawaj tylko prawdziwe opinie, za zgodą autora.
// Sekcja "Opinie" pojawi się na stronie automatycznie, gdy lista nie będzie pusta.
export type Review = { name: string; place?: string; text: string; service?: string };

export const reviews: Review[] = [];
