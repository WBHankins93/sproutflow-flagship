// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

import { Manrope, Open_Sans, Fira_Code } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sproutflow | Professional Web Design for Serious Businesses",
  description: "Enterprise-level web design for small businesses ready to compete. Custom websites that convert. $750-$5,000. Launch in 1-4 weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${openSans.variable} ${firaCode.variable} antialiased`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}