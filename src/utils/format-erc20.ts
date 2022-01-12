import { BigNumber, ethers } from 'ethers';

import { ERC20Token } from 'snowman-contracts';

export function formatERC20(num: BigNumber | undefined, token: ERC20Token) {
  if (typeof num === 'undefined') {
    return null;
  }
  return ethers.utils.formatUnits(num, token.decimals);
}
