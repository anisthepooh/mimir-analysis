import React from 'react'
import { getFaqs } from "@/sanity/sanity-utils";
import Content from './Content'
import GradientWrapper from '@/app/Components/GradientWrapper';
import Loading from './loading';

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

