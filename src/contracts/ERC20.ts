import { ERC20Contract } from './ERC20Contract';

export const USDCToken = new ERC20Contract(
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  'USD Coin',
  'USDC',
  6
);

export const WETHToken = new ERC20Contract(
  '0x2956356cD2a2bf3202F771F50D3D14A367b48070',
  'Wrapped ETH',
  'WETH',
);
