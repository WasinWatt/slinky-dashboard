import { SimpleGrid } from '@chakra-ui/react'

import PairInfoCard from './PairInfoCard'
import { CurrencyPair } from '@/types/slinky'

export default function PairInfoCardGroup({
  pairs,
  selectedNetwork,
  toggleRefresh,
}: {
  pairs: CurrencyPair[]
  selectedNetwork: string
  toggleRefresh: boolean
}) {
  return (
    <SimpleGrid
      spacing={{ base: 4, md: 6 }}
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
          toggleRefresh={toggleRefresh}
          key={pair.Base + pair.Quote}
          selectedNetwork={selectedNetwork}
        />
      ))}
    </SimpleGrid>
  )
}
