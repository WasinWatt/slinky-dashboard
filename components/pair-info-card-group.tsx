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
    <SimpleGrid spacing={6} columns={pairs.length >= 4 ? 4 : pairs.length}>
      {pairs.map((pair, index) => (
        <PairInfoCard pair={pair} key={index} />
      ))}
    </SimpleGrid>
  )
}
