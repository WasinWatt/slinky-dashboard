'use client'

import { RepeatIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AllPairsResponse, CurrencyPair } from '@/types/slinky'
import axios from '@/utils/axios'
import PairInfoCardGroup from '@/components/pair-info-card-group'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [pairs, setPairs] = useState<CurrencyPair[]>(() => [])

  const getAllPairs = async () => {
    setIsLoading(true)
    try {
      const {
        data: { currency_pairs: rawCurrencyPairs },
      }: {
        data: AllPairsResponse
      } = await axios.get(
        'https://lcd.mahalo-1.initia.xyz/slinky/oracle/v1/get_all_tickers'
      )

      setPairs(rawCurrencyPairs)
    } catch (error) {
      console.log(error)
      alert('Having trouble fetching data, please try again later.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllPairs()
  }, [])

  return (
    <>
      <div className='text-center mb-5'>
        <h1 className='font-semibold text-3xl mb-1'>Slinky Oracle Dashboard</h1>
        <p className='text-sm text-gray-600'>
          View all prices from Slinky Oracle here
        </p>
      </div>
      {/* render currencyPairs */}
      <PairInfoCardGroup pairs={pairs} isLoading={isLoading} />
      <div className='fixed bottom-5 right-5 z-50'>
        <Button
          leftIcon={<RepeatIcon />}
          variant={'solid'}
          className='bg-primary hover:bg-primary hover:scale-105 mb-2'
          onClick={() => getAllPairs()}
        />
      </div>
    </>
  )
}
