'use client'
import { Article } from '@/types/Article'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react'
import { isEmpty } from 'lodash'

type Props = {
  articles: Article[];
}


const ArticlesSection = ({articles}: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('landing.articles_title')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('landing.articles_subtitle')}</p>
        </div>

        {isEmpty(articles) ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            <span className="ml-2 text-slate-600">Loading articles...</span>
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {articles.map((article) => (
                <Card key={article.slug} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-sky-200">
                  <CardHeader className="p-0">
                    <Link href={`/${locale}/articles/${article.slug}`}>
                      <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          width={600}
                          height={337}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-6 pb-4">
                      <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors">
                        <Link href={`/${locale}/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed line-clamp-3">
                        {article.resume}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="px-6 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        {article.authorImage ? (
                          <AvatarImage src={article.authorImage} />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {`${article.authorFirstname[0]}${article.authorLastname[0]}`}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {`${article.authorFirstname} ${article.authorLastname}`}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(article.publishedAt, locale)}
                        </p>
                      </div>
                    </div>
                    <Link href={`/${locale}/articles/${article.slug}`}>
                      <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50">
                        {t('common.read_more')}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/articles`}>
                  <BookOpen className="mr-2 w-5 h-5" />
                  {t('landing.view_all_articles')}
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-slate-600 mb-8">
              Explore our knowledge center for the latest insights on cannabis analysis and research.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/articles`}>
                <BookOpen className="mr-2 w-5 h-5" />
                {t('landing.view_all_articles')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticlesSection