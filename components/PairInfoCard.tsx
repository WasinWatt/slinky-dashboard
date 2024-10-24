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
  toggleRefresh,
}: {
  pair: CurrencyPair
  selectedNetwork: string
  toggleRefresh: boolean
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
        `${chainInfo[selectedNetwork].lcd}/connect/oracle/v2/get_price?currency_pair=${Base}/${Quote}`
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

  useEffect(() => {
    getPrice()
  }, [toggleRefresh])

  return !pairInfo ? (
    <Box
      className='mx-auto h-48 w-52 lg:w-64 rounded-xl'
      padding='6'
      border='1px solid'
      borderColor='gray.700'
    >
      <div className='flex justify-start'>
        <SkeletonCircle size='6' />
      </div>
      <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
    </Box>
  ) : (
    <Card
      className='mx-auto h-48 w-52 lg:w-64 rounded-xl'
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
          <Text className='text-xs font-mono text-gray-500'>
            Updated {updatedSince}
          </Text>
          <div className='flex items-center gap-1'>
            <Text className='text-xs font-mono text-gray-500'>at height</Text>
            <CustomIcon name='block' boxSize={3} color='gray.600' mr={0} />
            <Text className='text-xs font-mono text-gray-500'>
              {pairInfo?.blockHeight}
            </Text>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
