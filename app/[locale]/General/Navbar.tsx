'use client'
import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocalSwitcher from '@/app/Components/LocalSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = ({  }) => {
  const t = useTranslations();
  const pathname = usePathname()
  const localActive = useLocale();


  return (
    <nav className="navbar bg-white shadow border-b border-b-muted">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={`/${localActive}`} className="text-xl font-semibold  transition duration-200">
          <Button variant={'ghost'} className='flex flex-col items-start h-auto gap-0'>
            <span>
              MIMIR 
              <span className='font-medium text-base text-muted-foreground'> v1.0</span>
            </span>
            <p className="text-xs font-medium text-muted-foreground">{`${t('powered_by')}`}</p>
            <p className="text-sm font-semibold text-muted-foreground">Regionshospitalet Nordjylland</p>
          </Button>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Button variant={'ghost'} className={cn(
              'font-semibold',
              {"bg-accent text-accent-foreground": pathname === `/${localActive}/Videnscenter`}
            )} >
            <Link href={`/${localActive}/articles`} className="">
              {t('knowledgecenter')}
            </Link>
            </Button>
          </li>
          <li>
            <Button variant={'ghost'} className={cn(
              'font-semibold',
              {"bg-accent text-accent-foreground": pathname === `/${localActive}/faq`}
            )} >
              <Link href={`/${localActive}/faq`} className="">
                FAQ
              </Link>
            </Button>
          </li>
          <li>
            <Button variant={'ghost'} className={cn(
              'font-semibold',
              {"bg-accent text-accent-foreground": pathname === `/${localActive}/kontakt`}
            )} >
              <Link href={`/${localActive}/contact`} className="">
                {t('contact')}
              </Link>
            </Button>
          </li>
          <div className="ml-4 flex space-x-2">
            <LocalSwitcher />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
