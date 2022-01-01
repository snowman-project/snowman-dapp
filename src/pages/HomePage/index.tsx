import { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from './index.module.less';

export const HomePage = () => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  useEffect(() => {
    window.ethereum
      .request<string[]>({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts && accounts.length > 0) {
          const myAccount = accounts[0];
          if (myAccount) {
            setAccount(myAccount);

            const web3 = new Web3(window.ethereum as any);
            web3.eth.getBalance(myAccount).then((b) => {
              setBalance(b);
            });
          }
        }
      });
  }, []);
  return (
    <div className={styles.container}>
      <div>
        您已以“
        {account
          ? `${account.substr(0, 4)}...${account.substr(account.length - 4)}`
          : '匿名'}
        ”的身份连接到雪球。
      </div>
      <div>{balance ? `当前余额 ${balance}` : ''}</div>
    </div>
  );
};
