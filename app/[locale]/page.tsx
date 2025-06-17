'use client'
import React from 'react'
import HeroSection from './General/HeroSection'
import Features from './General/Features'
import AnalysisModels from './General/AnalysisModels'
import HowItWorks from './General/HowItWorks'
import ResearchSection from './General/ResearchSection'
import ArticlesSection from './General/ArticlesSection'
import ContributorsSection from './General/ContributorsSection'
import CTASection from './General/CTASection'
import GradientWrapper from '../Components/GradientWrapper'
import { getArticles, getAuthors, getLatestArticles } from '@/sanity/sanity-utils'

const page = async () => {
  const authors = await getAuthors()
  const articles = await getLatestArticles()
  
  return (
    <div className='w-full overflow-hidden'>
      <HeroSection />
      
      <GradientWrapper>
        <Features />
      </GradientWrapper>

      <AnalysisModels />
      <HowItWorks />
      <ResearchSection />
      <ArticlesSection articles={articles} />
      <ContributorsSection authors={authors} />
      <CTASection />
    </div>
  )
}

export default page