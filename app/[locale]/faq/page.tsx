'use client'
import { Accordion } from '@/components/ui/accordion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AccordionComponent  from './AccordionComponent'
import React from 'react'
import { getFaqs } from "@/sanity/sanity-utils";
import { useTranslations } from 'next-intl';
import EmailButton from './EmailButton';
import { Faq } from '@/types/Faq';

type PageContentProps = {
  faqs: Faq[]; 
};

const PageContent = ({ faqs }: PageContentProps) => {
  const t = useTranslations();
  return (
    <div>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">{t('FAQ.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('FAQ.description')}</p>
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

const page = async () => {
  const faqs = await getFaqs();
  return (
    <div className='container mx-auto max-w-4xl py-6 lg:py-10"'>
      <PageContent faqs={faqs} />
    </div>
  );
};

export default page;

