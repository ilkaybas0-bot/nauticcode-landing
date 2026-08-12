export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center font-mono text-xs text-text-secondary sm:flex-row sm:text-left lg:px-8">
        <p>© {year} NauticCode. All rights reserved.</p>
        <a href="/privacy" className="transition-colors hover:text-accent-cyan">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
