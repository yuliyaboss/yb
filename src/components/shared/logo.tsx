import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight",
        className,
      )}
    >
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
        <Sparkles className="size-4" />
      </span>
      Prime Era
    </Link>
  );
}

export { Logo };
