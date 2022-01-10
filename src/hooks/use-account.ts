import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';

export function useAccount() {
  const { account } = useEthers();
  const [nameInState, setNameInState] = useState<string | null>('Anonymous');

  useEffect(() => {
    if (account) {
      let name = null;
      const nameStored = localStorage.getItem(storageKey);
      if (nameStored) {
        name = nameStored;
      }
      setNameInState(name);
    }
  }, [account]);

  const storageKey = `snowman.account.${account}.name`;

  const changeAccountNickName = (name: string | null) => {
    if (!account) return;
    if (name === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, name);
    }
    setNameInState(name);
  };

  return {
    account,
    accountNickName: nameInState,
    changeAccountNickName,
  };
}
