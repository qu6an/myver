'use client';

import type React from 'react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { NdflSidebar } from './components/NdflSidebar';

export default function NdflLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbItems = [
    { label: 'Дашборд', href: '/dashboard' },
    { label: 'НДФЛ', href: '/ndfl' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />
      <div className="flex gap-8">
        {/* <NdflSidebar /> */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
