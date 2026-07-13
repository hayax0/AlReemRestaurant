import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuGrid from '@/components/MenuGrid';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import ScrollManager from '@/components/ScrollManager';

export default function Home() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main className="flex-grow w-full bg-luxury-black">
        <Hero />
        <MenuGrid />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
