'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

type HeroLanguage = 'en' | 'es';

const HERO_COPY: Record<
  HeroLanguage,
  { eyebrow: string; description: string }
> = {
  en: {
    eyebrow: 'Welcome to',
    description:
      'Escape into a world of tranquility, indulgence, and timeless beauty. Restore your body, calm your mind, and discover the luxury of true relaxation.',
  },
  es: {
    eyebrow: 'Bienvenido a',
    description:
      'Escapa a un mundo de tranquilidad, placer y belleza atemporal. Renueva tu cuerpo, calma tu mente y descubre el lujo de una verdadera relajación.',
  },
};

export default function Hero() {
  const [language, setLanguage] = useState<HeroLanguage>('en');
  const copy = HERO_COPY[language];

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.heading}>
            <span className={styles.titleLineOne}>CLEOPATRA</span>
            <br />
            <span className={styles.titleLineTwo}>SPA</span>
          </h1>
          <p className={styles.description}>{copy.description}</p>

          <div
            className={styles.languageSwitch}
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              className={`${styles.languageButton} ${
                language === 'en' ? styles.languageButtonActive : ''
              }`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              English
            </button>
            <button
              type="button"
              className={`${styles.languageButton} ${
                language === 'es' ? styles.languageButtonActive : ''
              }`}
              onClick={() => setLanguage('es')}
              aria-pressed={language === 'es'}
            >
              Español
            </button>
          </div>
        </div>

        <div className={styles.imageFrame}>
          <Image
            src="https://assets.cdn.filesafe.space/PLXAq7yqMdE7BJTTiHw3/media/69dbc99ad7871cddf7841a11.jpeg"
            alt="Cleopatra Spa treatment room"
            width={560}
            height={700}
            className={styles.heroImage}
            priority
            sizes="(max-width: 900px) 90vw, 480px"
          />
        </div>
      </div>
    </section>
  );
}
