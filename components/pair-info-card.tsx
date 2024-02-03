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

import { useEffect, useState } from 'react'
import { PairInfo } from '@/types/currency-pair'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CurrencyPair, GetPriceResponse } from '@/types/slinky'
import axios from '@/utils/axios'
dayjs.extend(utc)
dayjs.extend(relativeTime)

export default function PairInfoCard({
  pair: { Base, Quote },
}: {
  pair: CurrencyPair
}) {
  const [pairInfo, setPairInfo] = useState<PairInfo>()
  const [isLoading, setIsLoading] = useState(false)
  const computeReadablePrice = (price: string, decimals: string) => {
    const insertPosition = price.length - parseInt(decimals)
    price = price.slice(0, insertPosition) + '.' + price.slice(insertPosition)
    // remove trailing zeros after decimal point
    price = price.replace(/0+$/, '')
    return price
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
        `https://lcd.mahalo-1.initia.xyz/slinky/oracle/v1/get_price?currency_pair_id=${Base}/${Quote}`
      )

      setPairInfo({
        base: Base,
        quote: Quote,
        price: rawPrice.price,
        decimals: decimals,
        blockTimestamp: rawPrice.block_timestamp,
      })
    } catch (error) {
      console.log(error)
      alert('Having trouble fetching data, please try again later.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getPrice()
  }, [])

  return isLoading ? (
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
          <SkeletonCircle size='8' />
          <div>
            <Text className='text-xl font-medium' color='gray.100'>
              {pairInfo?.base}/{pairInfo?.quote}
            </Text>
            <Text className='text-lg font-mono' color='gray.400'>
              ${readablePrice}
            </Text>
          </div>
        </Flex>
        <Text className='text-xs font-mono' color='gray.500'>
          Updated {updatedSince}
        </Text>
      </CardBody>
    </Card>
  )
}
