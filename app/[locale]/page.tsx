'use client'
import { Button } from '@/components/ui/button'
import { Download, TestTube, TestTubeDiagonal } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LogoGrid from './General/LogoGrid';
import Features from './General/Features';
import RTLSection from './General/RTLSection';
import TestimonialSection from './General/TestimonialSection';
import Image from 'next/image';
import GradientWrapper from '../Components/GradientWrapper';
import InfoDot from '../Components/InfoDot';

const page = () => {
  const t = useTranslations()
  const locale = useLocale()
  const [animate, setAnimate] = useState(0)
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setAnimate((aPrev) => (aPrev < 5 ? aPrev + 1 : 0)); 
          return 0; 
        }
        return prev + 2; 
      });
    }, 100);

    return () => clearInterval(interval); 
  }, [animate]); 

  return (
    <div className='w-full overflow-hidden '>
      <div className=" py-8 bg-gradient-to-b from-sky-200 to-slate-50">
        <div className="container px-4 md:px-6 mx-auto ">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 mb-4">
              <span className='flex gap-2 justify-center items-baseline font-bold text-sky-800 text-xl mb-4 '>
              <span className='w-6 h-6 bg-sky-800 rounded-md flex items-center justify-center border-t-2 border-t-sky-400'>
                <TestTubeDiagonal size={16} className='text-sky-200' />
              </span>
                <span>
                  Mimir
                  <span className='text-[10px] text-sky-600'> v.1.0</span>
                </span>
              </span>
              <h1 className="text-4xl font-bold tracking-tighter ">
                {t('landing.title')}
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500">
                {t('landing.subtitle')}
              </p>
            </div>
            <div className="flex items-end gap-4 ">
              <Button variant={'ghost'} className='hidden'>
                <Download />
                {t('landing.download_as_app')}
              </Button>
              <Button asChild>
                <Link href={`${locale}/dashboard`} prefetch={true}>
                  <TestTube />
                  {t('landing.get_started')}
                </Link>
              </Button>
            </div>
          </div>
          <div className='w-[800px] h-[400px] relative mt-8 rounded-3xl mx-auto'>
            <div className='w-[816px] h-[416px] bg-sky-200 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[32px]'></div>
            <InfoDot classNames='peer right-[25%] bottom-[20%]' message={t('landing.point_graph')} side="right" idx={0} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <InfoDot classNames='peer right-[15%] top-[5%]' message={t('landing.point_print')} side="right" idx={1} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <InfoDot classNames='peer left-[15%] top-[5%]' message={t('landing.point_models')} side="left" idx={2} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <InfoDot classNames='peer left-[15%] bottom-[5%]' message={t('landing.point_interpretation')} side="left" idx={3} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <InfoDot classNames='peer left-[50%] top-[15%]' message={t('landing.point_input')} side="top" idx={4} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <InfoDot classNames='peer left-[25%] top-[40%]' message={t('landing.point_table')} side="top" idx={5} animate={animate} progress={progress} setAnimate={setAnimate}/>
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
              alt=''
              src={"/logos/demo-shot.png"}
              width={800}
              height={400}
              className='object-fit relative z-10 rounded-[24px] shadow peer-hover:shadow-xl hover:shadow-xl transition-shadow duration-300 '
            />
          </div>
        </div>
        <LogoGrid hidden />
      </div>
      <GradientWrapper>
        <Features />
        <RTLSection ltr hidden />
        <RTLSection hidden />
      </GradientWrapper>
      <GradientWrapper hidden>
        <TestimonialSection hidden />
      </GradientWrapper>
    </div>
  )
}

export default page