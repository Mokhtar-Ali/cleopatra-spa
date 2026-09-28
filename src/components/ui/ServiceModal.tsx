'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Language, Service } from '@/types';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import styles from '../sections/Services.module.css';

interface ServiceModalProps {
  service: Service | null;
  language: Language;
  labels: {
    description: string;
    benefits: string;
    why: string;
    reserve: string;
  };
  onClose: () => void;
}

export default function ServiceModal({
  service,
  language,
  labels,
  onClose,
}: ServiceModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = service !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!service) {
    return null;
  }

  const content = service[language];
  const reserveMessage =
    language === 'es'
      ? `Hola, quiero reservar ${content.name}`
      : `Hello, I want to reserve ${content.name}`;

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className={styles.modalOverlay}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={styles.modalDialog}>
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.modalClose}
          aria-label={
            language === 'es'
              ? 'Cerrar detalles del servicio'
              : 'Close service details'
          }
          onClick={onClose}
        >
          ×
        </button>

        <div className={styles.modalMedia}>
          <Image
            src={service.image}
            alt={content.name}
            width={640}
            height={480}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.modalContent}>
          <h3 id="service-modal-title" className={styles.modalTitle}>
            {content.name}
          </h3>

          <p className={styles.modalBlock}>
            <span className={styles.modalLabel}>{labels.description}</span>{' '}
            {content.description}
          </p>
          <p className={styles.modalBlock}>
            <span className={styles.modalLabel}>{labels.benefits}</span>{' '}
            {content.benefits}
          </p>
          <p className={styles.modalBlock}>
            <span className={styles.modalLabel}>{labels.why}</span>{' '}
            {content.why}
          </p>

          <a
            className={styles.modalButton}
            href={createWhatsAppUrl(reserveMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.reserve}
          </a>
        </div>
      </div>
    </div>
  );
}
