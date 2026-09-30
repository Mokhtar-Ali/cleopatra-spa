'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types';
import styles from './Footer.module.css';

const LOGO_URL =
  'https://pub-ec6b76c0eef842d1bd7d65492c044988.r2.dev/Cleopatra%20Spa/Logo.jpg';
const WHATSAPP_URL = 'https://wa.me/573127980535';
const MAPS_URL = 'https://maps.app.goo.gl/8F3QqHwbraUsuxFq5?g_st=iw';
const FACEBOOK_URL =
  'https://www.facebook.com/share/17ATGJoPPc/?mibextid=wwXIfr';
const INSTAGRAM_URL =
  'https://www.instagram.com/cleopatraspayp?igsh=MTRsaHlteDU2ZDFscg==';
const TIKTOK_URL =
  'https://www.tiktok.com/@cleopatra.spa99?_r=1&_t=ZS-95Ox24QCmN3';
const CLEOPATRA_SOLUTIONS_URL = 'https://www.cleopatrasolutions.com/';
const AUDIT_URL = `${CLEOPATRA_SOLUTIONS_URL}?utm_source=cleopatra-spa&utm_medium=footer&utm_campaign=free-audit`;
const WEBSITE_URL = `${CLEOPATRA_SOLUTIONS_URL}?utm_source=cleopatra-spa&utm_medium=footer&utm_campaign=website-creation`;
const ADDRESS_TEXT = 'Cr 3 # 5-33 Bocagrande, Cartagena de Indias';
const WHATSAPP_DISPLAY = '+57 312 7980535';

const EXPLORE_LINKS = [
  { href: '#appointment', en: 'Appointment', es: 'Citas' },
  { href: '#reviews', en: 'Reviews', es: 'Reseñas' },
  { href: '#services', en: 'Services', es: 'Servicios' },
];

const COPY: Record<
  Language,
  {
    tagline: string;
    contactHeading: string;
    exploreHeading: string;
    followHeading: string;
    ctaLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaAuditButton: string;
    ctaWebsiteButton: string;
    ctaFooter: string;
    copyright: string;
    builtBy: string;
  }
