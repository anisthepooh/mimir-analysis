'use client'
import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocalSwitcher from '@/app/Components/LocalSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TestTubeDiagonal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = ({  }) => {
  const t = useTranslations();
  const pathname = usePathname()
  const localActive = useLocale();

  const menuItems = [
    {
      label: t('dashboard'),
      href: `/${localActive}/dashboard`,
      active: pathname === `/${localActive}/dashboard`,
    },
    {
      label: t('knowledgecenter'),
      href: `/${localActive}/articles`,
      active: pathname === `/${localActive}/articles`,
    },
    {
      label: 'FAQ',
      href: `/${localActive}/faq`,
      active: pathname === `/${localActive}/faq`,
    },
    {
      label: t('contact'),
      href: `/${localActive}/contact`,
      active: pathname === `/${localActive}/contact`,
    },
  ];




  return (
    <nav className="navbar bg-white shadow border-b border-b-muted">
      <div className="container mx-auto flex justify-between items-center p-4">
          <Link href={`/${localActive}`} className="text-xl font-semibold  transition duration-200">
          <span className='flex gap-1 items-baseline font-bold text-sky-800 text-base '>
            <span className='w-5 h-5 bg-sky-800 rounded-md flex items-center justify-center border-t-2 border-t-sky-400'>
              <TestTubeDiagonal size={12} className='text-sky-200' />  
            </span>
            <span>
              Mimir
              <span className='text-[10px] text-sky-600'> v.1.0</span>
            </span>
          </span>
          </Link>
        <ul className="flex items-center space-x-4">
          {menuItems.map((item) => (
            <li>
              <Link href={item.href} className={cn(
                "duration-300 transition-all hover:text-gray-900 text-sm font-medium capitalize",
                {"font-bold underline": item.active}
              )}>
                {item.label}
              </Link>
            </li>
          ))}
          <div className="ml-4 flex space-x-2">
            <LocalSwitcher />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
