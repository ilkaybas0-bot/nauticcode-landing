import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://nauticcode.com";
const SITE_TITLE = "NauticCode — B2B Software Engineering";
const SITE_DESCRIPTION =
  "We engineer resilient custom software, autonomous AI workflows, and cloud infrastructure designed to scale your operational velocity.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — NauticCode",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "B2B software engineering",
    "custom AI agents",
    "RAG pipelines",
    "enterprise software development",
    "cloud infrastructure",
    "DevOps automation",
    "AI workflow automation",
  ],
  authors: [{ name: "NauticCode" }],
  creator: "NauticCode",
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "NauticCode",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#070B12",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NauticCode",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description: SITE_DESCRIPTION,
  slogan: "B2B Software Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
