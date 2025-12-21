import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Profecia Cultural",
    template: "%s | Profecia Cultural" 
  },
  description: "Produtora cultural focada em sergipanidade, ancestralidade e cultura negra. Conheça nossos eventos de samba, rodas de conversas, oficinas educacionais e mostras de cinema.",
  keywords: ["cultura", "sergipe", "produção cultural", "dança", "tobias barreto", "aracaju", "samba", "música", "oficinas", "eventos culturais"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        {children}
      </body>
    </html>
  );
}
