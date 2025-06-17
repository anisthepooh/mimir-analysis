import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, TestTube } from 'lucide-react'
import { useTranslations } from 'next-intl'

const AnalysisModels = () => {
  const t = useTranslations()

  const analysisModels = [
    {
      title: t('landing.chronic_model'),
      description: t('landing.chronic_description'),
      icon: <Clock className="w-5 h-5" />,
      badge: "Kronisk"
    },
    {
      title: t('landing.occasional_model'),
      description: t('landing.occasional_description'), 
      icon: <TestTube className="w-5 h-5" />,
      badge: "Sporadisk"
    }
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('landing.models_title')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('landing.models_subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {analysisModels.map((model, idx) => (
            <Card key={idx} className="border-2 hover:border-sky-200 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center">
                      {model.icon}
                    </div>
                    <CardTitle className="text-xl">{model.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{model.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{model.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalysisModels