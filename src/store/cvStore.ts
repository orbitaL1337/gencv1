import { create } from 'zustand';
import { toast } from 'sonner';
import { CVData, SectionId } from '../types/cv';
import { defaultCVData, demoCVData } from '../data/demoData';

const STORAGE_KEY = 'advanced-cv-builder-state';

interface CVStore {
  data: CVData;
  updateData: <K extends keyof CVData>(key: K, value: CVData[K]) => void;
  reorderSections: (active: SectionId, over: SectionId) => void;
  toggleVisibility: (section: SectionId) => void;
  updateSettings: (patch: Partial<CVData['settings']>) => void;
  resetAll: () => void;
  loadDemo: () => void;
  exportJSON: () => string;
  importJSON: (content: string) => boolean;
  restore: () => void;
}

const persistData = (data: CVData) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const useCVStore = create<CVStore>((set, get) => ({
  data: defaultCVData,
  updateData: (key, value) =>
    set((state) => {
      const next = { ...state.data, [key]: value };
      persistData(next);
      return { data: next };
    }),
  reorderSections: (active, over) =>
    set((state) => {
      const from = state.data.sectionOrder.indexOf(active);
      const to = state.data.sectionOrder.indexOf(over);
      if (from < 0 || to < 0) return state;
      const sectionOrder = [...state.data.sectionOrder];
      const [moved] = sectionOrder.splice(from, 1);
      sectionOrder.splice(to, 0, moved);
      const next = { ...state.data, sectionOrder };
      persistData(next);
      return { data: next };
    }),
  toggleVisibility: (section) =>
    set((state) => {
      const next = {
        ...state.data,
        visibilitySettings: {
          ...state.data.visibilitySettings,
          [section]: !state.data.visibilitySettings[section],
        },
      };
      persistData(next);
      return { data: next };
    }),
  updateSettings: (patch) =>
    set((state) => {
      const next = { ...state.data, settings: { ...state.data.settings, ...patch } };
      persistData(next);
      return { data: next };
    }),
  resetAll: () => {
    set({ data: defaultCVData });
    persistData(defaultCVData);
    toast.success('Wyczyszczono wszystkie dane.');
  },
  loadDemo: () => {
    set({ data: demoCVData });
    persistData(demoCVData);
    toast.success('Załadowano dane demo.');
  },
  exportJSON: () => JSON.stringify(get().data, null, 2),
  importJSON: (content) => {
    try {
      const parsed = JSON.parse(content) as CVData;
      if (!parsed.personalInfo || !Array.isArray(parsed.experience)) {
        toast.error('Niepoprawny format JSON.');
        return false;
      }
      set({ data: parsed });
      persistData(parsed);
      toast.success('Import JSON zakończony sukcesem.');
      return true;
    } catch {
      toast.error('Błąd odczytu JSON.');
      return false;
    }
  },
  restore: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      set({ data: JSON.parse(raw) as CVData });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
}));
