'use client';

import { FileText, Plus, History, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NdflSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Обзор',
      href: '/ndfl',
      icon: FileText,
      current: pathname === '/ndfl',
    },
    {
      name: 'Создать декларацию',
      href: '/ndfl/create',
      icon: Plus,
      current: pathname === '/ndfl/create',
    },
    {
      name: 'История',
      href: '/ndfl/history',
      icon: History,
      current: pathname === '/ndfl/history',
    },
    {
      name: 'Справка',
      href: '/ndfl/help',
      icon: HelpCircle,
      current: pathname === '/ndfl/help',
    },
  ];

  return (
    <div className="w-64 flex-shrink-0">
      <nav className="space-y-2">
        {navigation.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                item.current
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Quick Info */}
      <div className="mt-8 rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-medium text-gray-900">Важные даты</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Подача декларации:</span>
            <span className="font-medium">до 31 марта</span>
          </div>
          <div className="flex justify-between">
            <span>Доплата налога:</span>
            <span className="font-medium">до 15 июля</span>
          </div>
          <div className="flex justify-between">
            <span>Возврат налога:</span>
            <span className="font-medium">в течение 4 мес.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
