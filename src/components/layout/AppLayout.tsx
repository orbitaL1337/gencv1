import { PropsWithChildren, ReactNode } from 'react';

export const AppLayout = ({ sidebar, children }: PropsWithChildren<{ sidebar: ReactNode }>) => (
  <div className="min-h-screen bg-slate-100 p-4 md:p-6">
    <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[420px_1fr]">
      <aside className="space-y-4">{sidebar}</aside>
      <main>{children}</main>
    </div>
  </div>
);
