// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Manrope, Open_Sans, Fira_Code } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap", // Add this
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap", // Add this
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap", // Add this
});

export const metadata: Metadata = {
  title: "Sproutflow | Professional Web Design for Small Businesses",
  description: "Fortune 500-level design psychology with small business heart. No impossible budgets. Custom websites from $750-$5K.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${openSans.variable} ${firaCode.variable} antialiased font-body`}
      >
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}