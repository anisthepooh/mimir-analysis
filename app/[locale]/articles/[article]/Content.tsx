'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils'
import { useLocale } from 'next-intl';
import { PortableText, PortableTextReactComponents } from 'next-sanity';
import Image from 'next/image'
import React, { ReactNode } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from '@/sanity/client';
import {getFileAsset} from '@sanity/asset-utils'
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/Article';

type Props = {
  article: Article;
};

const Content = ({article}: Props) => {
  const localActive = useLocale();
  const {coverImage, title, resume, authorFirstname, authorLastname, authorImage, authorTitle, publishedAt, slug, content, attachementName, attatchment } = article || {}

   
  const urlFor = (source: string) => {
    return imageUrlBuilder(client).image(source)
  }

  const fileUrlFor = (source: string) => {
    return getFileAsset (source, client.config())
  }


  // @ts-ignore
  const components: PortableTextReactComponents = {
    block: {
      h1: ({ children }) => <h1 className="text-2xl bg-slate-400">{children}</h1>,
      p: ({ children }) => <p className="text-sm text-green-500">{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-10">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal l-10">{children}</ol>,
      checkmarks: ({ children }) => <ol className="m-auto text-lg">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      checkmarks: ({ children }) => <li>✅ {children}</li>,
    },
    types: {
      image: ({value, isInline}) => <img className='rounded-lg border border-slate-100 shadow-md my-4' src={urlFor(value).width(isInline ? 100 : 800).fit('max').auto('format').url()} />
    },
  };

  const handleClick = () => {
    window.location.href = fileUrlFor(attatchment).url;
  }

  return (
    <div className="px-4 py-6 md:px-6 lg:py-16 max-w-3xl mx-auto">
         <article className="prose prose-zinc mx-auto " key={title}>
          <Image src={coverImage} width={1250} height={340} alt={title} /> 
          <p className="text-zinc-500  mb-2">{formatDate(publishedAt, localActive )}</p>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem] mb-4">
            {title}
          </h1>
          <div className='flex justify-between flex-wrap'>
            <div className="flex items-center gap-3 mb-4">
              <div className="avatar placeholder">
              <Avatar>
                {authorImage ? 
                  <AvatarImage src={authorImage} />
                  : 
                  <AvatarFallback className='capitalize'>
                    {`${authorFirstname[0]}${authorLastname[0]}`}
                  </AvatarFallback>     
                }
              </Avatar>
              </div> 
              <div className="grid gap-0.5 text-xs">
                <div className="font-semibold font-sm text-muted-foreground">{`${authorFirstname} ${authorLastname}`}</div>
                <div className="font-medium italic">{authorTitle}</div>
              </div>
            </div>
          </div>
          <PortableText
            value={content}
            components={components}
          />
           { attachementName && 
           <Button variant={'secondary'} className='font-semibold' onClick={handleClick} >
              <Download className='' size={32} />
              {attachementName}
           </Button>
            }
        </article>
    </div>
  )
}

export default Content