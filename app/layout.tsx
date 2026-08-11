import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
