import { getArticles } from '@/sanity/sanity-utils'
import React from 'react'
import Content from './Content'

const page = async () => {
  const articles = await getArticles()
  
  return (
    <div className='bg-white'>
      <Content articles={articles} />
    </div>
    
  )
}

export default page