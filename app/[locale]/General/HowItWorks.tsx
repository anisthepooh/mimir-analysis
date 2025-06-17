import { BarChart3, CheckCircle2, FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'

const HowItWorks = () => {
  const t = useTranslations()

  const howItWorks = [
    {
      step: "1",
      title: t('landing.step1_title'),
      description: t('landing.step1_desc'),
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: "2", 
      title: t('landing.step2_title'),
      description: t('landing.step2_desc'),
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      step: "3",
      title: t('landing.step3_title'),
      description: t('landing.step3_desc'),
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ]

  return (
    <div className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('landing.how_it_works')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('landing.how_it_works_subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorks.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-sky-200 rounded-full flex items-center justify-center text-xs font-bold text-sky-800 border-2 border-white">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks