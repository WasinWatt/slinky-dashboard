'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'
import { createContext, useContext, useEffect, useState } from 'react'

const colors = {
  'default-background': '#020617',
  gray: {
    900: '#0A101E',
    800: '#1E2535',
    700: '#334155',
    600: '#707E94',
    500: '#8A99AE',
    400: '#B7C1CD',
    100: '#F8FAFC',
  },
  sallmon: '#F7931A',
}

const firebaseConfig = {
  apiKey: 'AIzaSyBNWIg7-i8xyL30F2BRZ7ujmILXdEWKtQY',
  authDomain: 'slinky-dashboard-5ea3d.firebaseapp.com',
  projectId: 'slinky-dashboard-5ea3d',
  storageBucket: 'slinky-dashboard-5ea3d.appspot.com',
  messagingSenderId: '68666697929',
  appId: '1:68666697929:web:17ba9ba5b0f98fe38a4518',
  measurementId: 'G-82GTDL7JQH',
}

export const theme = extendTheme({ colors })

type GAContext = {
  analytics: ReturnType<typeof getAnalytics> | null
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Context = createContext<GAContext>()

export function Providers({ children }: { children: React.ReactNode }) {
  const [analytics, setAnalytics] = useState<Analytics | null>(() => null)

  useEffect(() => {
    let app = getApps()[0]

    if (!app) {
      app = initializeApp(firebaseConfig)
    }

    setAnalytics(getAnalytics(app))
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Context.Provider value={{ analytics }}>{children}</Context.Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export const useGA = () => useContext(Context)