> = {
  es: {
    tagline:
      'Experiencias de bienestar de lujo en Cartagena, diseñadas para la relajación, la belleza y la atención personalizada.',
    contactHeading: 'Contacto',
    exploreHeading: 'Explorar',
    followHeading: 'Síguenos',
    ctaLabel: 'SITIO WEB POR CLEOPATRA SOLUTIONS',
    ctaTitle: '¿Quieres un sitio web como este para tu negocio?',
    ctaDescription:
      'Ya sea que tengas sitio o no, te ayudamos con reservas, pagos, portales, CRM y automatización.',
    ctaAuditButton: 'Pide tu auditoría gratis',
    ctaWebsiteButton: 'Crea tu sitio web',
    ctaFooter: 'Sitios web · Portales · Reservas · Pagos · CRM · Auditoría',
    copyright: '© Cleopatra Spa. Todos los derechos reservados.',
    builtBy: 'Desarrollado por',
  },
  en: {
    tagline:
      'Luxury wellness experiences in Cartagena, designed for relaxation, beauty, and personalized care.',
    contactHeading: 'Contact',
    exploreHeading: 'Explore',
    followHeading: 'Follow Us',
    ctaLabel: 'WEBSITE BY CLEOPATRA SOLUTIONS',
    ctaTitle: 'Want a website like this for your business?',
    ctaDescription:
      'Whether you have a site or not, we help with bookings, payments, portals, CRM and automation.',
    ctaAuditButton: 'Get your free audit',
    ctaWebsiteButton: 'Create your website',
    ctaFooter: 'Websites · Portals · Bookings · Payments · CRM · Audit',
    copyright: '© Cleopatra Spa. All Rights Reserved.',
    builtBy: 'Built By',
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      className={`${styles.footer} ${isRevealed ? styles.revealed : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.brandColumn}`}>
            <Image
              src={LOGO_URL}
              alt="Cleopatra Spa"
              width={108}
              height={108}
              className={styles.logo}
            />
            <p className={styles.tagline}>{copy.tagline}</p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>{copy.contactHeading}</h3>
            <a
              className={styles.link}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <a
              className={styles.link}
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ADDRESS_TEXT}
            </a>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>{copy.exploreHeading}</h3>
            <nav aria-label={copy.exploreHeading}>
              {EXPLORE_LINKS.map((item) => (
                <a
                  key={item.href}
                  className={styles.link}
                  href={item.href}
                  onClick={(event) => handleAnchorClick(event, item.href)}
                >
                  {item[language]}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>{copy.followHeading}</h3>
            <div className={styles.socials}>
              <a
                className={styles.socialButton}
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46h1.6V4.32C16.3 4.22 15.36 4 14.26 4c-2.3 0-3.87 1.4-3.87 3.98V10.5H7.9v3h2.49V21h3.11z"
                  />
                </svg>
              </a>
              <a
                className={styles.socialButton}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4zm4.3-5.85a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0zM20 8.15c-.05-1.06-.29-2-.98-2.7-.7-.7-1.64-.94-2.7-.99C15.19 4.4 8.81 4.4 7.68 4.46c-1.06.05-1.99.29-2.7.99-.7.7-.94 1.64-.99 2.7C3.94 8.81 3.94 15.19 4 16.32c.05 1.06.29 1.99.99 2.7.7.7 1.64.94 2.7.99 1.13.06 7.51.06 8.64 0 1.06-.05 1.99-.29 2.7-.99.7-.7.94-1.64.99-2.7.06-1.13.06-7.5 0-8.63zm-1.44 10.48a2.6 2.6 0 0 1-1.47 1.47c-1.02.4-3.42.31-4.54.31s-3.53.09-4.54-.31a2.6 2.6 0 0 1-1.47-1.47c-.4-1.02-.31-3.42-.31-4.54s-.09-3.53.31-4.54A2.6 2.6 0 0 1 8.02 6.6c1.02-.4 3.42-.31 4.54-.31s3.53-.09 4.54.31c.7.27 1.2.77 1.47 1.47.4 1.02.31 3.42.31 4.54s.09 3.52-.31 4.54z"
                  />
                </svg>
              </a>
              <a
                className={styles.socialButton}
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M16.6 5.1c-.7-.7-1.1-1.7-1.1-2.7h-2.9v13.4c0 1.2-1 2.2-2.2 2.2a2.2 2.2 0 1 1 0-4.4c.2 0 .4 0 .6.06V10.4a5.2 5.2 0 0 0-.6-.03A5.13 5.13 0 0 0 5.3 15.5 5.13 5.13 0 0 0 10.4 20.6a5.13 5.13 0 0 0 5.1-5.1V9.1c1.1.78 2.4 1.24 3.8 1.24V7.4a4.7 4.7 0 0 1-2.7-1.3z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaLabel}>
              <span className={styles.ctaDot} aria-hidden="true" />
              {copy.ctaLabel}
            </span>
            <h3 className={styles.ctaTitle}>{copy.ctaTitle}</h3>
            <p className={styles.ctaDescription}>{copy.ctaDescription}</p>
            <p className={styles.ctaFooterText}>{copy.ctaFooter}</p>
          </div>
          <div className={styles.ctaActions}>
            <a
              className={styles.ctaButton}
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.ctaAuditButton}
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
            <a
              className={styles.ctaButtonSecondary}
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.ctaWebsiteButton}
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.bottomText}>{copy.copyright}</p>
          <p className={styles.bottomText}>
            {copy.builtBy}{' '}
            <a
              className={styles.bottomLink}
              href={CLEOPATRA_SOLUTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @Cleopatra Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
