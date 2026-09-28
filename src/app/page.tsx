import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Reviews from '@/components/sections/Reviews';
import Appointment from '@/components/sections/Appointment';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Reviews />
        <Appointment />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
