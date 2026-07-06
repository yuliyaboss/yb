"use client";

import { useCallback, useMemo, useState } from "react";

import type { ShoppingListItem } from "@/types/recipe";

export function useShoppingList(items: ShoppingListItem[]) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((ingredientId: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(ingredientId)) {
        next.delete(ingredientId);
      } else {
        next.add(ingredientId);
      }
      return next;
    });
  }, []);

  const list = useMemo(
    () => items.map((item) => ({ ...item, checked: checkedIds.has(item.ingredientId) })),
    [items, checkedIds],
  );

  const checkedCount = checkedIds.size;

  return { list, toggle, checkedCount, total: items.length };
}
