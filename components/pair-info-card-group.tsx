import { SimpleGrid } from '@chakra-ui/react'

import PairInfoCard from './pair-info-card'
import { CurrencyPair } from '@/types/slinky'

export default function PairInfoCardGroup({
  pairs,
}: {
  pairs: CurrencyPair[]
  isLoading: boolean
}) {
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, 200px)'>
      {pairs.map((pair, index) => (
        <PairInfoCard pair={pair} key={index} />
      ))}
    </SimpleGrid>
  )
}
