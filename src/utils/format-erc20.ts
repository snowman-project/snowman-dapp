import { BigNumber, ethers } from 'ethers';

export function formatERC20(num: BigNumber | undefined, decimals = 18) {
  if (typeof num === 'undefined') {
    return null;
  }
  return ethers.utils.formatUnits(num, decimals);
}
