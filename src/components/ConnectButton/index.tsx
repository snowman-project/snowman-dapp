import { useEthers } from '@usedapp/core';
import Button from 'antd-mobile/es/components/button';

import styles from './index.module.less';

export function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <div className={styles.container}>
      <>
        <Button
          className={styles.button}
          color="primary"
          size="large"
          shape="rounded"
          onClick={() => activateBrowserWallet()}
        >
          {account ? '已连接到我的钱包' : '连接到我的钱包'}
        </Button>
        <a className={styles.learnMore}>进一步了解</a>
      </>
    </div>
  );
}
