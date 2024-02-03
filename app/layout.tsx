import { Flex, Text } from '@chakra-ui/react'
import './globals.css'
// import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'

// const inter = Inter({ weight: ['400', '600', '700'] })

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
          <Flex
            className='flex-col mx-auto min-h-screen relative items-center justify-between'
            background='default-background'
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage:
                  'radial-gradient(circle at center, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.6) 100%), url("/bg-image.jpg")',
                backgroundSize: 'cover cover',
                opacity: 0.075,
                zIndex: 0,
              }}
            />
            <div />
            <div
              className='max-w-7xl py-10 px-2 w-full justify-between'
              style={{ position: 'relative', zIndex: 1 }}
            >
              {children}
            </div>
            <div className='lg-p-8 p-4 w-full'>
              <Flex
                border='1px solid'
                borderColor='gray.800'
                className='px-6 py-4 rounded-lg max-w-7xl bg-gradient-to-r from-[#172132] to-[#03091E] justify-between'
              >
                <Text color='gray.400' className='font-mono text-sm'>
                  Built by Alles
                </Text>
                <Text color='gray.400' className='font-mono text-sm'>
                  ✨💻
                </Text>
              </Flex>
            </div>
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
