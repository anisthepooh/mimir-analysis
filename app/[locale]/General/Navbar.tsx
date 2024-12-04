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
          <span className='flex gap-2 items-center font-bold text-sky-800 text-base '>
            <TestTubeDiagonal size={16} />
            Mimir
            <Badge className='text-[10px] h-4 bg-black hover:bg-black text-sky-200'> v.1.0</Badge>
          </span>
          <p className="text-xs font-medium text-muted-foreground">{`${t('powered_by')}`}</p>
          <p className="text-sm font-semibold text-muted-foreground">Regionshospitalet Nordjylland</p>
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
