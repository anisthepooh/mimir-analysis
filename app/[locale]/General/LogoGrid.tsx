import React from 'react'
import Image from 'next/image'
import freshbooks from '../../../public/logos/freshbooks.svg'
import sendgrid from '../../../public/logos/sendgrid.svg'
import layers from '../../../public/logos/layers.svg'
import adobe from '../../../public/logos/adobe.svg'
import { useTranslations } from 'next-intl'

type Props = {
  hidden?: boolean;
}
const LogoGrid = ({hidden}: Props) => {
  if (hidden) return null
  const t = useTranslations()

  const logos = [
    {
        src: freshbooks,
        alt: "freshbooks"
    },
    {
        src: sendgrid,
        alt: "sendgrid"
    },
    {
        src: layers,
        alt: "layers"
    },
    {
        src: adobe,
        alt: "adobe"
    },
]

  return (
    <div>
      <div className="mb-16 mt-8">
        <h2 className="font-semibold text-sm text-slate-500 text-center">{t('landing.used_by')}</h2>
          <div className="mt-6">
            <ul className="flex gap-x-10 gap-y-6 flex-wrap items-center justify-center md:gap-x-16">
              {logos.map((item, idx) => (
                  <li key={idx}>
                    <Image src={item.src} alt={item.alt} />
                  </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  )
}

export default LogoGrid