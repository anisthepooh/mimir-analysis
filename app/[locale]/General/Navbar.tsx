'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocalSwitcher from '@/app/Components/LocalSwitcher';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TestTubeDiagonal, Menu, X, Lock } from 'lucide-react';
import { usePreventScroll } from '@/app/utils/usePreventScroll';
import Logo from '@/app/Components/Logo';
import { useUtilitiesStore } from '@/app/_store';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const localActive = useLocale();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {setShouldAnimate} = useUtilitiesStore()

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

  useEffect(() => {
    if ( isSidebarOpen ) {
      setShouldAnimate(false)
    } else {
      setShouldAnimate(true)
    }
  }, [isSidebarOpen])

  usePreventScroll({isDisabled: !isSidebarOpen})

  return (
    <nav className="bg-white shadow border-b border-b-muted">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={`/${localActive}`} className="text-xl font-semibold transition duration-200">
          <Logo />
        </Link>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden text-sky-800 focus:outline-none"
        >
          <Menu size={24} />
        </button>

        <ul className="hidden lg:flex items-center space-x-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className={cn(
                  "duration-300 transition-all hover:text-gray-900 text-sm font-medium capitalize",
                  { "font-bold underline": item.active }
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <Button variant={'link'} asChild>
          <Link href="https://mimir-analysis.netlify.app/admin">
            <Lock />
            Admin
          </Link>
        </Button>
          <div className="ml-4 flex space-x-2">
            <LocalSwitcher />
          </div>
        </ul>
      </div>
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50",
          { "-translate-x-full": !isSidebarOpen, "translate-x-0": isSidebarOpen }
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-muted">
          <Logo />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-sky-800 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                onClick={() => setIsSidebarOpen(false)} // Close on link click
                className={cn(
                  "duration-300 transition-all hover:text-gray-900 text-sm font-medium capitalize block",
                  { "font-bold underline": item.active }
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button variant={'link'} asChild>
          <Link href="https://mimir-analysis.netlify.app/admin">
            <Lock />
            Admin
          </Link>
        </Button>
        <div className="p-4">
          <LocalSwitcher />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
