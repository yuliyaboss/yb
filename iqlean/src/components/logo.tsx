export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-[1.5rem] font-semibold leading-none tracking-[-0.01em] ${className}`}>
      I.Qlean
    </span>
  );
}
