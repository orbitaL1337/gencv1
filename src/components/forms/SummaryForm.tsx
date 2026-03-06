import { useCVStore } from '../../store/cvStore';
import { Textarea } from '../ui/textarea';

export const SummaryForm = () => {
  const { data, updateData } = useCVStore();
  const len = data.summary.length;
  return (
    <div className="space-y-2">
      <Textarea rows={6} value={data.summary} onChange={(e) => updateData('summary', e.target.value)} placeholder="Napisz podsumowanie zawodowe..." />
      <p className={`text-xs ${len < 120 ? 'text-amber-600' : 'text-emerald-600'}`}>Licznik znaków: {len} / rekomendowane min. 120</p>
    </div>
  );
};
