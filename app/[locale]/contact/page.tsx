import React from 'react'
import Content from './Content'
import { getAuthors } from '@/sanity/sanity-utils'

const page = async () => {

  const authors = await getAuthors()
  return (
    <div>
      <Content authors={authors} />
    </div>
  )
}

export default page