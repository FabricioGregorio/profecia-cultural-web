import type { Metadata } from "next";
import { Noto_Sans, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body
        className={`${notoSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
