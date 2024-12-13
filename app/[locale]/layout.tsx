import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css'
import Navbar from './General/Navbar';
import { Toaster } from 'sonner';
import Footer from '../Components/Footer';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import CookieConsent from '../Components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'My Next.js App',
  icons: {
    icon: '/favicon.ico',
  },
};

 
export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const isDevelopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true";
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} className={inter.variable}>
    <head>
      {!isDevelopment && (
        <Script
          src="https://mimir-analytics.casperanisimow.dk/script.js"
          data-website-id="e2f61db1-22f9-45ce-9ec8-146db1e4d9bb"
          strategy="lazyOnload"
        />
      )}
    </head>
      <body className='font-sans'>
        <NextIntlClientProvider messages={messages}>
          <div className='pb-16'>
            <Navbar />
            {children}
            <Footer />
          </div>
          <CookieConsent variant='small' />
          <Toaster richColors closeButton/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}