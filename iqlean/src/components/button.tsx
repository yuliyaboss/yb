import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "light" | "link";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-black",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-white/90",
  link: "text-[#0071e3] hover:underline px-0 py-0",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={clsx(base, styles[variant], className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={clsx(base, styles[variant], className)} {...props} />;
}
