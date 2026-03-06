import { PropsWithChildren } from 'react';

export const FormField = ({ label, error, children }: PropsWithChildren<{ label: string; error?: string }>) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="font-medium text-slate-700">{label}</span>
    {children}
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
);
