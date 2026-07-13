'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CustomDatePickerProps {
  onChange: (val: string) => void;
  value: string;
}

export default function CustomDatePicker({ onChange, value }: CustomDatePickerProps) {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estados do Calendário
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Carrega as traduções dinâmicas
  const weekdays = t('calWeekdays').split(',');
  const months = t('calMonths').split(',');

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Atualiza o valor final quando data ou hora mudam
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const yearStr = selectedDate.getFullYear();
      const monthStr = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dateStr = String(selectedDate.getDate()).padStart(2, '0');
      
      let formattedVal = '';
      if (language === 'en') {
        // Formato Americano: MM/DD/YYYY @ HH:MM AM/PM
        formattedVal = `${monthStr}/${dateStr}/${yearStr} @ ${selectedTime}`;
      } else {
        // Formato Europeu: DD/MM/YYYY às HH:MM
        formattedVal = `${dateStr}/${monthStr}/${yearStr} às ${selectedTime}`;
      }
      onChange(formattedVal);
    } else {
      onChange('');
    }
  }, [selectedDate, selectedTime, language, onChange]);

  // Se o usuário selecionou uma data/hora no input nativo do placeholder
  const handleClear = () => {
    setSelectedDate(null);
    setSelectedTime('');
    onChange('');
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setCurrentDate(new Date());
  };

  // Lógica de cálculo dos dias do mês
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month); // 0 = Domingo, 1 = Segunda, etc.

  // Ajuste do offset com base no idioma (EN inicia no Domingo, PT na Segunda)
  const isPt = language === 'pt';
  const offset = isPt ? (firstDayIndex === 0 ? 6 : firstDayIndex - 1) : firstDayIndex;

  const prevMonthDays = getDaysInMonth(year, month - 1);

  // Geração da grade de dias
  const daysArray: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

  // Dias do mês anterior (preenchimento sutil)
  for (let i = offset - 1; i >= 0; i--) {
    const prevDay = prevMonthDays - i;
    const d = new Date(year, month - 1, prevDay);
    daysArray.push({ day: prevDay, isCurrentMonth: false, date: d });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    daysArray.push({ day: i, isCurrentMonth: true, date: d });
  }

  // Dias do próximo mês (para fechar a grade de 42 posições)
  const remaining = 42 - daysArray.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    daysArray.push({ day: i, isCurrentMonth: false, date: d });
  }

  // Horários disponíveis (12:00 às 23:00, de 30 em 30 mins)
  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = 12; hour <= 22; hour++) {
      for (let min = 0; min < 60; min += 30) {
        if (language === 'en') {
          // Formato AM/PM
          const isPm = hour >= 12;
          const displayHour = hour > 12 ? hour - 12 : hour;
          const minStr = String(min).padStart(2, '0');
          times.push(`${displayHour}:${minStr} ${isPm ? 'PM' : 'AM'}`);
        } else {
          // Formato 24h
          const hourStr = String(hour).padStart(2, '0');
          const minStr = String(min).padStart(2, '0');
          times.push(`${hourStr}:${minStr}`);
        }
      }
    }
    // Adiciona o último horário limite (23:00 / 11:00 PM)
    if (language === 'en') {
      times.push('11:00 PM');
    } else {
      times.push('23:00');
    }
    return times;
  };

  const timesList = generateTimes();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const tempToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < tempToday;
  };

  return (
    <div className="relative flex flex-col space-y-2" ref={containerRef}>
      <label className="text-xs font-semibold uppercase tracking-wider text-gold-champagne/80 font-sans">
        {t('labelDateTime')}
      </label>
      
      {/* Campo Input Customizado */}
      <div className="relative">
        <input
          type="text"
          readOnly
          required
          value={value}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          placeholder={language === 'en' ? 'Select Date & Time (MM/DD/YYYY)' : 'Selecione Data e Hora (DD/MM/AAAA)'}
          className="w-full bg-luxury-black/60 border border-white/10 rounded-sm py-3 px-4 pr-10 text-sm text-luxury-gray placeholder-luxury-ink/65 focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/20 cursor-pointer transition-all duration-300"
        />
        {/* Ícone de Calendário */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-champagne/80 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Popover do Calendário de Luxo */}
      {isOpen && (
        <>
          {/* Overlay de fundo apenas no Mobile para fechar no clique fora */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 sm:hidden animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          <div 
            onMouseDown={(e) => e.stopPropagation()}
            className="fixed inset-x-4 top-[10%] max-h-[80vh] overflow-y-auto sm:overflow-visible sm:max-h-none sm:absolute z-50 sm:mt-1 sm:top-full sm:left-0 sm:w-[580px] bg-luxury-charcoal border border-gold-champagne/20 rounded-md shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 animate-fadeIn transition-all duration-300 scrollbar-thin"
          >
          
          {/* Lado Esquerdo: Calendário */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 hover:text-gold-champagne transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-sm font-semibold tracking-wider text-luxury-gray uppercase font-serif">
                {months[month]} {year}
              </h3>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:text-gold-champagne transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekdays.map((wd, index) => (
                <span key={index} className="text-[10px] font-bold text-gold-champagne/60 uppercase font-sans">
                  {wd}
                </span>
              ))}
            </div>

            {/* Grid dos dias */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysArray.map((dayItem, index) => {
                const isDisabled = isPastDate(dayItem.date);
                const isSelected = isDateSelected(dayItem.date);
                
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setSelectedDate(dayItem.date)}
                    className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-medium font-sans transition-all duration-200 ${
                      !dayItem.isCurrentMonth
                        ? 'text-luxury-ink/20 hover:text-luxury-gray/40'
                        : isDisabled
                        ? 'text-luxury-ink/30 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-gold-champagne text-luxury-black font-semibold'
                        : 'text-luxury-gray hover:bg-gold-champagne/15'
                    }`}
                  >
                    {dayItem.day}
                  </button>
                );
              })}
            </div>

            {/* Ações Rápidas */}
            <div className="flex items-center justify-between border-t border-white/5 mt-4 pt-3 text-xs">
              <button
                type="button"
                onClick={handleToday}
                className="text-gold-champagne hover:text-gold-metallic font-medium transition-colors"
              >
                {t('calToday')}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-luxury-ink hover:text-luxury-gray transition-colors"
              >
                {t('calClear')}
              </button>
            </div>
          </div>

          {/* Lado Direito: Horários */}
          <div className="w-full sm:w-[180px] border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6 flex flex-col">
            <h4 className="text-[10px] font-bold text-gold-champagne/80 tracking-widest uppercase mb-3 text-center sm:text-left font-sans">
              {t('calSelectTime')}
            </h4>
            <div className="flex-1 max-h-[180px] sm:max-h-[220px] overflow-y-auto pr-1 grid grid-cols-3 sm:grid-cols-1 gap-1.5 scrollbar-thin">
              {timesList.map((tm, index) => {
                const isSelected = selectedTime === tm;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedTime(tm)}
                    className={`py-1.5 px-2 rounded-sm text-center text-xs font-sans tracking-wide transition-all duration-200 ${
                      isSelected
                        ? 'bg-gold-champagne text-luxury-black font-bold'
                        : 'bg-luxury-black/30 border border-white/5 text-luxury-ink hover:border-gold-champagne/40 hover:text-luxury-gray'
                    }`}
                  >
                    {tm}
                  </button>
                );
              })}
            </div>
          </div>

          </div>
        </>
      )}
    </div>
  );
}
