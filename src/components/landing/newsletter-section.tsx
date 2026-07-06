"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/shared/section-heading";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/use-analytics";

const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
  consent: z.literal(true, { message: "Zgoda jest wymagana." }),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const { track } = useAnalytics();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(data: NewsletterInput) {
    track("email_submit", { goalId: null });
    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "newsletter" }),
      });
      if (!response.ok) throw new Error("subscribe_failed");
      track("email_success", { goalId: null });
      setSubmitted(true);
    } catch {
      toast.error("Nie udało się zapisać adresu e-mail. Spróbuj ponownie.");
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <GlassPanel className="bg-card/80 flex flex-col items-center gap-8 p-10 text-center sm:p-14">
        <SectionHeading
          eyebrow="Newsletter"
          title="Zostań w ekosystemie Prime Era"
          description="Nowe cele, przepisy i porady prosto na Twoją skrzynkę — bez spamu."
        />

        {submitted ? (
          <div className="text-forest flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="size-5" />
            Dziękujemy! Sprawdź swoją skrzynkę.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-md flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Mail
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  type="email"
                  placeholder="twoj@email.pl"
                  className="pl-11"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                  {...register("email")}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wysyłanie…" : "Zapisz się"}
              </Button>
            </div>
            {errors.email && (
              <p id="newsletter-email-error" className="text-destructive text-left text-xs">
                {errors.email.message}
              </p>
            )}

            <div className="flex items-start gap-2 text-left">
              <Controller
                name="consent"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="newsletter-consent"
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                )}
              />
              <Label
                htmlFor="newsletter-consent"
                className="flex-1 block leading-relaxed text-muted-foreground font-normal"
              >
                Zgadzam się na otrzymywanie wiadomości od Prime Era zgodnie z{" "}
                <a href="/polityka-prywatnosci" className="text-forest underline underline-offset-2">
                  polityką prywatności
                </a>
                .
              </Label>
            </div>
            {errors.consent && (
              <p className="text-destructive text-left text-xs">{errors.consent.message}</p>
            )}
          </form>
        )}
      </GlassPanel>
    </section>
  );
}
