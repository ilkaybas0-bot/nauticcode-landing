import { TerminalSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <>
      <Header />

      <main
        id="main-content"
        className="relative flex min-h-[70vh] items-center justify-center pb-24 pt-40 lg:pt-48"
      >
        <div className="mx-auto w-full max-w-lg px-6 lg:px-8">
          <div className="glass overflow-hidden rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-black/20 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                <TerminalSquare size={12} />
                mogens — 404.sh
              </span>
            </div>

            <div className="space-y-2.5 px-6 py-8 font-mono text-[13px] leading-relaxed">
              <p className="text-text-secondary">$ mogens resolve --route</p>
              <p className="text-red-400">
                ✗ 404 — route not found in system graph
              </p>
              <p className="text-text-secondary">
                &gt; the page you requested doesn&apos;t exist or has moved.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-md bg-accent-cyan px-4 py-2 font-mono text-xs font-semibold text-bg shadow-glow-cyan transition-all hover:shadow-glow-cyan-lg"
                >
                  cd ~/home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
