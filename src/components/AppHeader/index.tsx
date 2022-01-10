import { useEthers } from '@usedapp/core';
import { MoreOutline } from 'antd-mobile-icons';
import NavBar from 'antd-mobile/es/components/nav-bar';
import Popup from 'antd-mobile/es/components/popup';
import { useState } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import routes, { RouteInfo } from '@/routes';

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
  const handleBack = () => {
    const matches = matchRoutes(routes, location.pathname);
    if (matches) {
      if (matches.length === 2) {
        const rootPath = matches[0].route.path;
        if (rootPath) {
          navigate(rootPath);
          return;
        }
      }
      const match = matches[matches.length - 1];
      const backPath = (match.route as RouteInfo).backPath;
      if (backPath) {
        navigate(backPath);
        return;
      }
    }
    navigate(-1);
  };
  return (
    <>
      <NavBar
        backArrow={showBackArrow}
        onBack={handleBack}
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
          <AppSideBar onClose={() => setVisible(false)} />
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
    <div className={styles.brandLink}>
      <span>雪人理财</span>
    </div>
  );
}
