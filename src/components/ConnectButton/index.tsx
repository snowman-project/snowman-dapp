import { useEthers } from '@usedapp/core';
import { Button } from 'antd-mobile';
import { popupAppSideBar } from '../AppHeader';

import styles from './index.module.less';

export function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();

  const handleClick = () => {
    if (account) {
      popupAppSideBar();
    } else {
      activateBrowserWallet();
    }
  };

  return (
    <div className={styles.container}>
      <>
        <Button
          className={styles.button}
          color="primary"
          size="large"
          shape="rounded"
          onClick={handleClick}
        >
          {account ? '已连接到我的钱包' : '连接到我的钱包'}
        </Button>
        <a className={styles.learnMore}>进一步了解</a>
      </>
    </div>
  );
}
