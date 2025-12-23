"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "../styles/Header.module.css";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("PT");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (!mounted) {
    return <div className="h-20 w-full fixed top-0 z-50 bg-transparent" />;
  }

  const getLinkClass = (path: string) => {
    return `${styles.navLink} ${pathname === path ? styles.navLinkActive : ""}`;
  };

  const getMobileLinkClass = (path: string) => {
    return `${styles.mobileNavLink} ${pathname === path ? styles.mobileNavLinkActive : ""}`;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : styles.headerTransparent}`}>
      <div className={styles.Innercontainer}>
        
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
          <div className="relative hidden min-[450px]:block w-40 h-20 lg:w-48 lg:h-12 transition-all duration-300"> 
            <Image 
              src="/assets/logoNome.png" 
              alt="Profecia Cultural" 
              fill 
              className="object-contain object-left" 
            />
          </div>
        </Link>

        <nav className={styles.navDesktop}>
          
          <Link href="/" className={getLinkClass("/")}>Início</Link>
          <Link href="/projetos" className={getLinkClass("/projetos")}>Projetos</Link>
          <Link href="/sobre" className={getLinkClass("/sobre")}>Sobre Nós</Link>
          <Link href="/contato" className={getLinkClass("/contato")}>Contato</Link>

          <div className={styles.separator} />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-1 rounded-full hover:text-primary transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Alternar Tema"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

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

        <div className={styles.mobileOnly}>
          <button 
            className={styles.iconButton} 
            aria-label="Alternar Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className="flex flex-col gap-6 p-6">
            <Link href="/" className={getMobileLinkClass("/")} onClick={() => setIsMenuOpen(false)}>Início</Link>
            <Link href="/projetos" className={getMobileLinkClass("/projetos")} onClick={() => setIsMenuOpen(false)}>Projetos</Link>
            <Link href="/sobre" className={getMobileLinkClass("/sobre")} onClick={() => setIsMenuOpen(false)}>Sobre Nós</Link>
            <Link href="/contato" className={getMobileLinkClass("/contato")} onClick={() => setIsMenuOpen(false)}>Contato</Link>

            <div className={styles.mobileTools}>
               <div className="flex items-center gap-3 justify-between border-t border-border pt-4">
                  <span className="text-base font-medium">Alternar Tema</span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full bg-accent text-accent-foreground"
                  >
                    {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
               </div>

               <div className="flex items-center gap-3 justify-between pt-2">
                  <span className="text-base font-medium">Idioma</span>
                  <div className="flex gap-2">
                    <button onClick={() => setLang("PT")} className={`${styles.langOption} ${lang === "PT" ? styles.langActive : ""}`}>PT</button>
                    <span>|</span>
                    <button onClick={() => setLang("EN")} className={`${styles.langOption} ${lang === "EN" ? styles.langActive : ""}`}>EN</button>
                    <span>|</span>
                    <button onClick={() => setLang("ES")} className={`${styles.langOption} ${lang === "ES" ? styles.langActive : ""}`}>ES</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}