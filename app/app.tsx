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
  }, [selectedNetwork])

  return (
    <Flex className='flex-col items-center justify-center'>
      <Flex className='flex-col gap-6 items-center  mb-8'>
        <div className='text-center'>
          <Text className='font-light text-4xl mb-1' color='gray.100'>
            Slinky Oracle Dashboard
          </Text>
          <Text color='gray.600' className='text-sm font-mono pt-1'>
            Current Prices and Last Updated Insights from Slinky Oracle here
          </Text>
        </div>
        <Flex className='w-full gap-4 justify-between items-center'>
          <NetworkMenu
            selectedNetwork={selectedNetwork}
            onSelect={setSelectedNetwork}
          />
        </Flex>
      </Flex>
      <PairInfoCardGroup
        pairs={pairs}
        isLoading={isLoading}
        selectedNetwork={selectedNetwork}
      />
    </Flex>
  )
}
