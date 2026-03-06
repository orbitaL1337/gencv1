import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { uid } from '../../lib/utils';
import { useCVStore } from '../../store/cvStore';
import { achievementExamples } from '../../utils/suggestions';
import { CVData } from '../../types/cv';

type ArraySectionKey = {
  [K in keyof CVData]: CVData[K] extends { id: string }[] ? K : never;
}[keyof CVData];

const move = <T,>(list: T[], i: number, dir: -1 | 1): T[] => {
  const n = i + dir;
  if (n < 0 || n >= list.length) return list;
  const copy = [...list];
  [copy[i], copy[n]] = [copy[n], copy[i]];
  return copy;
};

type ListEditorProps<K extends ArraySectionKey> = {
  section: K;
  data: CVData[K];
  update: (k: K, v: CVData[K]) => void;
  make: () => CVData[K][number];
  render: (
    item: CVData[K][number],
    on: <Field extends keyof CVData[K][number]>(k: Field, v: CVData[K][number][Field]) => void,
  ) => ReactNode;
};

export const ExperienceForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="experience"
      data={data.experience}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), position: '', company: '', location: '', startDate: '', endDate: '', current: false, achievements: [''] })}
      render={(item, on) => (
        <>
          <Input placeholder="Stanowisko" value={item.position} onChange={(e) => on('position', e.target.value)} />
          <Input placeholder="Firma" value={item.company} onChange={(e) => on('company', e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Input type="month" value={item.startDate} onChange={(e) => on('startDate', e.target.value)} />
            <Input type="month" value={item.endDate ?? ''} disabled={item.current} onChange={(e) => on('endDate', e.target.value)} />
          </div>
          <label className="text-xs">
            <input type="checkbox" checked={item.current} onChange={(e) => on('current', e.target.checked)} /> Obecnie pracuję tutaj
          </label>
          <Textarea
            rows={3}
            value={item.achievements.join('\n')}
            onChange={(e) => on('achievements', e.target.value.split('\n').filter(Boolean))}
            placeholder="Każda linia to osiągnięcie"
          />
          <p className="text-xs text-slate-500">Sugestia: {achievementExamples[0]}</p>
        </>
      )}
    />
  );
};

function ListEditor<K extends ArraySectionKey>({ section, data, update, make, render }: ListEditorProps<K>) {
  type Item = CVData[K][number];

  const setItems = (items: Item[]) => update(section, items);

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <Card key={item.id} className="space-y-2">
          <div className="flex gap-2">
            <Button type="button" onClick={() => setItems(move(data, i, -1))}>
              Przenieś wyżej
            </Button>
            <Button type="button" onClick={() => setItems(move(data, i, 1))}>
              Przenieś niżej
            </Button>
            <Button type="button" onClick={() => setItems([...data, { ...item, id: uid() }])}>
              Duplikuj
            </Button>
            <Button type="button" className="bg-red-600 hover:bg-red-500" onClick={() => setItems(data.filter((x) => x.id !== item.id))}>
              Usuń
            </Button>
          </div>
          {render(item, (k, v) => setItems(data.map((x) => (x.id === item.id ? { ...x, [k]: v } : x))))}
        </Card>
      ))}
      <Button type="button" onClick={() => setItems([...data, make()])}>
        Dodaj
      </Button>
    </div>
  );
}

export const EducationForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="education"
      data={data.education}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), degree: '', institution: '', startDate: '', endDate: '', current: false, details: '' })}
      render={(item, on) => (
        <>
          <Input placeholder="Kierunek / stopień" value={item.degree} onChange={(e) => on('degree', e.target.value)} />
          <Input placeholder="Uczelnia" value={item.institution} onChange={(e) => on('institution', e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Input type="month" value={item.startDate} onChange={(e) => on('startDate', e.target.value)} />
            <Input type="month" value={item.endDate ?? ''} disabled={item.current} onChange={(e) => on('endDate', e.target.value)} />
          </div>
          <label className="text-xs">
            <input type="checkbox" checked={item.current} onChange={(e) => on('current', e.target.checked)} /> Nadal się uczę
          </label>
          <Textarea rows={2} value={item.details ?? ''} onChange={(e) => on('details', e.target.value)} />
        </>
      )}
    />
  );
};

