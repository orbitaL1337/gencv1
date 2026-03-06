import { useCVStore } from '../store/cvStore';
import { Select } from './ui/select';

export const TemplateSwitcher = () => {
  const { data, updateSettings } = useCVStore();
  return (
    <div>
      <label className="text-xs font-medium">Szablon</label>
      <Select value={data.settings.template} onChange={(e) => updateSettings({ template: e.target.value as 'modern' | 'classic' | 'minimal' })}>
        <option value="modern">Nowoczesny</option>
        <option value="classic">Klasyczny</option>
        <option value="minimal">Minimalistyczny</option>
      </Select>
    </div>
  );
};
