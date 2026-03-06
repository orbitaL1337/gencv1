import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
import { Button } from './ui/button';

export const PDFExportButton = () => {
  const onExport = async () => {
    const target = document.querySelector('.cv-page') as HTMLElement | null;
    if (!target) return toast.error('Brak podglądu do eksportu.');
    const canvas = await (await import('html2canvas')).default(target, { scale: 2 });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const ratio = canvas.height / canvas.width;
    pdf.addImage(img, 'PNG', 0, 0, width, width * ratio);
    pdf.save('cv.pdf');
    toast.success('Wyeksportowano PDF.');
  };

  return <Button type="button" onClick={onExport}>Eksport PDF</Button>;
};
