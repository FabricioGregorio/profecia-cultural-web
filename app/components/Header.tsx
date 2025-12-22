"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "../styles/Header.module.css";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("PT");
  
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-20 bg-background/80" />;
  }

  const getLinkClass = (path: string) => {
    return `${styles.navLink} ${pathname === path ? styles.navLinkActive : ""}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.Innercontainer}>
        
        {/* --- LADO ESQUERDO: LOGOS --- */}
        <Link href="/" className={styles.logoArea}>
          <div className="relative w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300"> 
            <Image 
              src="/assets/logo.png" 
              alt="Ícone Profecia" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <div className="relative hidden sm:block w-40 h-20 lg:w-48 lg:h-12 transition-all duration-300"> 
            <Image 
              src="/assets/logoNome.png" 
              alt="Profecia Cultural" 
              fill 
              className="object-contain object-left" 
            />
          </div>
        </Link>

        {/* --- LADO DIREITO: MENU + FERRAMENTAS --- */}
        <nav className={styles.navDesktop}>
          
          <Link href="/" className={getLinkClass("/")}>Início</Link>
          <Link href="/projetos" className={getLinkClass("/projetos")}>Projetos</Link>
          <Link href="/sobre" className={getLinkClass("/sobre")}>Sobre Nós</Link>
          <Link href="/contato" className={getLinkClass("/contato")}>Contato</Link>

          {/* Divisória Visual */}
          <div className={styles.separator} />

          {/* Botão de Tema */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-1 rounded-full hover:text-primary transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Alternar Tema"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Seletor de Idioma */}
          <div className={styles.langSelector}>
            <button 
              onClick={() => setLang("PT")} 
              className={`${styles.langOption} ${lang === "PT" ? styles.langActive : ""}`}
            >
              PT
            </button>
            <span>|</span>
            <button 
              onClick={() => setLang("EN")} 
              className={`${styles.langOption} ${lang === "EN" ? styles.langActive : ""}`}
            >
              EN
            </button>
            <span>|</span>
            <button 
              onClick={() => setLang("ES")} 
              className={`${styles.langOption} ${lang === "ES" ? styles.langActive : ""}`}
            >
              ES
            </button>
          </div>
        </nav>

        {/* --- MENU MOBILE --- */}
        <div className={styles.mobileOnly}>
          <button className={styles.iconButton} aria-label="Abrir Menu">
            <Menu size={28} />
          </button>
        </div>

      </div>
    </header>
  );
}