import { useTranslations } from 'next-intl'
import React from 'react'

const Footer = () => {
  const t = useTranslations()
  return (
    <footer className=" rounded-lg m-4 mt-16 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center ">
        {t('license')}
      <a className="hover:underline" href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank"> https://www.gnu.org/licenses/agpl-3.0.en.html</a>.
      </span>
    </div>
  </footer>
  )
}

export default Footer