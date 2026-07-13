'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function ScrollManager() {
  useEffect(() => {
    // Registrar o plugin ScrollTrigger no GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Inicializar o Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sincronizar Lenis com ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Revelação individual de elementos com .gsap-reveal
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Revelação em Cascata (Stagger) dos cards de pratos no MenuGrid
    const gridItems = document.querySelectorAll('.gsap-grid-item');
    if (gridItems.length > 0) {
      gsap.fromTo(
        gridItems,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Limpar triggers e animações ao desmontar
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
