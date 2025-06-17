import { BadgeCheck, CheckCheckIcon, HandCoins } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Features = () => {
  const t = useTranslations()

    const features = [
        {
            icon: <CheckCheckIcon className="w-6 h-6" />,
            title: t('feature.easy_to_use'),
            desc: t('feature.easy_to_use_description')
        },
        {
            icon: <BadgeCheck className="w-6 h-6" />,
            title: t('feature.validated'),
            desc: t('feature.validated_description')
        },
        {
            icon: <HandCoins className="w-6 h-6" />,
            title: t('feature.free_to_use'),
            desc: t('feature.free_to_use_description')
        }
    ]

    return (
      <div className="py-20 max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Why Choose Mimir?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Built for professionals who need accurate, reliable cannabis metabolite analysis
          </p>
        </div>
        <div id="features" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => (
            <Card key={idx} className="border-2 hover:border-sky-200 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-slate-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 leading-relaxed text-center">
                  {item.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
}

export default Features