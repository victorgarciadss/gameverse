import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GameVerse",
  description: "Blog sobre notícias e discussões sobre games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
