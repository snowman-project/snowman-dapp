import { DAppProvider } from '@usedapp/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { matchRoutes, useLocation, useRoutes } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';
import routes, { RouteInfo } from '@/routes';
import useDAppConfig from '@/use-dapp.config';

import styles from './index.module.less';

const queryClient = new QueryClient();

export function App() {
  const content = useRoutes(routes);
  const location = useLocation();
  const matches = matchRoutes(routes, location.pathname);
  let title: string | undefined = undefined;
  if (matches) {
    const match = matches[matches.length - 1];
    const route: RouteInfo = match.route;
    if (route.title) {
      title = route.title;
    }
  }
  return (
    <QueryClientProvider client={queryClient}>
      <DAppProvider config={useDAppConfig}>
        <div className={styles.container}>
          <AppHeader title={title} />
          {content}
        </div>
      </DAppProvider>
    </QueryClientProvider>
  );
}
