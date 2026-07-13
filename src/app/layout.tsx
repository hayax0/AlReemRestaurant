import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Reem | Premium Middle Eastern Cuisine in Porto",
  description: "Experience the soul of Middle Eastern gastronomy and Mediterranean elegance in the heart of Porto. Bespoke culinary masterpieces and luxury dining.",
  keywords: ["Al Reem", "Restaurante Porto", "Middle Eastern Cuisine", "Comida Arabe Porto", "Luxury Restaurant Porto", "Comida do Médio Oriente"],
  authors: [{ name: "Al Reem Restaurant" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo.png?v=4",
    apple: "/logo.png?v=4",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-luxury-black text-luxury-gray font-sans selection:bg-gold-champagne/30 selection:text-gold-metallic">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
