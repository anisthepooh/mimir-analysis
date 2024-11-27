import React from 'react'
import ArticleCard from './ArticleCard'
import { useTranslations } from 'next-intl'

const Content = ({articles}) => {
  const t = useTranslations()
  return (
    <div className='container mx-auto max-w-4xl py-6 lg:py-10"'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">{t('knowledgecenter')}</h1>
          <p className="text-xl text-muted-foreground">A blog built using Contentlayer. Posts are written in MDX.</p>
        </div>
      </div>
      <hr className="my-8"></hr>
      <div className='grid gap-10 sm:grid-cols-2'>
        {articles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  )
}

export default Content