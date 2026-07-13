'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const daysOfWeek = [
  { key: 'monday' },
  { key: 'tuesday' },
  { key: 'wednesday' },
  { key: 'thursday' },
  { key: 'friday' },
  { key: 'saturday' },
  { key: 'sunday' },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-luxury-black border-t border-gold-champagne/10 py-16 sm:py-20 md:py-24 text-luxury-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Layout Dividido: Informações à Esquerda, Google Maps à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16 gsap-reveal">
          
          {/* Lado Esquerdo: Info (Logo, Horários, Contactos) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            
            {/* Coluna 1: Logo e Sobre */}
            <div className="space-y-6">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo.png"
                  alt="Al Reem Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-luxury-ink/80 font-light tracking-widest uppercase font-sans">
                Al Reem Restaurant
              </p>
              <p className="text-xs text-luxury-ink/65 font-light leading-relaxed font-sans">
                Porto • Portugal
              </p>
            </div>

            {/* Coluna 2: Horários Detalhados (Tabela) */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-champagne font-sans">
                {t('hoursTitle')}
              </h3>
              <div className="w-6 h-[1px] bg-gold-champagne/45" />
              <div className="space-y-2 text-xs font-sans tracking-wide">
                {daysOfWeek.map((day) => (
                  <div key={day.key} className="flex flex-col border-b border-white/[0.03] pb-1">
                    <span className="text-luxury-ink text-[10px] font-medium uppercase tracking-wider">{t(day.key)}</span>
                    <span className="text-gold-champagne font-semibold mt-0.5">{t('hoursRange')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 3: Contactos & Redes */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-champagne font-sans">
                  Contact Us
                </h3>
                <div className="w-6 h-[1px] bg-gold-champagne/45" />
                <ul className="space-y-3 text-xs text-luxury-ink font-sans tracking-wide">
                  <li>
                    <span className="block text-[9px] uppercase tracking-wider text-gold-champagne/60 font-semibold mb-0.5">Phone</span>
                    <a
                      href="tel:+351924971772"
                      className="hover:text-gold-metallic font-medium transition-colors duration-300"
                    >
                      {t('footerPhone')}
                    </a>
                  </li>
                  <li>
                    <span className="block text-[9px] uppercase tracking-wider text-gold-champagne/60 font-semibold mb-0.5">Email</span>
                    <a
                      href="mailto:contact@alreemrestaurant.com"
                      className="hover:text-gold-metallic font-medium transition-colors duration-300"
                    >
                      {t('footerEmail')}
                    </a>
                  </li>
                  <li>
                    <span className="block text-[9px] uppercase tracking-wider text-gold-champagne/60 font-semibold mb-0.5">Location</span>
                    <address className="not-italic text-luxury-ink/90 leading-relaxed">
                      {t('footerAddress')}
                    </address>
                  </li>
                </ul>
              </div>

              {/* Redes Sociais */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-champagne/80 font-sans">
                  {t('footerFollow')}
                </h4>
                <a
                  href="https://www.instagram.com/alreemrestaurant.porto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs text-luxury-ink hover:text-gold-metallic transition-colors duration-300 font-sans"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-4 h-4 fill-current text-gold-champagne"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-medium">@alreemrestaurant.porto</span>
                </a>
              </div>
            </div>

          </div>

          {/* Lado Direito: Google Maps Incorporado (Luxo Escuro) */}
          <div className="lg:col-span-5 w-full h-[320px] rounded-sm overflow-hidden border border-gold-champagne/15 relative group shadow-2xl gsap-reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.5683402778644!2d-8.60830722340331!3d41.14725061103233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464eff59d5b03%3A0xe54ef9260c6d7d56!2sR.%20de%20S%C3%A1%20da%20Bandeira%2080%2C%204000-427%20Porto!5e0!3m2!1spt-PT!2spt!4v1783944400000!5m2!1spt-PT!2spt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert-[0.92] contrast-[1.1] opacity-75 group-hover:opacity-90 group-hover:invert-[0.9] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              title="Al Reem Restaurant Location"
            />
          </div>

        </div>

        {/* Linha Divisória de Direitos Autorais */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-luxury-ink/50 font-light tracking-wider space-y-4 sm:space-y-0 font-sans">
          <p>© {new Date().getFullYear()} Al Reem Restaurant. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
