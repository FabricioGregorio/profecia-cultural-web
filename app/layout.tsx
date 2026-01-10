import type { Metadata } from "next";
import { Noto_Sans, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Profecia Cultural",
    template: "%s | Profecia Cultural" 
  },
  description: "Produtora cultural focada em sergipanidade, ancestralidade e cultura negra. Conheça nossos eventos de samba, rodas de conversas, oficinas educacionais e mostras de cinema.",
  keywords: ["cultura", "sergipe", "produção cultural", "dança", "tobias barreto", "aracaju", "samba", "música", "oficinas", "eventos culturais"],
  icons: {
    icon: "/assets/icon.png",
    apple: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${notoSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
