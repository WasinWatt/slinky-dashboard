import type { TabProps } from '@chakra-ui/react'
import {
  Skeleton,
  Button,
  useTab,
  Badge,
  useMultiStyleConfig,
} from '@chakra-ui/react'

interface CustomTabProps extends TabProps {
  count?: number | string | null | undefined
  isLoading?: boolean
}

export const CustomTab = ({
  count,
  isLoading,
  isDisabled,
  ...restProps
}: CustomTabProps) => {
  const tabProps = useTab({ ...restProps })
  const isSelected = tabProps['aria-selected']
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button
      __css={styles.tab}
      className='font-mono font-semibold flex items-center text-sm mb-0 min-w-fit'
      sx={{
        '&[aria-selected=true]': {
          color: 'primary.main',
        },
        '&[aria-selected=false]': {
          color: 'gray.500',
        },
      }}
      isDisabled={isDisabled}
      _active={{
        bg: 'unset',
      }}
      {...tabProps}
    >
      {tabProps.children}

      {isLoading ? (
        <Skeleton
          ml={2}
          h={4}
          w={8}
          borderRadius={8}
          startColor='gray.500'
          endColor='gray.700'
        />
      ) : (
        count !== undefined && (
          <Badge variant={isSelected ? 'primary' : 'gray'} ml={2}>
            {count === null ? 'N/A' : count}
          </Badge>
        )
      )}
    </Button>
  )
}
