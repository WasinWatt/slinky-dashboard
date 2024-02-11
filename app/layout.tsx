import { Flex, Text, Image } from '@chakra-ui/react'
import './globals.css'
import { Providers } from './providers'
import { CustomIcon } from '@/components/icon/CustomIcon'

export const metadata = {
  title: 'Slinky Oracle Dashboard',
  description: 'Current prices & last updated insights from Slinky Oracle',
  openGraph: {
    title: 'Slinky Oracle Dashboard',
    description: 'Current prices & last updated insights from Slinky Oracle',
    url: 'https://slinky-dashboard.vercel.app',
    images: [
      {
        url: 'https://assets.alleslabs.dev/slinky-dashboard/ogimage.jpg',
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
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <Providers>
          <Flex className='flex-col mx-auto min-h-screen relative items-center justify-between bg-background-main'>
            <div
              className='absolute w-full h-full z-0'
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.6) 100%), url("/bg-image.jpg")',
                backgroundSize: 'cover cover',
                opacity: 0.075,
              }}
            />
            <div />
            <div className='max-w-7xl py-16 px-2 w-full justify-between z-10 relative'>
              {children}
            </div>
            <div className='lg-p-8 p-4 w-full flex justify-center mb-2 z-10'>
              <Flex
                border='1px solid'
                borderColor='gray.800'
                className='w-full px-6 py-4 rounded-lg max-w-7xl bg-gradient-to-r from-[#172132] to-[#03091E] justify-between'
              >
                <div className='flex gap-1 items-center'>
                  <Text color='gray.400' className='font-mono text-sm'>
                    Built by
                  </Text>
                  <Image
                    src='https://assets.alleslabs.dev/alles-brand/logo/full-gray.png'
                    width={14}
                    height='auto'
                    objectFit='contain'
                    alt='alles labs'
                  />
                </div>
                <div className='flex items-center gap-1'>
                  <a
                    href='https://github.com/alleslabs/slinky-dashboard'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <CustomIcon
                      name='github-solid'
                      boxSize={5}
                      className='text-gray-500 hover:scale-125 transition-all ease-in-out'
                    />
                  </a>
                  <a
                    href='https://twitter.com/alleslabs'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <CustomIcon
                      name='twitter-solid'
                      boxSize={5}
                      className='text-gray-500 hover:scale-125 transition-all ease-in-out'
                    />
                  </a>
                </div>
              </Flex>
            </div>
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
