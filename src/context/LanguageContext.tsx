'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

type TranslationKeys =
  | 'bookTable'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'menuTitle'
  | 'menuSubtitle'
  | 'dish1'
  | 'dish2'
  | 'dish3'
  | 'dish4'
  | 'dish5'
  | 'dish6'
  | 'dish7'
  | 'menuHook'
  | 'menuHookCTA'
  | 'bookingTitle'
  | 'bookingSubtitle'
  | 'tabReservation'
  | 'tabQuestion'
  | 'labelName'
  | 'labelGuests'
  | 'labelDateTime'
  | 'labelMessage'
  | 'placeholderName'
  | 'placeholderMessage'
  | 'btnSubmitReservation'
  | 'btnSubmitQuestion'
  | 'footerAddress'
  | 'footerHours'
  | 'footerPhone'
  | 'footerEmail'
  | 'footerFollow'
  | 'toastSuccess'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'hoursRange'
  | 'hoursTitle'
  | 'calSelectDate'
  | 'calSelectTime'
  | 'calClear'
  | 'calToday'
  | 'calWeekdays'
  | 'calMonths';

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    bookTable: 'Book Table',
    heroTitle: 'The Soul of Middle Eastern Cuisine, in the Heart of Porto.',
    heroSubtitle: 'Experience the freshness and elegance of the Mediterranean.',
    menuTitle: 'Signature Gastronomy',
    menuSubtitle: 'A sensory journey through traditional recipes crafted with modern elegance.',
    dish1: 'Golden Crispy Chicken Tenders with Signature Sauce',
    dish2: 'Al Reem Crispy Pastry Rolls with Herbs and Spices',
    dish3: 'Authentic Middle Eastern Smoked Salad with Crispy Toppings',
    dish4: 'Premium Selection of Middle Eastern Mezza & Dips with Fresh Pita Bread',
    dish5: 'Gourmet Sautéed Prawns in Garlic Infused Olive Oil',
    dish6: 'Silky Smooth Velvet Hummus with Premium Olive Oil and Whole Chickpeas',
    dish7: 'Golden Fried Crunchy Prawns with Creamy Dipping Sauce',
    menuHook: "Our curated signatures represent only a fraction of Al Reem's culinary journey. We invite you to join us and explore our full, seasonal menu, rich in Middle Eastern legacy.",
    menuHookCTA: 'Reserve a Table to Discover More',
    bookingTitle: 'Table Reservations & Inquiries',
    bookingSubtitle: 'Book your elite culinary experience or reach out directly to our team via WhatsApp.',
    tabReservation: 'Make a Reservation',
    tabQuestion: 'Ask a Question',
    labelName: 'Full Name',
    labelGuests: 'Number of Guests',
    labelDateTime: 'Date & Time',
    labelMessage: 'Your Message',
    placeholderName: 'Enter your name...',
    placeholderMessage: 'How can we help you?',
    btnSubmitReservation: 'Book Table via WhatsApp',
    btnSubmitQuestion: 'Send Message via WhatsApp',
    footerAddress: 'R. de Sá da Bandeira, 80 • Porto, Portugal.',
    footerHours: 'Welcome! We are open and look forward to serving you until 23:00.',
    footerPhone: '+351 924 971 772',
    footerEmail: 'contact@alreemrestaurant.com',
    footerFollow: 'Follow our journey',
    toastSuccess: 'Redirecting to WhatsApp...',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    hoursRange: '12:00 PM - 11:00 PM',
    hoursTitle: 'Opening Hours',
    calSelectDate: 'Select Date',
    calSelectTime: 'Select Time',
    calClear: 'Clear',
    calToday: 'Today',
    calWeekdays: 'S,M,T,W,T,F,S',
    calMonths: 'January,February,March,April,May,June,July,August,September,October,November,December',
  },
  pt: {
    bookTable: 'Reservar Mesa',
    heroTitle: 'A Alma da Cozinha do Médio Oriente, no Coração do Porto.',
    heroSubtitle: 'Experimente a frescura e a elegância do Médio Oriente.',
    menuTitle: 'Gastronomia de Assinatura',
    menuSubtitle: 'Uma viagem sensorial através de receitas tradicionais preparadas com elegância moderna.',
    dish1: 'Tiras de Frango Crocantes com Molho de Assinatura',
    dish2: 'Rolinhos de Massa Crocante Al Reem com Ervas e Especiarias',
    dish3: 'Autêntica Salada Fumegante do Médio Oriente com Topping Crocante',
    dish4: 'Seleção Premium de Mezza e Pastas do Médio Oriente com Pão Pita Fresco',
    dish5: 'Camarões Salteados Gourmet em Azeite de Alho Infundido',
    dish6: 'Húmus Aveludado com Azeite Premium e Grão-de-Bico Inteiro',
    dish7: 'Camarões Panados Crocantes com Molho Cremoso',
    menuHook: 'As nossas assinaturas representam apenas uma fração da jornada gastronómica do Al Reem. Convidamo-lo a visitar-nos e a descobrir a nossa ementa sazonal completa, rica em herança do Médio Oriente.',
    menuHookCTA: 'Reserve uma Mesa para Descobrir Mais',
    bookingTitle: 'Reservas de Mesas e Dúvidas',
    bookingSubtitle: 'Agende a sua experiência gastronómica de elite ou fale diretamente com a nossa equipa via WhatsApp.',
    tabReservation: 'Fazer Reserva',
    tabQuestion: 'Tirar Dúvidas',
    labelName: 'Nome Completo',
    labelGuests: 'Número de Pessoas',
    labelDateTime: 'Data e Hora',
    labelMessage: 'Sua Mensagem',
    placeholderName: 'Insira o seu nome...',
    placeholderMessage: 'Como podemos ajudar?',
    btnSubmitReservation: 'Reservar Mesa via WhatsApp',
    btnSubmitQuestion: 'Enviar Mensagem via WhatsApp',
    footerAddress: 'R. de Sá da Bandeira, 80 • Porto, Portugal.',
    footerHours: 'Bem-vindo! Estamos abertos e ansiosos por servir-lhe até às 23:00.',
    footerPhone: '+351 924 971 772',
    footerEmail: 'contact@alreemrestaurant.com',
    footerFollow: 'Siga a nossa jornada',
    toastSuccess: 'A redirecionar para o WhatsApp...',
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
    hoursRange: '12:00 - 23:00',
    hoursTitle: 'Horário de Funcionamento',
    calSelectDate: 'Selecione a Data',
    calSelectTime: 'Selecione a Hora',
    calClear: 'Limpar',
    calToday: 'Hoje',
    calWeekdays: 'D,S,T,Q,Q,S,S',
    calMonths: 'Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro',
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt'); // Default to PT for Portugal

  // Attempt to load from localStorage if on client
  useEffect(() => {
    const saved = localStorage.getItem('alreem-lang') as Language;
    if (saved === 'en' || saved === 'pt') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('alreem-lang', lang);
  };

  const t = (key: TranslationKeys) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
