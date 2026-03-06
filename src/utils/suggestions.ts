import { CVData } from '../types/cv';

export const qualitySuggestions = (data: CVData): string[] => {
  const hints: string[] = [];
  if (data.summary.trim().length < 120) hints.push('Podsumowanie jest zbyt krótkie (celuj w 120+ znaków).');
  if (!data.links.length) hints.push('Dodaj przynajmniej 1 link (LinkedIn, GitHub, portfolio).');
  if (data.experience.some((x) => !x.achievements.length)) hints.push('Uzupełnij osiągnięcia w sekcji doświadczenia.');
  if (data.skills.length < 4) hints.push('Dodaj więcej konkretnych umiejętności technicznych.');
  return hints;
};

export const achievementExamples = [
  'Zwiększyłem konwersję formularza o 18% po wdrożeniu walidacji i UX improvements.',
  'Skróciłem czas renderowania dashboardu o 30% dzięki memoizacji i lazy loadingowi.',
  'Zaprojektowałem proces CI/CD, który skrócił czas wdrożeń z 40 do 10 minut.',
];
