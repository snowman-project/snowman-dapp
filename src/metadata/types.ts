import { Interface } from '@ethersproject/abi';

export interface ContractMetadata {
  address: string;
  abi: Interface;
}

export interface ERC20Metadata extends ContractMetadata {
  symbol: string;
  decimals: number;
}
