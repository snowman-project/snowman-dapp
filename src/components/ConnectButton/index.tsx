import Button from 'antd-mobile/es/components/button';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.less';

export const ConnectButton: React.FC = () => {
  const [isConnecting, setConnecting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleConnectButtonClick = useCallback(async () => {
    setConnecting(true);
    try {
      const accounts = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
      setConnecting(false);
      if (accounts && accounts.length > 0) {
        navigate('/home');
      }
    } catch (e) {
      setConnecting(false);
    }
  }, []);
  const handleConnected = useCallback(() => {
    window.setTimeout(() => {
      if (window.ethereum.selectedAddress) {
        setSelectedAddress(window.ethereum.selectedAddress);
      }
    }, 0);
  }, []);
  useEffect(() => {
    window.ethereum.on('connect', handleConnected);
    return () => {
      window.ethereum.removeListener('connect', handleConnected);
    };
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
          onClick={handleConnectButtonClick}
        >
          {selectedAddress ? 'Connected' : 'Connect'}
        </Button>
        <a className={styles.learnMore}>Learn more</a>
      </>
    </div>
  );
};
