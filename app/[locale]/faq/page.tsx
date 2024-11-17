import { Accordion } from '@/components/ui/accordion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AccordionComponent  from './AccordionComponent'
import React from 'react'
import { getFaqs } from "@/sanity/sanity-utils";
import { useTranslations } from 'next-intl';
import EmailButton from './EmailButton';

const PageContent = ({ faqs }: { faqs: any[] }) => {
  const t = useTranslations();
  return (
    <>
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl mx-auto text-center mt-8">Frequently Asked Questions</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="max-w-md mx-auto">
          {faqs?.map((faq: any) => (
            <AccordionComponent faq={faq} key={faq._id} />
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <div className="mt-10 p-6 border-t border-t-muted mx-auto text-center">
          <h3 className="font-semibold mb-2">{t('FAQ.haveQuestion')}</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">{t('FAQ.sendEmail')}</p>
         <EmailButton />
        </div>
      </CardFooter>
    </>
  );
};

const page = async () => {
  const faqs = await getFaqs();
  return (
    <Card className="container my-8 mx-auto">
      <PageContent faqs={faqs} />
    </Card>
  );
};

export default page;

