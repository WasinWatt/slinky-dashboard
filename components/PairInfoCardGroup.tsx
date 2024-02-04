import { SimpleGrid } from '@chakra-ui/react'

import PairInfoCard from './PairInfoCard'
import { CurrencyPair } from '@/types/slinky'

export default function PairInfoCardGroup({
  pairs,
  selectedNetwork,
}: {
  pairs: CurrencyPair[]
  selectedNetwork: string
  isLoading: boolean
}) {
  console.log(pairs)
  return (
    <SimpleGrid
      spacing={6}
      columns={{
        base: 1,
        sm: 2,
        md: 3,
        lg: pairs.length > 4 ? 4 : pairs.length,
      }}
    >
      {pairs.map((pair) => (
        <PairInfoCard
          pair={pair}
          key={pair.Base + pair.Quote}
          selectedNetwork={selectedNetwork}
        />
      ))}
    </SimpleGrid>
  )
}
