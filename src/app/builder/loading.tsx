export default function BuilderLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <div className="bg-muted h-1.5 w-full animate-pulse rounded-full" />
        <div className="flex justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-muted h-3 w-14 animate-pulse rounded-full" />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="bg-muted h-9 w-80 animate-pulse rounded-full" />
        <div className="bg-muted h-5 w-64 animate-pulse rounded-full" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-muted h-24 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
