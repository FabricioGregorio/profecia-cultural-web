"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from "@/i18n/routing";
import styles from "../styles/Header.module.css";

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

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
          
          <Link href="/" className={getLinkClass("/")}>{t('home')}</Link>
          <Link href="/eventos" className={getLinkClass("/eventos")}>{t('events')}</Link>
          <Link href="/sobre" className={getLinkClass("/sobre")}>{t('about')}</Link>
          <Link href="/contato" className={getLinkClass("/contato")}>{t('contact')}</Link>

          <div className={styles.separator} />

          <div className={styles.langSelector}>
            <button 
              onClick={() => switchLocale("pt")} 
              className={`${styles.langOption} ${locale === "pt" ? styles.langActive : ""}`}
            >
              PT
            </button>
            <span>|</span>
            <button 
              onClick={() => switchLocale("en")} 
              className={`${styles.langOption} ${locale === "en" ? styles.langActive : ""}`}
            >
              EN
            </button>
            <span>|</span>
            <button 
              onClick={() => switchLocale("es")} 
              className={`${styles.langOption} ${locale === "es" ? styles.langActive : ""}`}
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
            <Link href="/" className={getMobileLinkClass("/")} onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href="/eventos" className={getMobileLinkClass("/eventos")} onClick={() => setIsMenuOpen(false)}>{t('events')}</Link>
            <Link href="/sobre" className={getMobileLinkClass("/sobre")} onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <Link href="/contato" className={getMobileLinkClass("/contato")} onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>

            <div className={styles.mobileTools}>
               <div className="flex items-center gap-3 justify-between border-t border-border pt-4">
                  <span className="text-base font-medium">Idioma</span>
                  <div className="flex gap-2">
                    <button onClick={() => switchLocale("pt")} className={`${styles.langOption} ${locale === "pt" ? styles.langActive : ""}`}>PT</button>
                    <span>|</span>
                    <button onClick={() => switchLocale("en")} className={`${styles.langOption} ${locale === "en" ? styles.langActive : ""}`}>EN</button>
                    <span>|</span>
                    <button onClick={() => switchLocale("es")} className={`${styles.langOption} ${locale === "es" ? styles.langActive : ""}`}>ES</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}