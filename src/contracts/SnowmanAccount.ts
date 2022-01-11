import { Contract } from 'ethers';

import SnowmanAccountArtifact from 'snowman-contracts/artifacts/contracts/SnowmanAccount.sol/SnowmanAccount.json';

export const SnowmanAccount = new Contract(
  SnowmanAccountArtifact.address,
  Contract.getInterface(SnowmanAccountArtifact.abi)
);
