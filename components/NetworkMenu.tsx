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
      className='bg-slate-900 hover:bg-slate-800 text-left items-center w-full'
      rightIcon={<ChevronDownIcon />}
    >
      <Text className='font-mono text-sm font-normal text-gray-100'>
        {chainInfo[selectedNetwork].prettyName}
      </Text>
    </MenuButton>
    <MenuList
      border='1px solid'
      borderColor='gray.700'
      className='font-mono text-sm font-normal bg-slate-900'
    >
      {Object.keys(chainInfo).map((network) => (
        <MenuItem
          key={network}
          className='hover:bg-slate-800 text-gray-100'
          onClick={() => onSelect(network)}
        >
          {chainInfo[network].prettyName}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)
