'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CustomDatePicker from './CustomDatePicker';

export default function BookingForm() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'reservation' | 'question'>('reservation');
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [dateTime, setDateTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    let text = '';

    if (activeTab === 'reservation') {
      if (language === 'en') {
        text = `Hello Al Reem! I would like to request a reservation.\nName: ${name}\nGuests: ${guests}\nDate/Time: ${dateTime}`;
      } else {
        text = `Olá Al Reem! Gostaria de solicitar uma reserva.\nNome: ${name}\nPessoas: ${guests}\nData/Hora: ${dateTime}`;
      }
    } else {
      if (language === 'en') {
        text = `Hello Al Reem! I have a question.\nName: ${name}\nMessage: ${message}`;
      } else {
        text = `Olá Al Reem! Tenho uma dúvida.\nNome: ${name}\nMensagem: ${message}`;
      }
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/351924971772?text=${encodedText}`;

    // Simulando um loading premium antes do redirecionamento
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="booking" className="w-full bg-luxury-charcoal py-20 sm:py-28 md:py-36 border-t border-gold-champagne/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4 gsap-reveal">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-gold-champagne uppercase font-sans block">
            {t('tabReservation')} & {t('tabQuestion')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-luxury-gray leading-tight">
            {t('bookingTitle')}
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne/45 mx-auto my-4" />
          <p className="text-sm text-luxury-ink tracking-wide font-light max-w-lg mx-auto leading-relaxed">
            {t('bookingSubtitle')}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-luxury-black/45 border border-gold-champagne/15 rounded-md p-6 sm:p-10 md:p-12 shadow-2xl relative gsap-reveal">
          
          {/* Tabs Selector */}
          <div className="flex border-b border-white/5 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => setActiveTab('reservation')}
              className={`flex-1 pb-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-center border-b transition-all duration-300 ${
                activeTab === 'reservation'
                  ? 'border-gold-champagne text-gold-champagne'
                  : 'border-transparent text-luxury-ink hover:text-luxury-gray'
              }`}
            >
              {t('tabReservation')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('question')}
              className={`flex-1 pb-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-center border-b transition-all duration-300 ${
                activeTab === 'question'
                  ? 'border-gold-champagne text-gold-champagne'
                  : 'border-transparent text-luxury-ink hover:text-luxury-gray'
              }`}
            >
              {t('tabQuestion')}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Nome - Comum para ambos */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gold-champagne/80 font-sans">
                {t('labelName')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('placeholderName')}
                className="w-full bg-luxury-black/60 border border-white/10 rounded-sm py-3 px-4 text-sm text-luxury-gray placeholder-luxury-ink/65 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/20 transition-all duration-300"
              />
            </div>

            {/* Campos condicionalmente animados (Aba Reserva) */}
            <div
              className={`transition-opacity duration-300 ${
                activeTab === 'reservation'
                  ? 'opacity-100 pointer-events-auto block'
                  : 'opacity-0 pointer-events-none hidden'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Campo Convidados */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wider text-gold-champagne/80 font-sans">
                    {t('labelGuests')}
                  </label>
                  <select
                    id="guests"
                    required={activeTab === 'reservation'}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-luxury-black/60 border border-white/10 rounded-sm py-3.5 px-4 text-sm text-luxury-gray focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/20 transition-all duration-300 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num} className="bg-luxury-charcoal text-luxury-gray">
                        {num} {num === 1 ? (language === 'en' ? 'Person' : 'Pessoa') : (language === 'en' ? 'People' : 'Pessoas')}
                      </option>
                    ))}
                    <option value="10+" className="bg-luxury-charcoal text-luxury-gray">10+ ({language === 'en' ? 'Contact us' : 'Contactar'})</option>
                  </select>
                </div>

                {/* Campo Data e Hora Customizado */}
                <CustomDatePicker
                  value={dateTime}
                  onChange={(val) => setDateTime(val)}
                />

              </div>
            </div>

            {/* Campo Mensagem animado (Aba Dúvidas) */}
            <div
              className={`transition-opacity duration-300 ${
                activeTab === 'question'
                  ? 'opacity-100 pointer-events-auto block'
                  : 'opacity-0 pointer-events-none hidden'
              }`}
            >
              <div className="flex flex-col space-y-2 pt-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gold-champagne/80 font-sans">
                  {t('labelMessage')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required={activeTab === 'question'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('placeholderMessage')}
                  className="w-full bg-luxury-black/60 border border-white/10 rounded-sm py-3 px-4 text-sm text-luxury-gray placeholder-luxury-ink/65 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/20 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            {/* Botão de Envio */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group py-3.5 bg-gold-champagne hover:bg-gold-metallic disabled:bg-luxury-ink/40 text-luxury-black font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm shadow-xl shadow-gold-champagne/5 transition-all duration-500 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>{t('toastSuccess')}</span>
                ) : (
                  <span>
                    {activeTab === 'reservation'
                      ? t('btnSubmitReservation')
                      : t('btnSubmitQuestion')}
                  </span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
