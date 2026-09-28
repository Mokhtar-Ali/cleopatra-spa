import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
      </main>
    </>
  );
}
