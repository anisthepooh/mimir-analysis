import { Button } from '@/components/ui/button'
import { TestTube } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

const CTASection = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="py-16 bg-gradient-to-r from-sky-600 to-blue-600">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{t('landing.cta_title')}</h2>
        <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">{t('landing.cta_subtitle')}</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href={`${locale}/dashboard`}>
            <TestTube className="mr-2" />
            {t('landing.start_analysis')}
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default CTASection