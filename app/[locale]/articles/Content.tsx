import React from 'react'
import ArticleCard from './ArticleCard'
import { useTranslations } from 'next-intl'
import { Article } from '@/types/Article'

type Props = {
  articles: Article[];
}

const Content = ({articles}: Props ) => {
  const t = useTranslations()
  return (
    <div className='container mx-auto max-w-4xl py-6 lg:py-10 px-4 md:px-6 mx-auto"'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading tracking-tight">{t('knowledgecenter')}</h1>
          <p className="text text-muted-foreground">{t('articles_description')}</p>
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