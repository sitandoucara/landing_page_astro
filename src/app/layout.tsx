import type { Metadata } from "next";
import { Aref_Ruqaa, Carattere } from "next/font/google";
import "./globals.css";

// Body font (global)
const arefRuqaa = Aref_Ruqaa({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-aref",
  display: "swap",
});

// Logo font
const carattere = Carattere({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carattere",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AstroMood App",
  description: "Stars in the palm of your hand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
