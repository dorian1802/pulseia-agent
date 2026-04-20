import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-white/50 text-lg mb-8">Page non trouvée</p>
        <Link
          href="/fr"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}