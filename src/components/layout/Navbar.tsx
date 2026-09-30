'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setIsOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={styles.navbar}>
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
