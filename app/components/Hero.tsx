"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from 'next-intl';

const HERO_PHOTOS = [
  { 
    id: 1, 
    src: "/assets/hero/tobiArte.jpg",
    alt: "Samba em Rodas 2", 
    className: "col-span-1 row-span-2" 
  },
  { 
    id: 2, 
    src: "/assets/hero/oficina-Vinil.jpg", 
    alt: "Oficina: Dialogando ao som do Vinil", 
    className: "col-span-2 row-span-1" 
  },
  { 
    id: 3, 
    src: "/assets/hero/sambaEmRodas1-lotado.jpg", 
    alt: "Samba em Rodas 1", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 4, 
    src: "/assets/hero/sambaEmRodas1Equipe.jpg", 
    alt: "Equipe e artistas do Samba em Rodas 1", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 5, 
    src: "/assets/hero/samba7.jpg", 
    alt: "Ensaio de 7", 
    className: "col-span-2 row-span-1" 
  },
];

export default function Hero() {
  const t = useTranslations('hero');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="relative w-full h-[100dvh] bg-background overflow-hidden">

      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-0.5 grid-flow-dense">
        {HERO_PHOTOS.map((photo) => (
          <motion.div 
            layoutId={`card-${photo.id}`}
            key={photo.id} 
            onClick={() => setSelectedId(photo.id)}
            className={`relative group cursor-pointer ${photo.className}`}
            whileHover={{ scale: 1.05, zIndex: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-muted" />
            
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover w-full h-full transition-all duration-700 ease-in-out
                         grayscale group-hover:grayscale-0"
              priority={photo.id <= 2}
            />
            
            <div className="absolute inset-0 bg-white/10 dark:bg-black/60 transition-opacity duration-500 group-hover:opacity-0" />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 drop-shadow-md pointer-events-auto"
        >
          {t('title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-foreground/90 max-w-2xl font-sans font-medium pointer-events-auto"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedId(null)}
          >
            {(() => {
              const photo = HERO_PHOTOS.find((p) => p.id === selectedId);
              if (!photo) return null;

              // Ajusta o tamanho do modal baseado no formato da imagem (Vertical, Horizontal ou Quadrada)
              let modalSizeClass = "w-full max-w-5xl aspect-[16/9]"; // Padrão Horizontal
              
              if (photo.className.includes("row-span-2")) {
                modalSizeClass = "h-[85vh] aspect-[9/16]"; // Vertical
              } else if (!photo.className.includes("col-span-2")) {
                modalSizeClass = "h-[70vh] aspect-square"; // Quadrada
              }

              return (
                <motion.div
                  layoutId={`card-${photo.id}`}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`relative flex flex-col bg-background rounded-lg overflow-hidden shadow-2xl ${modalSizeClass}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative flex-grow w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 bg-background text-foreground border-t border-border shrink-0"
                  >
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-center">{photo.alt}</h3>
                  </motion.div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}