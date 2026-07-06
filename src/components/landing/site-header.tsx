"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { CtaButton } from "@/components/shared/cta-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAnalytics } from "@/hooks/use-analytics";

const NAV_LINKS = [
  { label: "Jak to działa", href: "/#jak-to-dziala" },
  { label: "Cele", href: "/#cele" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { track } = useAnalytics();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-panel mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-5 py-3 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <CtaButton
            href="/builder"
            size="sm"
            showIcon={false}
            onClick={() => track("hero_cta_click", { location: "nav" })}
          >
            Stwórz koktajl
          </CtaButton>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Otwórz menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-xl px-3 py-3 text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CtaButton
            href="/builder"
            className="w-full justify-center"
            onClick={() => {
              track("hero_cta_click", { location: "nav" });
              setOpen(false);
            }}
          >
            Stwórz koktajl
          </CtaButton>
        </SheetContent>
      </Sheet>
    </header>
  );
}
