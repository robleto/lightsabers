import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";

const inter = localFont({ src: "./fonts/Inter.ttf", weight: "100 900" });
const cinzel = localFont({ src: "./fonts/Cinzel.ttf", variable: "--font-cinzel", weight: "400 900" });
// Applies the saved lights-on/off choice before first paint to avoid a flash.
const modeScript = `try{if(localStorage.getItem("saber-mode")==="dark")document.documentElement.dataset.mode="dark"}catch(e){}`;

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
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className={`${inter.className} ${cinzel.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
