import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { ContractName, Contracts } from 'snowman-contracts';

import { useContractCall, useContractCalls } from '@usedapp/core';

export function useContractView<
  CName extends ContractName,
  FName extends keyof Contracts[CName]['functions'] extends string
    ? keyof Contracts[CName]['functions']
    : never
>(
  call:
    | {
        contract: CName;
        function: FName;
        args: Contracts[CName]['functions'][FName] extends (...args: any) => any
          ? Parameters<Contracts[CName]['functions'][FName]>
          : never;
      }
    | Falsy
): Contracts[CName]['functions'][FName] extends (...args: any) => any
  ? Awaited<ReturnType<Contracts[CName]['functions'][FName]>>[0] | undefined
  : never {
  const contract = call ? Contracts[call.contract] : undefined;
  const results = useContractCall(
    contract && call
      ? {
          address: contract.address,
          abi: contract.abi,
          method: call.function,
          args: call.args,
        }
      : undefined
  );
  return results ? results[0] : undefined;
}

export function useContractViews(
  calls: (
    | {
        contract: ContractName;
        function: string;
        args: any[];
      }
    | Falsy
  )[]
) {
  const results = useContractCalls(
    calls.map(
      (call) =>
        call && {
          address: Contracts[call.contract].address,
          abi: Contracts[call.contract].abi,
          method: call.function,
          args: call.args,
        }
    )
  );
  return results.map((result) => (result ? result[0] : undefined));
}
