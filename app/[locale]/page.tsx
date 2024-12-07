'use client'
import { Button } from '@/components/ui/button'
import { Bookmark, TestTube, TestTubeDiagonal } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'
import LogoGrid from './General/LogoGrid';
import Features from './General/Features';
import RTLSection from './General/RTLSection';
import TestimonialSection from './General/TestimonialSection';

const page = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className='w-full '>
      <div className=" py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-200 to-slate-50">
        <div className="container px-4 md:px-6 mx-auto ">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 mb-4">
              <span className='flex gap-2 justify-center items-baseline font-bold text-sky-800 text-xl mb-4 '>
                <TestTubeDiagonal size={16} />
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
              <Button asChild>
                <Link href={`${locale}/dashboard`} prefetch={true}>
                  <TestTube />
                  Get started
                </Link>
              </Button>
              <Button variant={'outline'} >
                <Bookmark />
                Save to Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>
      <LogoGrid />
      <Features />
      <RTLSection ltr />
      <RTLSection />
      <TestimonialSection />
    </div>
  )
}

export default page