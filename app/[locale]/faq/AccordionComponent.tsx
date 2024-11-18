import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Faq } from '@/types/Faq';

interface AccordionComponentProps {
  faq: Faq;
}


const AccordionComponent: React.FC<AccordionComponentProps> = ({ faq }) => {

  const {question, answer, _id} = faq || {}
  return (
    <AccordionItem value={_id}>
      <AccordionTrigger className='font-semibold'>{question}</AccordionTrigger>
      <AccordionContent>
        {answer}
      </AccordionContent>
    </AccordionItem>
  )
}

export default AccordionComponent