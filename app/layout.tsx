import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Lightsaber Designs",
  description: "A gallery of lightsaber designs from the Star Wars universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cinzel.variable}`}>{children}</body>
    </html>
  );
}
