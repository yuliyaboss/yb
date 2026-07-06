"use client";

import { AnimatePresence, motion } from "framer-motion";
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
              className="group flex w-full items-center gap-3 text-left"
              aria-pressed={item.checked}
            >
              <motion.span
                animate={{ scale: item.checked ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "border-border flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  "group-hover:border-forest",
                  item.checked && "bg-primary border-primary text-primary-foreground",
                )}
              >
                <AnimatePresence>
                  {item.checked && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="size-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span
                className={cn(
                  "text-sm transition-colors",
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
