import Image from 'next/image';
import type { Language, Service } from '@/types';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import styles from '../sections/Services.module.css';

interface ServiceCardProps {
  service: Service;
  language: Language;
  labels: {
    description: string;
    benefits: string;
    why: string;
    reserve: string;
  };
  onOpen: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

export default function ServiceCard({
  service,
  language,
  labels,
  onOpen,
  cardRef,
}: ServiceCardProps) {
  const content = service[language];
  const reserveMessage =
    language === 'es'
      ? `Hola, quiero reservar ${content.name}`
      : `Hello, I want to reserve ${content.name}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      role="button"
      tabIndex={0}
      aria-label={`${language === 'es' ? 'Abrir detalles de' : 'Open details for'} ${content.name}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.cardImageWrap}>
        <Image
          src={service.image}
          alt={content.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1100px) 45vw, 30vw"
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardName}>{content.name}</h3>

        <p className={styles.cardBlock}>
          <span className={styles.cardLabel}>{labels.description}</span>{' '}
          {content.description}
        </p>
        <p className={styles.cardBlock}>
          <span className={styles.cardLabel}>{labels.benefits}</span>{' '}
          {content.benefits}
        </p>
        <p className={styles.cardBlock}>
          <span className={styles.cardLabel}>{labels.why}</span> {content.why}
        </p>

        <a
          className={styles.cardButton}
          href={createWhatsAppUrl(reserveMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.reserve} - ${content.name}`}
          onClick={(event) => event.stopPropagation()}
        >
          {labels.reserve}
        </a>
      </div>
    </div>
  );
}
