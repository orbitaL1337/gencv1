import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-500',
      className,
    )}
    {...props}
  />
);
