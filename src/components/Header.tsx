'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-luxury-black/70 backdrop-blur-md border-b border-gold-champagne/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">
        
        {/* Lado Esquerdo: Seletor de Idioma */}
        <div className="flex items-center space-x-1 sm:space-x-2 w-1/3 justify-start">
          <button
            onClick={() => setLanguage('pt')}
            className={`text-[10px] sm:text-xs font-semibold tracking-widest transition-all duration-300 px-2 py-1 rounded ${
              language === 'pt'
                ? 'text-gold-metallic border-b-2 border-gold-metallic font-bold'
                : 'text-luxury-ink hover:text-luxury-gray'
            }`}
            aria-label="Alterar idioma para Português"
          >
            PT
          </button>
          <span className="text-luxury-ink/20 text-xs">/</span>
          <button
            onClick={() => setLanguage('en')}
            className={`text-[10px] sm:text-xs font-semibold tracking-widest transition-all duration-300 px-2 py-1 rounded ${
              language === 'en'
                ? 'text-gold-metallic border-b-2 border-gold-metallic font-bold'
                : 'text-luxury-ink hover:text-luxury-gray'
            }`}
            aria-label="Change language to English"
          >
            EN
          </button>
        </div>

        {/* Centro: Logotipo */}
        <div className="flex justify-center w-1/3">
          <a href="#" className="relative block group" aria-label="Al Reem Home">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Al Reem Restaurant"
                fill
                priority
                className="object-contain"
              />
            </div>
          </a>
        </div>

        {/* Lado Direito: Botão CTA */}
        <div className="flex justify-end w-1/3">
          <a
            href="#booking"
            className="relative overflow-hidden group border border-gold-champagne/30 text-gold-champagne hover:text-luxury-black font-sans text-[10px] sm:text-xs font-semibold tracking-widest uppercase py-2 sm:py-2.5 px-3 sm:px-5 rounded-sm transition-all duration-500 ease-in-out"
          >
            {/* Efeito de preenchimento elegante no hover */}
            <span className="absolute inset-0 w-full h-full bg-gold-champagne scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-[-1]" />
            <span className="relative z-10 transition-colors duration-300">
              {t('bookTable')}
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
