import { SectionId } from '../../types/cv';
import { Card } from '../ui/card';

const labels: Record<SectionId, string> = {
  personalInfo: 'Dane osobowe', summary: 'Podsumowanie', experience: 'Doświadczenie', education: 'Wykształcenie', skills: 'Umiejętności', languages: 'Języki', certificates: 'Certyfikaty', projects: 'Projekty', links: 'Linki', interests: 'Zainteresowania', references: 'Referencje', customSections: 'Sekcje własne',
};

export const StepNavigation = ({ active, onChange }: { active: SectionId; onChange: (id: SectionId) => void }) => (
  <Card>
    <h2 className="mb-3 text-sm font-semibold">Kroki kreatora</h2>
    <div className="grid gap-2">{(Object.keys(labels) as SectionId[]).map((id)=><button key={id} onClick={()=>onChange(id)} className={`rounded-lg px-3 py-2 text-left text-sm ${active===id?'bg-slate-900 text-white':'bg-slate-100 hover:bg-slate-200'}`}>{labels[id]}</button>)}</div>
  </Card>
);
