"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

interface CtaButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  type?: "button" | "submit";
}

function CtaButton({
  href,
  onClick,
  children,
  className,
  variant,
  size = "lg",
  showIcon = true,
  type = "button",
}: CtaButtonProps) {
  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
      {showIcon && <ArrowRight className="size-4" />}
    </motion.span>
  );

  if (href) {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn(className)}
      >
        <Link href={href} onClick={onClick}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(className)}
    >
      {content}
    </Button>
  );
}

export { CtaButton };
