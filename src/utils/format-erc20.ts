import { BigNumber, ethers } from 'ethers';

import { ERC20Contract } from '@/contracts';

export function formatERC20(num: BigNumber | undefined, token: ERC20Contract) {
  if (typeof num === 'undefined') {
    return null;
  }
  return ethers.utils.formatUnits(num, token.decimals);
}
