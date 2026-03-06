import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { Button } from './ui/button';
import { useCVStore } from '../store/cvStore';

export const JsonImportExport = () => {
  const { exportJSON, importJSON } = useCVStore();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => saveAs(new Blob([exportJSON()], { type: 'application/json' }), 'cv-data.json')}>Eksport JSON</Button>
      <Button type="button" onClick={() => ref.current?.click()}>Import JSON</Button>
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept="application/json"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          importJSON(await file.text());
        }}
      />
    </div>
  );
};
