import { Card } from './ui/card';
import { useCVStore } from '../store/cvStore';
import { TemplateRenderer } from '../features/templates/TemplateRenderer';

export const LivePreviewPanel = () => {
  const { data } = useCVStore();
  return (
    <Card className="sticky top-4 overflow-auto bg-slate-200 p-4">
      <div style={{ transform: `scale(${data.settings.zoom / 100})`, transformOrigin: 'top center' }}>
        <TemplateRenderer data={data} />
      </div>
    </Card>
  );
};
