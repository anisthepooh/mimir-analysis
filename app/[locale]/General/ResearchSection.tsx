import { AlertTriangle, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const ResearchSection = () => {
  const t = useTranslations()

  return (
    <div className="py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('landing.research_title')}</h2>
            <p className="text-slate-600 text-lg">{t('landing.research_subtitle')}</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">{t('landing.research_based')}</h3>
            <p className="text-slate-600 mb-6">{t('landing.research_description')}</p>
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700 mb-3">{t('landing.research_papers_title')}</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="https://pubmed.ncbi.nlm.nih.gov/19470219/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-sky-300 hover:bg-sky-50 transition-colors group"
                >
                  <span className="font-medium text-slate-700">{t('landing.paper1_name')}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </Link>
                <Link 
                  href="https://pubmed.ncbi.nlm.nih.gov/33876828/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-sky-300 hover:bg-sky-50 transition-colors group"
                >
                  <span className="font-medium text-slate-700">{t('landing.paper2_name')}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchSection