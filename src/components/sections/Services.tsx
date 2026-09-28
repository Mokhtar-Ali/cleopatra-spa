'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { services } from '@/data/services';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import { useLanguage } from '@/context/LanguageContext';
import type { Language, Service } from '@/types';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceModal from '@/components/ui/ServiceModal';
import styles from './Services.module.css';

const LABELS: Record<
  Language,
  {
    description: string;
    benefits: string;
    why: string;
    reserve: string;
    more: string;
  }
> = {
  en: {
    description: 'Description:',
    benefits: 'Benefits:',
    why: 'Why do it?',
    reserve: 'Reserve on WhatsApp',
    more: 'Text Us on WhatsApp',
  },
  es: {
    description: 'Descripción:',
    benefits: 'Beneficios:',
    why: '¿Por qué hacerlo?',
    reserve: 'Reservar por WhatsApp',
    more: 'Escríbenos al WhatsApp',
  },
};

const COPY: Record<
  Language,
  { eyebrow: string; title: string; intro: string; footer: string }
> = {
  en: {
    eyebrow: 'Our Signature Experiences',
    title: 'Services',
    intro:
      'Explore our artistic rituals and wellness experiences. Each service combines beauty, relaxation, and Cleopatra Spa’s signature style.',
    footer:
      'Interested in more secrets? Text us on WhatsApp to discover our hidden rituals...',
  },
  es: {
    eyebrow: 'Nuestras Experiencias Exclusivas',
    title: 'Servicios',
    intro:
      'Descubre nuestros rituales artísticos y experiencias de bienestar. Cada servicio combina belleza, relajación y el estilo exclusivo de Cleopatra Spa.',
    footer:
      '¿Interesado en más secretos? Escríbenos al WhatsApp para descubrir nuestros rituales ocultos...',
  },
};

function getCardsPerView(): number {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(max-width: 768px)').matches) return 1;
  if (window.matchMedia('(max-width: 1100px)').matches) return 2;
  return 3;
}

export default function Services() {
  const { language } = useLanguage();
  const labels = LABELS[language];
  const copy = COPY[language];

  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastFocusedCardIndex = useRef<number | null>(null);

  const totalPages = useMemo(
    () => Math.ceil(services.length / cardsPerView),
    [cardsPerView]
  );

  const clampedPage = Math.min(currentPage, Math.max(totalPages - 1, 0));

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(max-width: 1100px)');

    const updateCardsPerView = () => setCardsPerView(getCardsPerView());
    updateCardsPerView();

    mobileQuery.addEventListener('change', updateCardsPerView);
    tabletQuery.addEventListener('change', updateCardsPerView);

    return () => {
      mobileQuery.removeEventListener('change', updateCardsPerView);
      tabletQuery.removeEventListener('change', updateCardsPerView);
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame: number | null = null;
    const handleScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const page = Math.round(viewport.scrollLeft / viewport.clientWidth);
        setCurrentPage(page);
        frame = null;
      });
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToPage = (page: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: page * viewport.clientWidth,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => scrollToPage(Math.max(clampedPage - 1, 0));
  const handleNext = () =>
    scrollToPage(Math.min(clampedPage + 1, totalPages - 1));

  const handleOpen = (index: number) => {
    lastFocusedCardIndex.current = index;
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    const index = lastFocusedCardIndex.current;
    if (index !== null) {
      cardRefs.current[index]?.focus();
    }
  };

  const selectedService: Service | null =
    selectedIndex !== null ? services[selectedIndex] : null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${styles.services} ${isRevealed ? styles.revealed : ''}`}
    >
      <div className={styles.header}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.intro}>{copy.intro}</p>
      </div>

      <div className={styles.carouselWrap}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrev}
          disabled={clampedPage === 0}
          aria-label="Previous services"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.track}>
            {services.map((service, index) => (
              <ServiceCard
                key={service[language].name}
                service={service}
                language={language}
                labels={labels}
                onOpen={() => handleOpen(index)}
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
          disabled={clampedPage >= totalPages - 1}
          aria-label="Next services"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className={styles.dots}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === clampedPage ? styles.dotActive : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollToPage(index)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>{copy.footer}</p>
        <a
          className={styles.footerLink}
          href={createWhatsAppUrl(
            language === 'es'
              ? 'Hola, quiero descubrir sus rituales ocultos'
              : 'Hello, I want to discover your hidden rituals'
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels.more}
        </a>
      </div>

      <ServiceModal
        service={selectedService}
        language={language}
        labels={labels}
        onClose={handleClose}
      />
    </section>
  );
}