const SKILL_LEVELS = ['Podstawowy', 'Średniozaawansowany', 'Zaawansowany', 'Ekspert'] as const;

export const SkillsForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="skills"
      data={data.skills}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '', level: 'Średniozaawansowany' })}
      render={(item, on) => (
        <div className="grid grid-cols-2 gap-2">
          <Input value={item.name} placeholder="Umiejętność" onChange={(e) => on('name', e.target.value)} />
          <Select
            value={item.level}
            onChange={(e) => {
              const level = e.target.value as CVData['skills'][number]['level'];
              on('level', level);
            }}
          >
            {SKILL_LEVELS.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Select>
        </div>
      )}
    />
  );
};

export const ProjectsForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="projects"
      data={data.projects}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '', description: '', technologies: '', link: '' })}
      render={(item, on) => (
        <>
          <Input value={item.name} placeholder="Nazwa projektu" onChange={(e) => on('name', e.target.value)} />
          <Textarea rows={3} value={item.description} onChange={(e) => on('description', e.target.value)} placeholder="Opis" />
          <Input value={item.technologies} onChange={(e) => on('technologies', e.target.value)} placeholder="Technologie" />
          <Input value={item.link ?? ''} onChange={(e) => on('link', e.target.value)} placeholder="Link" />
        </>
      )}
    />
  );
};

export const CustomSectionForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="customSections"
      data={data.customSections}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), sectionTitle: '', content: '' })}
      render={(item, on) => (
        <>
          <Input value={item.sectionTitle} onChange={(e) => on('sectionTitle', e.target.value)} placeholder="Tytuł sekcji" />
          <Textarea rows={4} value={item.content} onChange={(e) => on('content', e.target.value)} placeholder="Treść" />
        </>
      )}
    />
  );
};

export const LanguagesForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="languages"
      data={data.languages}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '', level: '' })}
      render={(item, on) => (
        <div className="grid grid-cols-2 gap-2">
          <Input value={item.name} onChange={(e) => on('name', e.target.value)} placeholder="Język" />
          <Input value={item.level} onChange={(e) => on('level', e.target.value)} placeholder="Poziom" />
        </div>
      )}
    />
  );
};

export const CertificatesForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="certificates"
      data={data.certificates}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '', issuer: '', year: '' })}
      render={(item, on) => (
        <div className="grid grid-cols-3 gap-2">
          <Input value={item.name} onChange={(e) => on('name', e.target.value)} placeholder="Certyfikat" />
          <Input value={item.issuer} onChange={(e) => on('issuer', e.target.value)} placeholder="Instytucja" />
          <Input value={item.year ?? ''} onChange={(e) => on('year', e.target.value)} placeholder="Rok" />
        </div>
      )}
    />
  );
};

export const LinksForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="links"
      data={data.links}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), label: '', url: '' })}
      render={(item, on) => (
        <div className="grid grid-cols-2 gap-2">
          <Input value={item.label} onChange={(e) => on('label', e.target.value)} placeholder="Typ" />
          <Input value={item.url} onChange={(e) => on('url', e.target.value)} placeholder="URL" />
        </div>
      )}
    />
  );
};

export const InterestsForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="interests"
      data={data.interests}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '' })}
      render={(item, on) => <Input value={item.name} onChange={(e) => on('name', e.target.value)} placeholder="Zainteresowanie" />}
    />
  );
};

export const ReferencesForm = () => {
  const { data, updateData } = useCVStore();
  return (
    <ListEditor
      section="references"
      data={data.references}
      update={(k, v) => updateData(k, v)}
      make={() => ({ id: uid(), name: '', contact: '', note: '' })}
      render={(item, on) => (
        <>
          <Input value={item.name} onChange={(e) => on('name', e.target.value)} placeholder="Imię i nazwisko" />
          <Input value={item.contact} onChange={(e) => on('contact', e.target.value)} placeholder="Kontakt" />
          <Input value={item.note ?? ''} onChange={(e) => on('note', e.target.value)} placeholder="Notatka" />
        </>
      )}
    />
  );
};
