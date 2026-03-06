import { Button } from './ui/button';
import { Dialog } from './ui/dialog';

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string }) => (
  <Dialog open={open} onClose={onClose}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
    <div className="mt-4 flex gap-2">
      <Button type="button" className="bg-red-600 hover:bg-red-500" onClick={() => { onConfirm(); onClose(); }}>Potwierdź</Button>
      <Button type="button" className="bg-slate-600 hover:bg-slate-500" onClick={onClose}>Anuluj</Button>
    </div>
  </Dialog>
);
