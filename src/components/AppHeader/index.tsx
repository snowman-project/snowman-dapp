import { useEthers } from '@usedapp/core';
import { MoreOutline } from 'antd-mobile-icons';
import NavBar from 'antd-mobile/es/components/nav-bar';
import Popup from 'antd-mobile/es/components/popup';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MainMenu } from '../MainMenu';

import styles from './index.module.less';

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

export function AppHeader() {
  const { account } = useEthers();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isConnected = !!account;
  const showBackArrow = isConnected && location.pathname !== '/';
  const handleMoreClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <NavBar
        backArrow={showBackArrow}
        className={styles.navBar}
        right={
          isConnected ? (
            <MoreOutline fontSize="1.5rem" onClick={handleMoreClick} />
          ) : null
        }
      >
        <Brand />
      </NavBar>
      {isConnected ? (
        <Popup
          visible={visible}
          position="right"
          onMaskClick={() => {
            setVisible(false);
          }}
        >
          <MainMenu />
        </Popup>
      ) : null}
    </>
  );
}
