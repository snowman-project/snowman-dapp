import { useEthers } from '@usedapp/core';
import { NavBar, Popup } from 'antd-mobile';
import { MoreOutline } from 'antd-mobile-icons';
import { EventEmitter } from 'eventemitter3';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import routes, { RouteInfo } from '@/routes';

import { AppSideBar } from '../AppSideBar';

import styles from './index.module.less';

const appSideBarEvent = new EventEmitter<{
  popup: () => void;
}>();

export interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { account } = useEthers();
  const [popupVisible, setPopupVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handlePopup = () => {
      setPopupVisible(true);
    };
    appSideBarEvent.on('popup', handlePopup);
    return () => {
      appSideBarEvent.off('popup', handlePopup);
    };
  }, []);

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
        className={styles.navBar}
        right={
          isConnected && (
            <MoreOutline
              fontSize="1.5rem"
              onClick={() => setPopupVisible(!popupVisible)}
            />
          )
        }
        onBack={handleBack}
      >
        <Brand title={title} />
      </NavBar>
      {isConnected && (
        <Popup
          visible={popupVisible}
          position="right"
          onMaskClick={() => {
            setPopupVisible(false);
          }}
        >
          <AppSideBar onClose={() => setPopupVisible(false)} />
        </Popup>
      )}
    </>
  );
}

function Brand({ title }: AppHeaderProps) {
  return (
    <div className={styles.brandLink}>
      <img
        src={require('@/assets/images/snowman-logo.svg')}
        className={styles.brandLogo}
      />
      <span>{title ?? '雪人理财'}</span>
    </div>
  );
}

export function popupAppSideBar() {
  appSideBarEvent.emit('popup');
}
