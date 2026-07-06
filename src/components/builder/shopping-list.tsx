"use client";

import { Check } from "lucide-react";

import type { ShoppingListItem } from "@/types/recipe";
import { useShoppingList } from "@/hooks/use-shopping-list";
import { cn } from "@/lib/utils";

interface ShoppingListProps {
  items: ShoppingListItem[];
}

function ShoppingList({ items }: ShoppingListProps) {
  const { list, toggle, checkedCount, total } = useShoppingList(items);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>Lista zakupów</span>
        <span>
          {checkedCount}/{total}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {list.map((item) => (
          <li key={item.ingredientId}>
            <button
              type="button"
              onClick={() => toggle(item.ingredientId)}
              className="flex w-full items-center gap-3 text-left"
              aria-pressed={item.checked}
            >
              <span
                className={cn(
                  "border-border flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  item.checked && "bg-primary border-primary text-primary-foreground",
                )}
              >
                {item.checked && <Check className="size-3.5" />}
              </span>
              <span
                className={cn(
                  "text-sm",
                  item.checked && "text-muted-foreground line-through",
                )}
              >
                {item.name} <span className="text-muted-foreground">— {item.amountLabel}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ShoppingList };
