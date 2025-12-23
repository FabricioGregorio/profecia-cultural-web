import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface Parceiro {
  _id: string;
  nome: string;
  logoUrl: string;
  url?: string;
}

async function getParceiros(locale: string) {
  const query = `*[_type == "parceiro" && (language == $locale || !defined(language))] | order(nome asc) {
    _id,
    nome,
    "logoUrl": logo.asset->url,
    url
  }`;
  return await client.fetch<Parceiro[]>(query, { locale });
}

export default async function Footer({ locale }: { locale: string }) {
  const parceiros = await getParceiros(locale);
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Identidade */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                 <Image 
                   src="/assets/logo.png" 
                   alt="Profecia Cultural Logo" 
                   fill
                   className="object-contain"
                 />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-primary">
                Profecia Cultural
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs font-sans">
              {t('description')}
            </p>
          </div>

          {/* Coluna 2: Parceiros */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="font-bold text-lg text-primary">{t('partners')}</h3>
            <div className="flex flex-col items-start space-y-3">
              {parceiros.length > 0 ? (
                parceiros.map((parceiro) => (
                  <Link 
                    key={parceiro._id} 
                    href={parceiro.url || "#"} 
                    target={parceiro.url ? "_blank" : "_self"}
                    className="flex items-center gap-3 group w-fit"
                  >
                    {parceiro.logoUrl && (
                      <div className="relative w-8 h-8">
                        <Image
                          src={parceiro.logoUrl}
                          alt={parceiro.nome}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      {parceiro.nome}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('noPartners')}
                </p>
              )}
            </div>
          </div>

          {/* Coluna 3: Contatos e Redes */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="font-bold text-lg text-primary">{t('connect')}</h3>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.instagram.com/profecia.cultural/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@Profecia.Cultural" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="mailto:profeciacultural@gmail.com" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>profeciacultural@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Profecia Cultural. {t('rights')}
          </p>
          
          <Link 
            href="/studio" 
            target="_blank"
            className="text-xs text-muted-foreground/30 hover:text-primary hover:opacity-100 transition-all duration-300"
          >
            {t('adminArea')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
