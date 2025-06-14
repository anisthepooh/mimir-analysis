import { getArticle } from '@/sanity/sanity-utils'
import React from 'react'
import Content from './Content'

// ISR: Revalidate individual articles every 60 seconds
export const revalidate = 60

type Props = {
  params: {article: string}
}

const page = async ({params}: Props) => {

  const slug = params.article
  const article = await getArticle(slug)

  return (
    <div className='bg-white'>
      <Content article={article} />
    </div>
  )
}

export default page