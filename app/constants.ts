type ChainInfoType = {
  [key: string]: {
    prettyName: string
    explorer: string
    lcd: string
    rpc: string
  }
}

export const chainInfo: ChainInfoType = {
  'mahalo-1': {
    prettyName: 'Initia (mahalo-1)',
    explorer: 'https://scan.testnet.initia.xyz',
    lcd: 'https://lcd.mahalo-1.initia.xyz',
    rpc: 'https://rpc.mahalo-1.initia.xyz:443',
  },
  artio: {
    prettyName: 'Berachain (artio)',
    explorer: 'https://artio.beratrail.io',
    lcd: 'https://berachain-testnet-api.polkachu.com',
    rpc: 'https://berachain-testnet-rpc.polkachu.com',
  },
}

export const assetLogo: { [key: string]: string } = {
  BTC: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400',
  ETH: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628',
  TIA: 'https://assets.coingecko.com/coins/images/31967/small/tia.jpg?1696530772',
  ATOM: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png?1696502525',
  USDC: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png?1696506694',
  BITCOIN:
    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400',
  ETHEREUM:
    'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628',
}
