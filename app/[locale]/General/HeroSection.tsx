'use client'

import { Button } from '@/components/ui/button'
import { TestTube, TestTubeDiagonal, Download } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import InfoDot from '../../Components/InfoDot'
import { useEffect, useState } from 'react'

const HeroSection = () => {
  const t = useTranslations()
  const locale = useLocale()
  const [animate, setAnimate] = useState(0)
  const [progress, setProgress] = useState(0)

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
    <div className="py-16 bg-gradient-to-b from-sky-200 to-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className='flex gap-2 justify-center items-baseline font-bold text-sky-800 text-xl mb-4'>
              <span className='w-8 h-8 bg-sky-800 rounded-md flex items-center justify-center border-t-2 border-t-sky-400'>
                <TestTubeDiagonal size={20} className='text-sky-200' />
              </span>
              <span>
                Mimir
                <span className='text-sm text-sky-600 ml-1'>v.1.0</span>
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              {t('landing.title')}
            </h1>
            <p className="mx-auto max-w-[800px] text-lg text-slate-600">
              {t('landing.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <Link href={`${locale}/dashboard`} prefetch={true}>
                <TestTube className="mr-2" />
                {t('landing.get_started')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" className='hidden'>
              <Download className="mr-2" />
              {t('landing.download_as_app')}
            </Button>
          </div>
        </div>

        {/* App Preview with InfoDots */}
        <div className='w-[800px] h-[400px] relative mt-16 rounded-3xl mx-auto'>
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
            alt='Mimir Cannabis Analysis Dashboard'
            src={"/logos/demo-shot.png"}
            width={800}
            height={400}
            className='object-fit relative z-10 rounded-[24px] shadow peer-hover:shadow-xl hover:shadow-xl transition-shadow duration-300'
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection