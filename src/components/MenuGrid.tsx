'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface Dish {
  id: number;
  image: string;
  key: 'dish1' | 'dish2' | 'dish3' | 'dish4' | 'dish5' | 'dish6' | 'dish7';
  gridClass: string;
  heightClass: string;
}

const dishes: Dish[] = [
  { 
    id: 1, 
    image: '/prato1.jpg', 
    key: 'dish1', 
    gridClass: 'col-span-12 md:col-span-8', 
    heightClass: 'h-64 sm:h-80 md:h-[450px]' 
  },
  { 
    id: 2, 
    image: '/prato2.jpg', 
    key: 'dish2', 
    gridClass: 'col-span-12 md:col-span-4', 
    heightClass: 'h-64 sm:h-80 md:h-[450px]' 
  },
  { 
    id: 3, 
    image: '/prato3.jpg', 
    key: 'dish3', 
    gridClass: 'col-span-12 sm:col-span-6 md:col-span-5', 
    heightClass: 'h-64 sm:h-80 md:h-[400px]' 
  },
  { 
    id: 4, 
    image: '/prato4.jpg', 
    key: 'dish4', 
    gridClass: 'col-span-12 sm:col-span-6 md:col-span-7', 
    heightClass: 'h-64 sm:h-80 md:h-[400px]' 
  },
  { 
    id: 5, 
    image: '/prato5.jpg', 
    key: 'dish5', 
    gridClass: 'col-span-12 md:col-span-6', 
    heightClass: 'h-64 sm:h-80 md:h-[420px]' 
  },
  { 
    id: 6, 
    image: '/prato6.jpg', 
    key: 'dish6', 
    gridClass: 'col-span-12 md:col-span-6', 
    heightClass: 'h-64 sm:h-80 md:h-[420px]' 
  },
  { 
    id: 7, 
    image: '/prato7.jpg', 
    key: 'dish7', 
    gridClass: 'col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3', 
    heightClass: 'h-64 sm:h-80 md:h-[480px]' 
  },
];

export default function MenuGrid() {
  const { language, t } = useLanguage();

  return (
    <section id="menu" className="w-full bg-luxury-black py-20 sm:py-28 md:py-36 border-t border-gold-champagne/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4 gsap-reveal">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-gold-champagne uppercase font-sans block">
            {t('menuTitle')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-gray leading-tight">
            AL REEM SIGNATURES
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne/45 mx-auto my-6" />
          <p className="text-sm md:text-base text-luxury-ink tracking-wide font-light max-w-xl mx-auto">
            {t('menuSubtitle')}
          </p>
        </div>

        {/* Grid de Gastronomia (Editorial/Bespoke Layout) */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 gsap-grid">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className={`${dish.gridClass} gsap-grid-item group relative overflow-hidden bg-luxury-charcoal border border-white/[0.03] hover:border-gold-champagne/30 rounded-sm shadow-xl hover:shadow-gold-champagne/[0.02] transition-all duration-500 ease-out`}
            >
              {/* Image Container - mantendo o tamanho original sem zoom na imagem */}
              <div className={`relative ${dish.heightClass} w-full overflow-hidden`}>
                <Image
                  src={dish.image}
                  alt={t(dish.key)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                  priority={dish.id <= 2}
                />
                
                {/* Subtle dark overlay that darkens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-all duration-500 group-hover:via-black/35 z-10" />

                {/* Legend Container */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-20 flex flex-col justify-end">
                  
                  {/* Dish Number */}
                  <span className="text-[10px] font-semibold text-gold-champagne tracking-[0.2em] mb-2 uppercase font-sans opacity-90">
                    N° 0{dish.id}
                  </span>
                  
                  {/* Dish Name/Description */}
                  <p className="text-base sm:text-lg md:text-xl font-serif text-luxury-gray tracking-wide leading-snug group-hover:text-gold-metallic transition-colors duration-300">
                    {t(dish.key)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco Gancho / Call to Action Final do Cardápio */}
        <div className="mt-16 sm:mt-24 bg-luxury-charcoal/40 border border-gold-champagne/10 rounded-sm p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto gsap-reveal">
          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-lg sm:text-xl font-serif text-gold-metallic tracking-wide">
              {language === 'en' ? 'A Culinary Journey Awaits' : 'Uma Viagem Culinária à sua Espera'}
            </h3>
            <p className="text-sm text-luxury-ink leading-relaxed font-light font-sans max-w-2xl">
              {t('menuHook')}
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <a
              href="#booking"
              className="relative overflow-hidden group inline-flex w-full md:w-auto items-center justify-center border border-gold-champagne text-gold-champagne hover:text-luxury-black font-semibold text-xs tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-500 ease-in-out text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gold-champagne scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-[-1]" />
              <span className="relative z-10 transition-colors duration-300">
                {t('menuHookCTA')}
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
