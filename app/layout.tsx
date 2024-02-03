import './globals.css'
// import { Prompt } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'

// const prompt = Prompt({ subsets: ['thai'], weight: ['400', '600', '700'] })

export const metadata = {
  title: 'Slinky Oracle Dashboard',
  description: 'Current prices & last updated insights from Slinky Oracle',
  openGraph: {
    title: 'Slinky Oracle Dashboard',
    description: 'Current prices & last updated insights from Slinky Oracle',
    url: 'https://domain.app',
    images: [
      {
        url: 'https://domain.app/og.png',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8900015899066295'
        crossOrigin='anonymous'
      />
      <body>
        <Providers>
          <div className='max-w-7xl mx-auto w-full min-h-screen relative'>
            <div className='py-10 px-2'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
