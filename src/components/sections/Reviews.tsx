'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { reviews } from '@/data/reviews';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types';
import styles from './Reviews.module.css';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sca_esv=c99dc4ab72a1909f&sxsrf=ANbL-n56zHaMhLSk5hQeU5aDE7FX5iG21w:1775766117393&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdlOhk2OUp8szJG8P6csxyNrYC4L5CpryWcDWJhibLbL0whxR2Qkj-pAPEsmgixcFDsJ9FsWzFJB2_-zqo_bO75i1xiF&q=Cleopatra+Spa+Reviews&sa=X&ved=2ahUKEwi1mYalzOGTAxXs9LsIHcUCGmIQ0bkNegQIJxAF&biw=1728&bih=962&dpr=2';

const COPY: Record<
  Language,
  { eyebrow: string; title: string; intro: string; cta: string }
> = {
  en: {
    eyebrow: 'What Guests Are Saying',
    title: 'Reviews',
    intro: 'A few words from guests who experienced Cleopatra Spa.',
    cta: 'Read all reviews',
  },
  es: {
    eyebrow: 'Lo Que Dicen Nuestros Clientes',
    title: 'Reseñas',
    intro:
      'Algunas palabras de clientes que vivieron la experiencia de Cleopatra Spa.',
    cta: 'Leer todas las reseñas',
  },
};

const AUTOPLAY_INTERVAL_MS = 5000;

function getCardsPerView(): number {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(max-width: 768px)').matches) return 1;
  if (window.matchMedia('(max-width: 1100px)').matches) return 2;
  return 3;
}

export default function Reviews() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(0);

  const totalPages = useMemo(
    () => Math.ceil(reviews.length / cardsPerView),
    [cardsPerView]
  );

  const clampedPage = Math.min(currentPage, Math.max(totalPages - 1, 0));

  useEffect(() => {
    currentPageRef.current = clampedPage;
  }, [clampedPage]);

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
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const updatePreference = () =>
      setPrefersReducedMotion(reducedMotionQuery.matches);
    updatePreference();

    reducedMotionQuery.addEventListener('change', updatePreference);
    return () =>
      reducedMotionQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.25 }
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

  const scrollToPage = useCallback((page: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: page * viewport.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!isVisible || isHovered || prefersReducedMotion || totalPages <= 1) {
      return;
    }

    const id = setInterval(() => {
      const next = (currentPageRef.current + 1) % totalPages;
      scrollToPage(next);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [
    isVisible,
    isHovered,
    prefersReducedMotion,
    totalPages,
    autoplayResetKey,
    scrollToPage,
  ]);

  const restartAutoplay = () => setAutoplayResetKey((key) => key + 1);

  const handlePrev = () => {
    scrollToPage(Math.max(clampedPage - 1, 0));
    restartAutoplay();
  };

  const handleNext = () => {
    scrollToPage(Math.min(clampedPage + 1, totalPages - 1));
    restartAutoplay();
  };

  const handleDotClick = (page: number) => {
    scrollToPage(page);
    restartAutoplay();
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`${styles.reviews} ${isRevealed ? styles.revealed : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          aria-label="Previous reviews"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.track}>
            {reviews.map((review, index) => (
              <article className={styles.card} key={`${review.name}-${index}`}>
                <p className={styles.stars} aria-hidden="true">
                  ★★★★★
                </p>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.meta}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.time}>{review.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
          disabled={clampedPage >= totalPages - 1}
          aria-label="Next reviews"
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
            aria-label={`Go to review ${index + 1}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <a
          className={styles.cta}
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.cta}
        </a>
      </div>
    </section>
  );
}
