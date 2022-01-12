import { ContractName, Contracts, getContract } from 'snowman-contracts';

import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { LogDescription } from 'ethers/lib/utils';

import { useSigner } from './use-signer';

export function useSignedContractFunction<
  CName extends ContractName,
  FName extends keyof Contracts[CName]['functions'] extends string
    ? keyof Contracts[CName]['functions']
    : never
>(
  contractName: CName,
  funcName: FName
): {
  send: (
    ...args: Contracts[CName]['functions'][FName] extends (...args: any) => any
      ? Parameters<Contracts[CName]['functions'][FName]>
      : never
  ) => Promise<void>;
  state: TransactionStatus;
  events: LogDescription[] | undefined;
} {
  const signer = useSigner();
  const contract = getContract(contractName);
  const results = useContractFunction(contract, funcName, {
    signer,
  });
  return results;
}
