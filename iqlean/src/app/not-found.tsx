import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-gold">404</p>
        <h1 className="h-section mt-3">Tu jest już czysto.</h1>
        <p className="lead mt-4 text-mute">Tej strony nie ma.</p>
        <ButtonLink href="/" className="mt-8">Strona główna</ButtonLink>
      </div>
    </main>
  );
}
