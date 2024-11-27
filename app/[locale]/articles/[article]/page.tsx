import { getArticle } from '@/sanity/sanity-utils'
import React from 'react'
import Content from './Content'

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