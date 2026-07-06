import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import type { Goal } from "@/types/goal";
import type { Recipe } from "@/types/recipe";
import { siteConfig } from "@/config/site";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const FOREST = rgb(0.16, 0.29, 0.22);
const GRAPHITE = rgb(0.13, 0.14, 0.13);
const MUTED = rgb(0.45, 0.45, 0.43);
const SAND = rgb(0.86, 0.79, 0.64);

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Draws text one character at a time. Roboto (like most text fonts) applies
 * mandatory "fi"/"fl" ligature substitution during shaping, and pdf-lib does
 * not emit a correct ToUnicode mapping for the resulting ligature glyph —
 * it renders with a visual gap and copy-pastes as garbage. Feeding a single
 * character at a time to the shaper never gives it two letters to ligate.
 */
function drawLine(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: ReturnType<typeof rgb>,
): number {
  let cursorX = x;
  for (const char of text) {
    page.drawText(char, { x: cursorX, y, size, font, color });
    cursorX += font.widthOfTextAtSize(char, size);
  }
  return cursorX - x;
}

interface Cursor {
  page: PDFPage;
  y: number;
}

export async function generateRecipePdf(recipe: Recipe, goal: Goal): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const fontsDir = path.join(process.cwd(), "src/lib/pdf/fonts");
  const [regularBytes, boldBytes] = await Promise.all([
    readFile(path.join(fontsDir, "Roboto-Regular.ttf")),
    readFile(path.join(fontsDir, "Roboto-Bold.ttf")),
  ]);
  const regular = await doc.embedFont(regularBytes);
  const bold = await doc.embedFont(boldBytes);

  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const cursor: Cursor = { page, y: PAGE_HEIGHT - MARGIN };

  function ensureSpace(height: number) {
    if (cursor.y - height < MARGIN + 40) {
      cursor.page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursor.y = PAGE_HEIGHT - MARGIN;
    }
  }

  function drawText(
    text: string,
    { size = 11, font = regular, color = GRAPHITE, gap = 6, maxWidth = CONTENT_WIDTH }: {
      size?: number;
      font?: PDFFont;
      color?: ReturnType<typeof rgb>;
      gap?: number;
      maxWidth?: number;
    } = {},
  ) {
    const lines = wrapText(text, font, size, maxWidth);
    for (const line of lines) {
      ensureSpace(size + 4);
      drawLine(cursor.page, line, MARGIN, cursor.y, size, font, color);
      cursor.y -= size + 4;
    }
    cursor.y -= gap;
  }

  // Header
  drawLine(cursor.page, "PRIME ERA", MARGIN, cursor.y, 12, bold, FOREST);
  cursor.y -= 26;
  drawText(`Twój koktajl: ${goal.name}`, { size: 24, font: bold, color: GRAPHITE, gap: 4 });
  drawText(
    new Date(recipe.createdAt).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    { size: 10, color: MUTED, gap: 18 },
  );

  drawText(recipe.goalExplanation, { size: 11, color: GRAPHITE, gap: 20 });

  // Ingredients
  drawText("SKŁADNIKI", { size: 12, font: bold, color: FOREST, gap: 10 });
  for (const entry of recipe.entries) {
    ensureSpace(16);
    drawLine(
      cursor.page,
      `•  ${entry.ingredient.name} — ${entry.ingredient.unitLabel}`,
      MARGIN,
      cursor.y,
      11,
      bold,
      GRAPHITE,
    );
    cursor.y -= 15;
    drawText(entry.explanation, { size: 9.5, color: MUTED, gap: 8, maxWidth: CONTENT_WIDTH - 12 });
  }

  cursor.y -= 6;
  drawText("PRZYGOTOWANIE", { size: 12, font: bold, color: FOREST, gap: 10 });
  recipe.preparationSteps.forEach((step, index) => {
    drawText(`${index + 1}. ${step}`, { size: 10.5, color: GRAPHITE, gap: 8 });
  });

  cursor.y -= 6;
  drawText("WARTOŚCI ODŻYWCZE (ORIENTACYJNE)", { size: 12, font: bold, color: FOREST, gap: 10 });
  const macroLine = `Kalorie: ${recipe.totals.kcal} kcal   ·   Białko: ${recipe.totals.proteinG} g   ·   Węglowodany: ${recipe.totals.carbsG} g   ·   Tłuszcz: ${recipe.totals.fatG} g   ·   Błonnik: ${recipe.totals.fiberG} g`;
  drawText(macroLine, { size: 10, color: GRAPHITE, gap: 20 });

  drawText("LISTA ZAKUPÓW", { size: 12, font: bold, color: FOREST, gap: 10 });
  for (const item of recipe.shoppingList) {
    ensureSpace(16);
    cursor.page.drawRectangle({
      x: MARGIN,
      y: cursor.y - 8,
      width: 9,
      height: 9,
      borderColor: SAND,
      borderWidth: 1,
    });
    drawLine(
      cursor.page,
      `${item.name} — ${item.amountLabel}`,
      MARGIN + 16,
      cursor.y,
      10.5,
      regular,
      GRAPHITE,
    );
    cursor.y -= 18;
  }

  // Footer disclaimer on every page
  const disclaimer =
    "Treści mają charakter edukacyjny i inspiracyjny. Nie zastępują porady lekarskiej ani dietetycznej.";
  const siteLabel = siteConfig.url.replace(/^https?:\/\//, "");
  for (const p of doc.getPages()) {
    drawLine(p, disclaimer, MARGIN, 28, 7.5, regular, MUTED);
    const siteLabelWidth = regular.widthOfTextAtSize(siteLabel, 7.5);
    drawLine(p, siteLabel, PAGE_WIDTH - MARGIN - siteLabelWidth, 28, 7.5, regular, MUTED);
  }

  return doc.save();
}
