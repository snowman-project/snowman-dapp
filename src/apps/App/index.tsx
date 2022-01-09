import { DAppProvider } from '@usedapp/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';

import { LandingPage } from '@/pages/LandingPage';

import useDAppConfig from '../../use-dapp.config';

import styles from './index.module.less';

export function App() {
  return (
    <DAppProvider config={useDAppConfig}>
      <div className={styles.container}>
        <BrowserRouter basename="/snowman-dapp">
          <AppHeader />
          <Routes>
            <Route index element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DAppProvider>
  );
}
