'use client'
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  SkeletonCircle,
  SkeletonText,
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
      bg='orange.100'
      border='2px'
      borderColor={'black'}
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
      width={200}
      height={180}
      className='mx-auto bg-orange-100'
      variant='outline'
      borderColor='black'
      borderWidth={2}
    >
      <CardHeader
        className='flex justify-start'
        paddingLeft='14px'
        paddingRight='12px'
        paddingTop='10px'
        paddingBottom='8px'
        wordBreak={'break-word'}
      >
        <div className='text-xl font-semibold flex justify-end gap-x-2 items-center'>
          <p>
            {pairInfo?.base}/{pairInfo?.quote}
          </p>
        </div>
      </CardHeader>
      <CardBody
        padding='14px'
        paddingTop='0px'
        className='flex justify-between gap-x-1'
        wordBreak={'break-word'}
      >
        <div>
          <p className='text-lg'>{readablePrice}</p>
          <p className='text-sm pt-3'>updated {updatedSince}</p>
        </div>
      </CardBody>
    </Card>
  )
}
