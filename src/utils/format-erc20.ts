import { BigNumber, ethers } from 'ethers';

import { ERC20Metadata } from '@/metadata';

export function formatERC20(num: BigNumber | undefined, token: ERC20Metadata) {
  if (typeof num === 'undefined') {
    return null;
  }
  return ethers.utils.formatUnits(num, token.decimals);
}
