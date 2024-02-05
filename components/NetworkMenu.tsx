import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { chainInfo } from '../app/constants'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface NetworkMenuProps {
  selectedNetwork: string
  onSelect: (network: string) => void
}

export const NetworkMenu: React.FC<NetworkMenuProps> = ({
  selectedNetwork,
  onSelect,
}) => (
  <Menu>
    <MenuButton
      as={Button}
      size='md'
      minW={200}
      border='1px solid'
      borderColor='gray.700'
      color='gray.100'
      background='gray.900'
      _hover={{ background: 'gray.800' }}
      _active={{ background: 'gray.800' }}
      rightIcon={<ChevronDownIcon />}
      className='text-left items-center w-full'
    >
      <Text className='font-mono text-sm font-normal' color='gray.100'>
        {chainInfo[selectedNetwork].prettyName}
      </Text>
    </MenuButton>
    <MenuList
      border='1px solid'
      borderColor='gray.700'
      background='gray.900'
      className='font-mono text-sm font-normal w-full'
    >
      {Object.keys(chainInfo).map((network) => (
        <MenuItem
          key={network}
          onClick={() => onSelect(network)}
          color='gray.100'
          _hover={{ background: 'gray.800' }}
        >
          {chainInfo[network].prettyName}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)
