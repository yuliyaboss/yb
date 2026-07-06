import * as React from "react";

import { cn } from "@/lib/utils";

function GlassPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-panel"
      className={cn("glass-panel rounded-3xl", className)}
      {...props}
    />
  );
}

export { GlassPanel };
