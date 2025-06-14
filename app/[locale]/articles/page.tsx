import { getArticles } from '@/sanity/sanity-utils'
import React from 'react'
import Content from './Content'
import GradientWrapper from '@/app/Components/GradientWrapper'

// ISR: Revalidate articles page every 60 seconds
export const revalidate = 60

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