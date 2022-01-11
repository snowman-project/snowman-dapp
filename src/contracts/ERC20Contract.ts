import { Contract } from 'ethers';

import IERC20 from 'snowman-contracts/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';

export class ERC20Contract extends Contract {
  constructor(
    address: string,
    public readonly name: string,
    public readonly symbol: string,
    public readonly decimals = 18
  ) {
    super(address, Contract.getInterface(IERC20.abi));
  }
}
