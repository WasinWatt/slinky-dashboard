'use client'
import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AllPairsResponse, CurrencyPair } from '@/types/slinky'
import axios from '@/utils/axios'
import PairInfoCardGroup from '@/components/PairInfoCardGroup'
import { chainInfo } from './constants' // Import chainInfo from constants
import { NetworkMenu } from '@/components/NetworkMenu'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [pairs, setPairs] = useState<CurrencyPair[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<string>(
    Object.keys(chainInfo)[0]
  )
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown === 1 ? 10 : prevCountdown - 1
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchPairs = async () => {
      setIsLoading(true)
      try {
        const lcdUrl = chainInfo[selectedNetwork].lcd
        const {
          data: { currency_pairs: rawCurrencyPairs },
        }: {
          data: AllPairsResponse
        } = await axios.get(`${lcdUrl}/slinky/oracle/v1/get_all_tickers`)
        setPairs(rawCurrencyPairs)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    fetchPairs()

    setCountdown(10)
  }, [selectedNetwork])

  return (
    <Flex className='flex-col items-center justify-center'>
      <Flex className='flex-col gap-6 items-center  mb-8'>
        <div className='text-center'>
          <Text className='font-light text-4xl mb-1' color='gray.100'>
            Slinky Oracle Dashboard
          </Text>
          <Text className='text-sm font-mono pt-1 text-gray-600'>
            Current Prices and Last Updated Insights from Slinky Oracle here
          </Text>
        </div>
        <Flex className='w-full gap-4 justify-between items-center'>
          <NetworkMenu
            selectedNetwork={selectedNetwork}
            onSelect={setSelectedNetwork}
          />
        </Flex>
        <div className='flex items-center gap-2 px-2 py-1 rounded-md bg-gray-800 bg-opacity-50 w-48 justify-center'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-gray-400'></span>
          </span>
          <Text className='text-xs font-mono pt-1 text-gray-400 mb-1'>
            Prices update in {countdown}s
          </Text>
        </div>
      </Flex>
      <PairInfoCardGroup
        pairs={pairs}
        isLoading={isLoading}
        selectedNetwork={selectedNetwork}
      />
    </Flex>
  )
}
