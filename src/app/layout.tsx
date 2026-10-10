import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";

import { themeScript } from "@/lib/theme";
import { site } from "@/data/site";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nether Ninjas — Minecraft Content Studio",
    template: "%s · Nether Ninjas",
  },
  description: site.description,
  openGraph: {
    siteName: "Nether Ninjas",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Applies the saved/system theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
