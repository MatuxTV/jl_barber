import type { Metadata } from "next";
import { Playfair_Display,Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JL Barber",
  description: "Profesionálne strihanie a styling vlasov. Moderné trendy,individuálny prístup a príjemná atmosféra v srdci mesta.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased scroll-smooth`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
