import { PropsWithChildren } from 'react';

export const Dialog = ({ open, onClose, children }: PropsWithChildren<{ open: boolean; onClose: () => void }>) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-soft">
        {children}
        <button onClick={onClose} className="mt-3 text-sm text-slate-500 underline">Zamknij</button>
      </div>
    </div>
  );
};
