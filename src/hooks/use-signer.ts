import { useEthers } from '@usedapp/core';
import { Signer } from 'ethers';
import { useMemo } from 'react';

export function useSigner() {
  const { account, library } = useEthers();
  const signer = useMemo<Signer | undefined>(() => {
    if (account && library) {
      return library?.getSigner(account);
    }
  }, [account, library]);
  return signer;
}
