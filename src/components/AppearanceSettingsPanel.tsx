import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { useCVStore } from '../store/cvStore';
import { TemplateSwitcher } from './TemplateSwitcher';

export const AppearanceSettingsPanel = () => {
  const { data, updateSettings } = useCVStore();
  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Wygląd i personalizacja</h3>
      <TemplateSwitcher />
      <div><label className="text-xs">Kolor akcentu</label><Input type="color" value={data.settings.accentColor} onChange={(e)=>updateSettings({ accentColor: e.target.value })} /></div>
      <div><label className="text-xs">Czcionka</label><Select value={data.settings.fontFamily} onChange={(e)=>updateSettings({ fontFamily: e.target.value as 'Inter' | 'Georgia' | 'Arial' })}><option>Inter</option><option>Georgia</option><option>Arial</option></Select></div>
      <div><label className="text-xs">Układ</label><Select value={data.settings.layout} onChange={(e)=>updateSettings({ layout: e.target.value as 'one-column' | 'two-column' })}><option value="one-column">1 kolumna</option><option value="two-column">2 kolumny</option></Select></div>
      <div><label className="text-xs">Gęstość</label><Select value={data.settings.spacing} onChange={(e)=>updateSettings({ spacing: e.target.value as 'compact' | 'normal' | 'comfortable' })}><option value="compact">Compact</option><option value="normal">Normal</option><option value="comfortable">Comfortable</option></Select></div>
      <label className="text-sm"><input type="checkbox" checked={data.settings.showProfileImage} onChange={(e)=>updateSettings({ showProfileImage: e.target.checked })} /> Pokaż zdjęcie</label>
      <div><label className="text-xs">Zoom podglądu: {data.settings.zoom}%</label><input className="w-full" type="range" min={70} max={130} value={data.settings.zoom} onChange={(e)=>updateSettings({ zoom: Number(e.target.value) })} /></div>
    </Card>
  );
};
