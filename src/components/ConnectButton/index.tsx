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
          {account ? 'Connected' : 'Connect'}
        </Button>
        <a className={styles.learnMore}>Learn more</a>
      </>
    </div>
  );
}
