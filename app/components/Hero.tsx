"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_PHOTOS = [
  { 
    id: 1, 
    src: "/assets/hero/tobiArte.jpg",
    alt: "Evento de Samba: Samba em Rodas 1", 
    className: "col-span-1 row-span-2" 
  },
  { 
    id: 2, 
    src: "/assets/hero/oficinaVinil.jpg", 
    alt: "Oficina de Discos Vinil", 
    className: "col-span-2 row-span-1" 
  },
  { 
    id: 3, 
    src: "/assets/hero/sambaEmRodas1.jpg", 
    alt: "Equipe do Evento de Samba em Rodas 1", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 4, 
    src: "/assets/hero/sambaEmRodas1Equipe.jpg", 
    alt: "Evento de Samba: Samba em Rodas 2", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 5, 
    src: "/assets/hero/samba7.jpg", 
    alt: "Evento de Samba: Ensaio de 7", 
    className: "col-span-2 row-span-1" 
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] bg-background overflow-hidden">

      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-0.5 grid-flow-dense">
        {HERO_PHOTOS.map((photo) => (
          <div key={photo.id} className={`relative overflow-hidden group ${photo.className}`}>
            <div className="absolute inset-0 bg-muted" />
            
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover w-full h-full transition-all duration-700 ease-in-out
                         grayscale group-hover:grayscale-0 
                         group-hover:scale-110"
              priority={photo.id <= 2}
            />
            
            <div className="absolute inset-0 bg-white/10 dark:bg-black/60 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 drop-shadow-md"
        >
          Profecia Cultural
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-foreground/90 max-w-2xl font-sans font-medium"
        >
          Sergipanidade, ancestralidade e a força da cultura negra em movimento.
        </motion.p>
      </div>
    </section>
  );
}