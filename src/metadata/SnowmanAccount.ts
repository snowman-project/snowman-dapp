import { Interface } from '@ethersproject/abi';
import SnowmanAccountArtifact from 'snowman-contracts/artifacts/contracts/SnowmanAccount.sol/SnowmanAccount.json';

import { ContractMetadata } from './types';

export const SnowmanAccountMetadata: ContractMetadata = {
  address: SnowmanAccountArtifact.address,
  abi: new Interface(SnowmanAccountArtifact.abi),
};
