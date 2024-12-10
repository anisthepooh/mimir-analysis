import { BadgeCheck, CheckCheckIcon, HandCoins } from "lucide-react"
import { useTranslations } from "next-intl"

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
      <div className="py-16 max-w-screen-xl mx-auto px-4 md:px-8 ">
        <div id="features" className="custom-screen text-slate-600">
          <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 border text-sky-600 bg-sky-100 shadow-sm rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg text-black font-semibold">
                    {item.title}
                  </h4>
                  <p>
                    {item.desc}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
}

export default Features