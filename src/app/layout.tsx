import type { Metadata } from "next";
import { Aref_Ruqaa, Carattere } from "next/font/google";
import "./globals.css";

const arefRuqaa = Aref_Ruqaa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-aref",
  display: "swap",
});

const carattere = Carattere({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carattere",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My AstroMood",
  description: "Stars in the palm of your hand",
  icons: {
    icon: [
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${arefRuqaa.variable} ${carattere.variable} font-aref antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
