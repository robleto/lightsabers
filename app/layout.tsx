import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";

const inter = localFont({ src: "./fonts/Inter.ttf", weight: "100 900" });
const cinzel = localFont({ src: "./fonts/Cinzel.ttf", variable: "--font-cinzel", weight: "400 900" });
const lato = localFont({
  src: [
    { path: "./fonts/Lato-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Lato-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-lato",
});
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
      <body className={`${inter.className} ${cinzel.variable} ${lato.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
