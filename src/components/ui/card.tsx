import { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('rounded-2xl border border-border bg-white p-4 shadow-soft', className)}>{children}</div>
);
