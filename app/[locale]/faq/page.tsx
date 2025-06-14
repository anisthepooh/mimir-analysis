import React from 'react'
import { getFaqs } from "@/sanity/sanity-utils";
import Content from './Content'
import GradientWrapper from '@/app/Components/GradientWrapper';
import Loading from './loading';

// ISR: Revalidate FAQ page every 60 seconds
export const revalidate = 60

const page = async () => {
  const faqs = await getFaqs();
  return (
    <GradientWrapper>
      <div className='container relative mx-auto max-w-4xl py-6 lg:py-10"'>
        <Content faqs={faqs} />
      </div>
    </GradientWrapper>
  );
};

export default page;

