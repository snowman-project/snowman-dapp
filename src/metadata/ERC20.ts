import { Interface } from '@ethersproject/abi';
import IERC20 from 'snowman-contracts/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';

import { ERC20Metadata } from './types';

export const USDCMetadata: ERC20Metadata = {
  name: 'USD Coin',
  symbol: 'USDC',
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  abi: new Interface(IERC20.abi),
  decimals: 6,
};

export const WETHMetadata: ERC20Metadata = {
  name: 'Wrapped ETH',
  symbol: 'WETH',
  address: '0x2956356cD2a2bf3202F771F50D3D14A367b48070',
  abi: new Interface(IERC20.abi),
  decimals: 18,
};
