'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import type { Language } from '@/types';
import styles from './Appointment.module.css';

const WHATSAPP_DISPLAY = '+57 312 7980535';
const LOCATION_TEXT = 'Cr 3 # 5-33 Bocagrande, Cartagena de Indias';
const MAPS_URL = 'https://maps.app.goo.gl/8F3QqHwbraUsuxFq5?g_st=iw';

const HOURS = [
  { en: 'Saturday', es: 'Sábado', time: '9AM–8PM' },
  { en: 'Sunday', es: 'Domingo', time: '9AM–5PM' },
  { en: 'Monday', es: 'Lunes', time: '9AM–8PM' },
  { en: 'Tuesday', es: 'Martes', time: '9AM–8PM' },
  { en: 'Wednesday', es: 'Miércoles', time: '9AM–8PM' },
  { en: 'Thursday', es: 'Jueves', time: '9AM–8PM' },
  { en: 'Friday', es: 'Viernes', time: '9AM–8PM' },
];

const COPY: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    cta: string;
    cardTitle: string;
    whatsappLabel: string;
    locationLabel: string;
    servicesLabel: string;
    servicesValue: string;
    hoursLabel: string;
    whatsappMessage: string;
  }
> = {
  es: {
    eyebrow: 'Contacto y Citas',
    title: 'Reserva Tu Momento de Relajación',
    paragraph1:
      'Ya sea que estés planeando un masaje relajante, un tratamiento facial, una experiencia en pareja o un servicio a domicilio, Cleopatra Spa está lista para recibirte con atención personalizada y dedicación.',
    paragraph2:
      'Envíanos un mensaje por WhatsApp para hacer preguntas, verificar disponibilidad o realizar tu reserva en solo unos momentos.',
    cta: 'Hacer una Cita',
    cardTitle: 'Visítanos o Contáctanos',
    whatsappLabel: 'WhatsApp',
    locationLabel: 'Ubicación',
    servicesLabel: 'Servicios',
    servicesValue:
      'Masajes, faciales, experiencias en pareja, jacuzzi y servicios de spa a domicilio',
    hoursLabel: 'Horario',
    whatsappMessage: 'Quiero hacer una cita',
  },
  en: {
    eyebrow: 'Contact & Appointment',
    title: 'Reserve Your Moment of Relaxation',
    paragraph1:
      'Whether you are planning a relaxing massage, a facial treatment, a couples experience, or an in-home service, Cleopatra Spa is ready to welcome you with personalized care and attention.',
    paragraph2:
      'Send us a message on WhatsApp to ask questions, check availability, or make your reservation in just a few moments.',
    cta: 'Make an Appointment',
    cardTitle: 'Visit or Contact Us',
    whatsappLabel: 'WhatsApp',
    locationLabel: 'Location',
    servicesLabel: 'Services',
    servicesValue:
      'Massages, facials, couples experiences, jacuzzi, and in-home spa services',
    hoursLabel: 'Hours',
    whatsappMessage: 'I want to make an appointment',
  },
};

export default function Appointment() {
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = createWhatsAppUrl(copy.whatsappMessage);

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className={`${styles.appointment} ${isRevealed ? styles.revealed : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.paragraph}>{copy.paragraph1}</p>
          <p className={styles.paragraph}>{copy.paragraph2}</p>

          <a
            className={styles.cta}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.cta}
          </a>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{copy.cardTitle}</h3>

          <div className={styles.group}>
            <span className={styles.icon} aria-hidden="true">
              ✦
            </span>
            <div className={styles.groupContent}>
              <span className={styles.label}>{copy.whatsappLabel}</span>
              <a
                className={styles.value}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.icon} aria-hidden="true">
              ✦
            </span>
            <div className={styles.groupContent}>
              <span className={styles.label}>{copy.locationLabel}</span>
              <a
                className={styles.value}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {LOCATION_TEXT}
              </a>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.icon} aria-hidden="true">
              ✦
            </span>
            <div className={styles.groupContent}>
              <span className={styles.label}>{copy.servicesLabel}</span>
              <p className={styles.value}>{copy.servicesValue}</p>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.icon} aria-hidden="true">
              ✦
            </span>
            <div className={styles.groupContent}>
              <span className={styles.label}>{copy.hoursLabel}</span>
              <ul className={styles.hoursList}>
                {HOURS.map((entry) => (
                  <li className={styles.hoursRow} key={entry.en}>
                    <span className={styles.hoursDay}>{entry[language]}</span>
                    <span className={styles.hoursTime}>{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
