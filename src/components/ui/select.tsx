import { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn('w-full rounded-lg border border-border bg-white px-3 py-2 text-sm', className)} {...props} />
);
