'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils';
import { Article } from '@/types/Article';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ArticleCardProps {
  article: Article;
}


const ArticleCard: React.FC<ArticleCardProps>  = ({article}) => {
  const localActive = useLocale();
  const {coverImage, title, resume, authorFirstname, authorLastname, authorImage, authorTitle, publishedAt, slug } = article || {}

  return (
    <Card key={slug} className="flex flex-col overflow-hidden p-4 shadow-none">
      <CardHeader className="flex-1 space-y-4 p-0">
        <Link href={`/${localActive}/articles/${slug}`}>
          <div className="aspect-[2/1] overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={title}
              width={600}
              height={300}
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            <Link href={`/${localActive}/articles/${slug}`}>{title}</Link>
          </h2>
          <p className="text-muted-foreground line-clamp-3">{resume}</p>
        </div>
        <div className='flex gap-2 '>
          <Avatar>
            {authorImage ? 
          <AvatarImage src={authorImage} />
          : 
          <AvatarFallback className='capitalize'>
            {`${authorFirstname[0]}${authorLastname[0]}`}
          </AvatarFallback>  
          }
          </Avatar>
          <div>
            <p className='font-semibold font-sm text-muted-foreground'>{`${authorFirstname} ${authorLastname}`}</p>
            <p className='text-muted-foreground'>{authorTitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-0 pt-4">
        <time dateTime={publishedAt.toString()} className="text-sm text-muted-foreground">
          {formatDate(publishedAt, localActive )}
        </time>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard