'use client'
import { useState, useEffect } from 'react'
import { Author } from '@/types/Author'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { Users, Loader2 } from 'lucide-react'
import { isEmpty } from 'lodash'

type Props = {
  authors: Author[];
}

const ContributorsSection= ({ authors }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('landing.contributors_title')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('landing.contributors_subtitle')}</p>
        </div>

        {isEmpty(authors) ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            <span className="ml-2 text-slate-600">Loading contributors...</span>
          </div>
        ) : authors.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
              {authors.map((author, idx) => (
                <div key={idx} className="group bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-full px-4 py-2 transition-all duration-300 hover:shadow-md cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {author.image ? (
                        <AvatarImage src={author.image} alt={`${author.firstname} ${author.lastname}`} />
                      ) : (
                        <AvatarFallback className="text-xs font-medium">
                          {author.firstname[0]}{author.lastname[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                        {author.firstname} {author.lastname}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {author.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/contact`}>
                  <Users className="mr-2 w-5 h-5" />
                  {t('landing.view_all_contributors')}
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-slate-600 mb-8">
              Meet the dedicated team behind the Mimir Cannabis Analysis platform.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/contact`}>
                <Users className="mr-2 w-5 h-5" />
                {t('landing.view_all_contributors')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContributorsSection