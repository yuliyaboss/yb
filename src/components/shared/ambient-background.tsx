function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="from-forest-light/20 absolute top-[-15%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br via-transparent to-transparent blur-3xl" />
      <div className="bg-sand/30 absolute top-[20%] right-[-15%] h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="bg-forest/10 absolute bottom-[-10%] left-[-10%] h-[380px] w-[380px] rounded-full blur-3xl" />
    </div>
  );
}

export { AmbientBackground };
