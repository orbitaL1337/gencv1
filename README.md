# Zaawansowany Kreator CV

Production-ready MVP kreatora CV (React + TypeScript + Vite + Tailwind + Zustand + RHF + Zod + dnd-kit).

## Funkcje
- Edycja wszystkich sekcji CV (w tym custom sections)
- Dynamiczne dodawanie / usuwanie / duplikowanie rekordów
- Live preview CV ze zmianą zoomu
- 3 szablony: nowoczesny, klasyczny, minimalistyczny
- Personalizacja wyglądu: kolor akcentu, font, layout, spacing, zdjęcie profilowe
- Zarządzanie kolejnością sekcji (drag & drop) i widocznością
- Autosave i restore przez localStorage
- Import / eksport JSON
- Eksport PDF (przeglądarkowy)
- Dane demo, toasty, dialog potwierdzenia, sugestie jakościowe

## Uruchomienie
```bash
npm install
npm run dev
```

Build produkcyjny:
```bash
npm run build
npm run preview
```

## Struktura
```text
src/
  components/
    forms/
    layout/
    ui/
  data/
  features/templates/
  hooks/
  lib/
  store/
  types/
  utils/
```

## Decyzje architektoniczne
- **Zustand** zarządza całym modelem CV + autosave (single source of truth).
- **React Hook Form + Zod** walidują krytyczne formularze i dają czytelne błędy.
- **TemplateRenderer** posiada wspólne API renderowania, co upraszcza dodawanie kolejnych szablonów.
- **dnd-kit** obsługuje reorder sekcji bez ciężkich zależności.
- **jsPDF + html2canvas** daje stabilny eksport do PDF po stronie klienta.

## Wymagania
Node 18+.
