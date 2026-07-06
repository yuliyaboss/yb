"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, ChevronLeft } from "lucide-react";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useEmailCapture } from "@/hooks/use-email-capture";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/shared/cta-button";
import { GlassPanel } from "@/components/shared/glass-panel";

const schema = z.object({
  email: z.string().trim().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
  consent: z.literal(true, { message: "Zgoda jest wymagana." }),
});

type FormInput = z.infer<typeof schema>;

function StepEmailCapture() {
  const setStep = useBuilderStore((state) => state.setStep);
  const emailSubmitted = useBuilderStore((state) => state.emailSubmitted);
  const reset = useBuilderStore((state) => state.reset);
  const { submit, isSubmitting, error } = useEmailCapture();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormInput) {
    await submit(data.email);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col gap-6"
    >
      <GlassPanel className="bg-card/90 flex flex-col gap-6 p-8 text-center">
        {emailSubmitted ? (
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-primary/10 flex size-16 items-center justify-center rounded-full"
            >
              <CheckCircle2 className="text-forest size-8" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="flex flex-col gap-1.5"
            >
              <h1 className="font-display text-2xl font-medium">Gotowe!</h1>
              <p className="text-muted-foreground text-sm">
                Wysłaliśmy Twój przepis na e-mail. Sprawdź skrzynkę odbiorczą.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35 }}
            >
              <CtaButton
                onClick={() => {
                  reset();
                }}
                showIcon={false}
              >
                Stwórz kolejny koktajl
              </CtaButton>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-display text-2xl font-medium">Zapisz swój przepis</h1>
              <p className="text-muted-foreground text-sm">
                Wyślemy Ci go na e-mail razem z listą zakupów, żebyś nie musiał/a niczego zapamiętywać.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <div className="relative">
                <Mail
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  type="email"
                  placeholder="twoj@email.pl"
                  className="pl-11"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-left text-xs">{errors.email.message}</p>
              )}

              <div className="flex items-start gap-2 text-left">
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="builder-consent"
                      checked={field.value ?? false}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  )}
                />
                <Label
                  htmlFor="builder-consent"
                  className="flex-1 block leading-relaxed text-muted-foreground font-normal"
                >
                  Zgadzam się na przesłanie przepisu na podany adres e-mail zgodnie z{" "}
                  <a href="/polityka-prywatnosci" className="text-forest underline underline-offset-2">
                    polityką prywatności
                  </a>
                  .
                </Label>
              </div>
              {errors.consent && (
                <p className="text-destructive text-left text-xs">{errors.consent.message}</p>
              )}

              {error && <p className="text-destructive text-xs">{error}</p>}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Wysyłanie…" : "Wyślij przepis"}
              </Button>
            </form>
          </>
        )}
      </GlassPanel>

      {!emailSubmitted && (
        <Button variant="ghost" onClick={() => setStep("result")} className="mx-auto">
          <ChevronLeft className="size-4" />
          Wróć do przepisu
        </Button>
      )}
    </motion.div>
  );
}

export { StepEmailCapture };
