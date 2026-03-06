import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { StepNavigation } from './components/layout/StepNavigation';
import { SectionEditorRenderer } from './components/SectionEditorRenderer';
import { SectionId } from './types/cv';
import { AppearanceSettingsPanel } from './components/AppearanceSettingsPanel';
import { SectionOrderManager } from './components/SectionOrderManager';
import { LivePreviewPanel } from './components/LivePreviewPanel';
import { Card } from './components/ui/card';
import { PDFExportButton } from './components/PDFExportButton';
import { JsonImportExport } from './components/JsonImportExport';
import { DemoDataButton } from './components/DemoDataButton';
import { Button } from './components/ui/button';
import { ConfirmDialog } from './components/ConfirmDialog';
import { ToastProvider } from './components/ToastProvider';
import { useCVStore } from './store/cvStore';
import { qualitySuggestions } from './utils/suggestions';

const App = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('personalInfo');
  const [confirmReset, setConfirmReset] = useState(false);
  const { data, resetAll, restore } = useCVStore();

  useEffect(() => restore(), [restore]);
  const suggestions = useMemo(() => qualitySuggestions(data), [data]);

  return (
    <>
      <ToastProvider />
      <AppLayout
        sidebar={
          <>
            <StepNavigation active={activeSection} onChange={setActiveSection} />
            <SectionEditorRenderer section={activeSection} />
            <AppearanceSettingsPanel />
            <SectionOrderManager />
            <Card className="space-y-2">
              <h3 className="font-semibold">Akcje</h3>
              <div className="flex flex-wrap gap-2"><DemoDataButton /><PDFExportButton /><JsonImportExport /></div>
              <Button type="button" className="bg-red-700 hover:bg-red-600" onClick={() => setConfirmReset(true)}>Wyczyść wszystko</Button>
            </Card>
            <Card>
              <h3 className="mb-2 font-semibold">Sugestie jakościowe</h3>
              {!suggestions.length ? <p className="text-sm text-emerald-600">CV wygląda bardzo dobrze 👌</p> : <ul className="list-disc space-y-1 pl-5 text-sm text-amber-700">{suggestions.map((s) => <li key={s}>{s}</li>)}</ul>}
            </Card>
          </>
        }
      >
        <LivePreviewPanel />
      </AppLayout>
      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={resetAll}
        title="Czy na pewno wyczyścić projekt?"
        description="Ta operacja usunie wszystkie sekcje i ustawienia z bieżącego projektu."
      />
    </>
  );
};

export default App;
