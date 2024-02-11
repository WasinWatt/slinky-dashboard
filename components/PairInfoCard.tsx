'use client'
import {
  Card,
  Flex,
  CardBody,
  Box,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PairInfo } from '@/types/currency-pair'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CurrencyPair, GetPriceResponse } from '@/types/slinky'
import axios from '@/utils/axios'
import { chainInfo } from '@/app/constants'
import { assetLogo } from '@/app/constants'
import { CustomIcon } from './icon/CustomIcon'
import CodeSnippet from './CodeSnippet'
dayjs.extend(utc)
dayjs.extend(relativeTime)

export default function PairInfoCard({
  pair: { Base, Quote },
  selectedNetwork,
}: {
  pair: CurrencyPair
  selectedNetwork: string
}) {
  const [pairInfo, setPairInfo] = useState<PairInfo>()
  const [isLoading, setIsLoading] = useState(false)
  const computeReadablePrice = (price: string, decimals: string) => {
    const insertPosition = price.length - parseInt(decimals)
    price = price.slice(0, insertPosition) + '.' + price.slice(insertPosition)
    // if price starts with ., add 0 before it
    if (price.startsWith('.')) {
      price = '0' + price
    }
    // Remove trailing zeros after decimal point
    price = price.replace(/\.?0+$/, '')
    // Ensure the total length does not exceed 8 digits
    const [integerPart, decimalPart] = price.split('.')
    if (integerPart.length >= 8) {
      return integerPart.slice(0, 8)
    }

    if (!decimalPart) {
      return integerPart
    }

    return integerPart + '.' + decimalPart.slice(0, 8 - integerPart.length)
  }

  const readablePrice = pairInfo
    ? computeReadablePrice(pairInfo.price, pairInfo.decimals)
    : 'N/A'
  const updatedSince = pairInfo
    ? dayjs.utc(pairInfo.blockTimestamp).fromNow()
    : 'N/A'

  const getPrice = async () => {
    setIsLoading(true)
    try {
      const {
        data: { price: rawPrice, decimals },
      }: { data: GetPriceResponse } = await axios.get(
        `${chainInfo[selectedNetwork].lcd}/slinky/oracle/v1/get_price?currency_pair_id=${Base}/${Quote}`
      )

      setPairInfo({
        base: Base,
        quote: Quote,
        price: rawPrice.price,
        decimals: decimals,
        blockTimestamp: rawPrice.block_timestamp,
        blockHeight: rawPrice.block_height,
      })
    } catch (error) {
      console.log(error)
      alert('Having trouble fetching data, please try again later.')
    }
    setIsLoading(false)
  }

  // call getPrice every 10 seconds
  useEffect(() => {
    getPrice()
    const interval = setInterval(() => {
      getPrice()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return !pairInfo ? (
    <Box
      width={200}
      height={180}
      padding='6'
      border='1px solid'
      borderColor='gray.700'
      rounded={'md'}
    >
      <div className='flex justify-start'>
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
      </div>
      <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
    </Box>
  ) : (
    <Card
      className='mx-auto h-48 w-52 rounded-xl'
      bg='gray.900'
      border='1px solid'
      borderColor='gray.700'
    >
      <CardBody
        p={3}
        className='flex flex-col justify-between gap-x-1 break-words'
      >
        <Flex className='flex-col gap-4'>
          {pairInfo && assetLogo[pairInfo.base] ? (
            <div className='flex justify-between'>
              <Image
                src={assetLogo[pairInfo.base]}
                width={8}
                height={8}
                borderRadius='full'
                alt={`${pairInfo?.base} logo`}
              />
              <CodeSnippet
                network={selectedNetwork}
                base={pairInfo.base}
                quote={pairInfo.quote}
              />
            </div>
          ) : (
            <SkeletonCircle size='8' />
          )}
          <div>
            <Text className='text-xl font-medium' color='gray.100'>
              {pairInfo?.base}/{pairInfo?.quote}
            </Text>
            <Text className='text-lg font-mono' color='gray.400'>
              ${readablePrice}
            </Text>
          </div>
        </Flex>
        <div>
          <Text className='text-xs font-mono' color='gray.500'>
            Updated {updatedSince}
          </Text>
          <Text className='text-xs font-mono' color='gray.500'>
            at height {pairInfo?.blockHeight}
          </Text>
        </div>
      </CardBody>
    </Card>
  )
}
