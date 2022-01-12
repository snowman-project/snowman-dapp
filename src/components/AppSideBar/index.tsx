import { shortenAddress } from '@usedapp/core';
import { List } from 'antd-mobile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAccount } from '@/hooks';

import { AppMenu } from '../AppMenu';

import styles from './index.module.less';

export interface AppSideBarProps {
  onClose?: () => void;
}

export function AppSideBar({ onClose }: AppSideBarProps) {
  const { account, accountNickName: accountNickName } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (account) {
      (window as any).jdenticon();
    }
  }, [account]);
  if (account) {
    const shortenAccount = shortenAddress(account);
    const handleJumpToProfile = () => {
      navigate('/my/profile');
      onClose && onClose();
    };
    return (
      <div className={styles.container}>
        <List>
          <List.Item>
            <div className={styles.brand}>
              <img
                src={require('@/assets/images/snowman-logo.svg')}
                className={styles.brandLogo}
              />
              <div className={styles.brandName}>雪人理财</div>
            </div>
          </List.Item>
          <List.Item onClick={handleJumpToProfile}>
            <div className={styles.avatarAndAccountInfo}>
              <div className={styles.avatar}>
                <svg
                  className={styles.avatarSVG}
                  data-jdenticon-hash={account?.substr(2)}
                ></svg>
              </div>
              <div className={styles.accountInfo}>
                <h3 className={styles.accountNickName}>
                  {accountNickName ?? shortenAccount}
                </h3>
                <div className={styles.accountAddress}>{shortenAccount}</div>
              </div>
            </div>
          </List.Item>
        </List>
        <AppMenu onClose={onClose} />
      </div>
    );
  }
  return null;
}
