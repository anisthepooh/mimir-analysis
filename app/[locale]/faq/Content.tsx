"use client"
import { Accordion } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import AccordionComponent  from './AccordionComponent'
import React from 'react'
import { useTranslations } from 'next-intl';
import EmailButton from './EmailButton';
import { Faq } from '@/types/Faq';

type PageContentProps = {
  faqs: Faq[]; 
};

const Content = ({ faqs }: PageContentProps) => {
  const t = useTranslations();
  return (
    <div className='container px-4 md:px-6 mx-auto'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold tracking-tight ">{t('FAQ.title')}</h1>
          <p className="text text-muted-foreground">{t('FAQ.description')}</p>
        </div>
      </div>
      <hr className="my-8"></hr>
      <div>
        <Accordion type="single" collapsible className="max-w-md mx-auto">
          {faqs?.map((faq) => (
            <AccordionComponent faq={faq} key={faq._id} />
          ))}
        </Accordion>
      
        <Card className="mt-32 p-6 border-t border-t-muted mx-auto max-w-fit">
            <h3 className="font-semibold mb-2 text-left">{t('FAQ.haveQuestion')}</h3>
            <p className="text-left text-muted-foreground mb-4 max-w-sm">{t('FAQ.sendEmail')}</p>
         <EmailButton />
        </Card>
      </div>
    </div>
    
  );
};

export default Content