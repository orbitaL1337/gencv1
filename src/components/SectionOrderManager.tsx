import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from './ui/card';
import { useCVStore } from '../store/cvStore';
import { SectionId } from '../types/cv';

const labels: Record<SectionId, string> = {
  personalInfo: 'Dane osobowe', summary: 'Podsumowanie', experience: 'Doświadczenie', education: 'Wykształcenie', skills: 'Umiejętności', languages: 'Języki', certificates: 'Certyfikaty', projects: 'Projekty', links: 'Linki', interests: 'Zainteresowania', references: 'Referencje', customSections: 'Sekcje własne',
};

const Item = ({ id }: { id: SectionId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="rounded-lg bg-slate-100 px-3 py-2 text-sm" {...attributes} {...listeners}>{labels[id]}</div>;
};

export const SectionOrderManager = () => {
  const { data, updateData, toggleVisibility } = useCVStore();
  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Kolejność i widoczność sekcji</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={(e)=>{const active=e.active.id as SectionId; const over=e.over?.id as SectionId | undefined; if(!over || active===over) return; const oldIndex=data.sectionOrder.indexOf(active); const newIndex=data.sectionOrder.indexOf(over); updateData('sectionOrder', arrayMove(data.sectionOrder, oldIndex, newIndex));}}>
        <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">{data.sectionOrder.map((x)=><Item key={x} id={x} />)}</div>
        </SortableContext>
      </DndContext>
      <div className="grid gap-1">{(Object.keys(labels) as SectionId[]).map((id)=><label key={id} className="text-xs"><input type="checkbox" checked={data.visibilitySettings[id]} onChange={()=>toggleVisibility(id)} /> {labels[id]}</label>)}</div>
    </Card>
  );
};
