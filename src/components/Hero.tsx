'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videorestaurante.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/90 via-luxury-black/45 to-luxury-black z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        {/* Text Container with Max Width to Avoid Long Line Lengths */}
        <div className="max-w-4xl space-y-6 md:space-y-8">
          
          {/* Subtle gold line indicator above the main title */}
          <div className="flex items-center justify-center space-x-4">
            <span className="w-8 h-[1px] bg-gold-champagne/40" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-gold-champagne uppercase font-sans">
              Porto, Portugal
            </span>
            <span className="w-8 h-[1px] bg-gold-champagne/40" />
          </div>

          {/* Heading - H1 for SEO */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-gold-metallic leading-[1.15] tracking-wide text-balance">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-xl text-luxury-gray/85 font-light tracking-wide max-w-2xl mx-auto leading-relaxed text-pretty">
            {t('heroSubtitle')}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href="#booking"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-champagne text-luxury-black font-semibold text-xs md:text-sm tracking-widest uppercase rounded-sm hover:bg-gold-metallic transition-all duration-300 shadow-lg shadow-gold-champagne/10 text-center"
            >
              {t('bookTable')}
            </a>
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-3.5 border border-luxury-gray/25 text-luxury-gray font-semibold text-xs md:text-sm tracking-widest uppercase rounded-sm hover:border-gold-champagne hover:text-gold-champagne transition-all duration-300 text-center"
            >
              {t('menuTitle')}
            </a>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <a href="#menu" className="flex flex-col items-center" aria-label="Scroll to menu">
            <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-ink/80 font-sans">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-gold-champagne animate-bounce mt-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
