import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700"] });
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
