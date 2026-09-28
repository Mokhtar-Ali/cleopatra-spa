export type Language = 'en' | 'es';

export interface LocalizedServiceContent {
  name: string;
  description: string;
  benefits: string;
  why: string;
}

export interface Service {
  en: LocalizedServiceContent;
  es: LocalizedServiceContent;
  image: string;
}
