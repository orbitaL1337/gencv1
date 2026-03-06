import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Imię i nazwisko jest wymagane.'),
  title: z.string().min(2, 'Stanowisko jest wymagane.'),
  email: z.string().email('Niepoprawny e-mail.'),
  phone: z.string().min(6, 'Numer telefonu jest wymagany.'),
  location: z.string().min(2, 'Lokalizacja jest wymagana.'),
  website: z.string().optional(),
  profileImage: z.string().optional(),
});

export const experienceSchema = z
  .object({
    position: z.string().min(2, 'Podaj stanowisko.'),
    company: z.string().min(2, 'Podaj firmę.'),
    location: z.string().optional(),
    startDate: z.string().min(1, 'Data rozpoczęcia jest wymagana.'),
    endDate: z.string().optional(),
    current: z.boolean(),
    achievements: z.string().min(10, 'Opis osiągnięć powinien mieć min. 10 znaków.'),
  })
  .refine((v) => v.current || Boolean(v.endDate), 'Podaj datę końcową lub zaznacz "obecnie".');
