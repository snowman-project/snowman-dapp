import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';

import { LandingPage } from '@/pages/LandingPage';
import { HomePage } from '@/pages/HomePage';

import styles from './index.module.less';

export const App = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter basename="/snowman-dapp">
        <AppHeader />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
