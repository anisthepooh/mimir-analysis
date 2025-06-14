import React from 'react'
import Content from './Content'
import { getAuthors } from '@/sanity/sanity-utils'
import GradientWrapper from '@/app/Components/GradientWrapper'

// ISR: Revalidate contact page every 60 seconds
export const revalidate = 60

const page = async () => {

  const authors = await getAuthors()
  return (
    <GradientWrapper>
      <div>
        <Content authors={authors} />
      </div>
    </GradientWrapper>
  )
}

export default page