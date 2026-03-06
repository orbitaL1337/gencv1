import { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn('w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400', className)}
    {...props}
  />
);
