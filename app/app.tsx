'use client'

import { ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
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
    <Flex className='flex-col items-center justify-center'>
      <Flex className='flex-col gap-6 items-center  mb-8'>
        <div className='text-center'>
          <h1 className='font-light text-4xl mb-1'>Slinky Oracle Dashboard</h1>
          <Text color='gray.600' className='text-sm font-mono pt-1'>
            Current Prices and Last Updated Insights from Slinky Oracle here
          </Text>
        </div>
        <Flex className='w-full gap-4 justify-between items-center'>
          {/* TODO move to new components and add logic */}
          <Menu>
            <MenuButton
              as={Button}
              size='md'
              minW={200}
              border='1px solid'
              borderColor='gray.700'
              className='bg-slate-900 hover:bg-slate-800 text-left items-center w-full'
              rightIcon={<ChevronDownIcon />}
            >
              <Text className='font-mono text-sm font-normal'>
                All Networks
              </Text>
            </MenuButton>
            <MenuList
              border='1px solid'
              borderColor='gray.700'
              className='font-mono text-sm font-normal bg-slate-900'
            >
              <MenuItem className='hover:bg-slate-800'>All Networks</MenuItem>
              <MenuItem className='hover:bg-slate-800'>
                mahalo-1 (initia)
              </MenuItem>
              <MenuItem className='hover:bg-slate-800'>
                artio (berachain)
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            leftIcon={<RepeatIcon />}
            variant={'solid'}
            size='md'
            className='bg-slate-800 hover:bg-slate-700 hover:scale-105 min-w-min'
            onClick={() => getAllPairs()}
          >
            <Text className='font-mono text-sm font-normal'>Refresh</Text>
          </Button>
        </Flex>
      </Flex>
      {/* render currencyPairs */}
      <PairInfoCardGroup pairs={pairs} isLoading={isLoading} />
    </Flex>
  )
}
