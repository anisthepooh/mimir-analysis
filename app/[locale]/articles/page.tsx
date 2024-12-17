import { getArticles } from '@/sanity/sanity-utils'
import React from 'react'
import Content from './Content'
import GradientWrapper from '@/app/Components/GradientWrapper'

const page = async () => {
  const articles = await getArticles()
  
  return (
    <div className='bg-white '>
      <GradientWrapper>
        <Content articles={articles} />
      </GradientWrapper>
    </div>
    
  )
}

export default page