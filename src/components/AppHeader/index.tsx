import { useEthers } from '@usedapp/core';
import { MoreOutline } from 'antd-mobile-icons';
import NavBar from 'antd-mobile/es/components/nav-bar';
import Popup from 'antd-mobile/es/components/popup';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AppSideBar } from '../AppSideBar';

import styles from './index.module.less';

export interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { account } = useEthers();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isConnected = !!account;
  const showBackArrow = isConnected && location.pathname !== '/';
  return (
    <>
      <NavBar
        backArrow={showBackArrow}
        onBack={() => navigate(-1)}
        className={styles.navBar}
        right={
          isConnected && (
            <MoreOutline
              fontSize="1.5rem"
              onClick={() => setVisible(!visible)}
            />
          )
        }
      >
        {title ?? <Brand />}
      </NavBar>
      {isConnected && (
        <Popup
          visible={visible}
          position="right"
          onMaskClick={() => {
            setVisible(false);
          }}
        >
          <AppSideBar />
        </Popup>
      )}
    </>
  );
}

function Brand() {
  // return hideLogo ? (
  //   <Link className={styles.brandLink} to="/">
  //     <div className={styles.brandName}>Snowman</div>
  //   </Link>
  // ) : (
  //   <Link className={styles.brandLinkWithLogo} to="/">
  //     <div className={styles.brandLogo} />
  //     <div className={styles.brandName}>Snowman</div>
  //   </Link>
  // );
  return (
    <Link className={styles.brandLink} to="/">
      <span>Snowman</span>
    </Link>
  );
}
