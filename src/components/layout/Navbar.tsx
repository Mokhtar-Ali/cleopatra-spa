'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const pendingHref = useRef<string | null>(null);

  const scrollToTarget = (href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: targetTop - headerHeight, behavior: 'smooth' });
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (isOpen) {
      pendingHref.current = href;
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    scrollToTarget(href);
  };

  const handleMobileNavTransitionEnd = (
    event: React.TransitionEvent<HTMLElement>
  ) => {
    if (event.propertyName !== 'max-height' || isOpen) return;

    const href = pendingHref.current;
    pendingHref.current = null;
    if (href) scrollToTarget(href);
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.logoLink}
          onClick={(event) => handleNavigate(event, '#top')}
          aria-label="Cleopatra Spa home"
        >
          <Image
            src="https://pub-ec6b76c0eef842d1bd7d65492c044988.r2.dev/Cleopatra%20Spa/Logo.jpg"
            alt="Cleopatra Spa"
            width={74}
            height={74}
            className={styles.logoImage}
            priority
          />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(event) => handleNavigate(event, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#appointment"
            className={styles.ctaButton}
            onClick={(event) => handleNavigate(event, '#appointment')}
          >
            Make Appointment
          </a>
        </nav>

        <button
          type="button"
          className={styles.hamburger}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}
        aria-label="Mobile"
        aria-hidden={!isOpen}
        onTransitionEnd={handleMobileNavTransitionEnd}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={(event) => handleNavigate(event, link.href)}
          >
            {link.label}
          </a>
        ))}
        <div className={styles.mobileLanguage} role="group" aria-label="Language">
          <button
            type="button"
            className={`${styles.mobileLanguageButton} ${language === 'en' ? styles.mobileLanguageButtonActive : ''}`}
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            type="button"
            className={`${styles.mobileLanguageButton} ${language === 'es' ? styles.mobileLanguageButtonActive : ''}`}
            aria-pressed={language === 'es'}
            onClick={() => setLanguage('es')}
          >
            Español
          </button>
        </div>
        <a
          href="#appointment"
          className={styles.mobileCta}
          onClick={(event) => handleNavigate(event, '#appointment')}
        >
          Make Appointment
        </a>
      </nav>
    </header>
  );
}
