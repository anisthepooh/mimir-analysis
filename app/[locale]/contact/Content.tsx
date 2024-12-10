'use client'
import { Author } from '@/types/Author';
import React from 'react';
import ContactCard from './ContactCard';
import { useTranslations } from 'next-intl';

interface ContentProps {
  authors: Author[];
}

const Content: React.FC<ContentProps> = ({ authors }) => {
  const t = useTranslations()

  return (
    <div className='container mx-auto max-w-4xl py-6 lg:py-10"'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">{t('contributors')}</h1>
          <p className="text-xl text-muted-foreground">{t('contact_page.description')}</p>
        </div>
      </div>
      <hr className="my-8"></hr>
      <div className='grid gap-10 sm:grid-cols-2'>
        {authors?.map((author) => (
          <ContactCard author={author} />
        ))}
      </div>
    </div>
  );
};

export default Content;
