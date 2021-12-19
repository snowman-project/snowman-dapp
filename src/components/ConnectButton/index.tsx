import Button from 'antd-mobile/es/components/button';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.less';

export const ConnectButton: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setConnecting] = useState(false);
  const handleConnect = useCallback(async () => {
    setConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnecting(false);
      if (accounts.length > 0) {
        navigate('/home');
      }
    } catch (e) {
      setConnecting(false);
    }
  }, []);
  return (
    <div className={styles.container}>
      <>
        <Button
          color="primary"
          size="large"
          shape="rounded"
          loading={isConnecting}
          disabled={isConnecting}
          onClick={handleConnect}
        >
          立即连接
        </Button>
        <a className={styles.learnMore}>了解更多</a>
      </>
    </div>
  );
};
