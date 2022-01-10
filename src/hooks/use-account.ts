import { useEthers } from '@usedapp/core';
import EventEmitter from 'eventemitter3';
import { useEffect, useState } from 'react';

const accountEvent = new EventEmitter();

export function useAccount() {
  const { account } = useEthers();
  const [nameInState, setNameInState] = useState<string | null>('Anonymous');

  useEffect(() => {
    const handleAccountNickNameChanged = (nickName: string) => {
      setNameInState(nickName);
    };
    accountEvent.on('accountNickNameChanged', (nickName) => {
      setNameInState(nickName);
    });
    return () => {
      accountEvent.off('accountNickNameChanged', handleAccountNickNameChanged);
    };
  }, []);

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
    accountEvent.emit('accountNickNameChanged', name);
  };

  return {
    account,
    accountNickName: nameInState,
    changeAccountNickName,
  };
}
