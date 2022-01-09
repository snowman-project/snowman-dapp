import { DAppProvider } from '@usedapp/core';
import { useLocation, matchRoutes, useRoutes } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';
import routes, { RouteWithTitle } from '@/routes';
import useDAppConfig from '@/use-dapp.config';

import styles from './index.module.less';

export function App() {
  const content = useRoutes(routes);
  const location = useLocation();
  const matches = matchRoutes(routes, location.pathname);
  let title: string | undefined = undefined;
  if (matches && matches.length === 1) {
    const match = matches[0];
    const route: RouteWithTitle = match.route;
    if (route.title) {
      title = route.title;
    }
  }
  return (
    <DAppProvider config={useDAppConfig}>
      <div className={styles.container}>
        <AppHeader title={title} />
        {content}
      </div>
    </DAppProvider>
  );
}
