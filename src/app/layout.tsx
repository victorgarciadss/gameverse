import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../contexts/ToastProvider";
import { ToastContainer } from "react-toastify";



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
        <ToastProvider>
          <ToastContainer />
          {children}
        </ToastProvider>
        
      </body>
    </html>
  );
}
