import type { RouteObject } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { MyBalanceDepositPage } from '@/pages/MyBalanceDepositPage';
import { MyBalanceDetailPage } from '@/pages/MyBalanceDetailPage';
import { MyBalanceSummaryPage } from '@/pages/MyBalanceSummaryPage';
import { MyProfilePage } from '@/pages/MyProfilePage';
import { ProductListPage } from '@/pages/ProductListPage';

export interface RouteInfo extends RouteObject {
  title?: string;
  backPath?: string;
  children?: RouteInfo[];
}

const routes: RouteInfo[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'my',
        children: [
          {
            path: 'profile',
            title: '个人信息',
            element: <MyProfilePage />,
          },
          {
            path: 'balance',
            children: [
              {
                index: true,
                title: '余额',
                element: <MyBalanceSummaryPage />,
              },
              {
                path: ':symbol',
                children: [
                  {
                    index: true,
                    title: '余额明细',
                    element: <MyBalanceDetailPage />,
                  },
                  {
                    path: 'deposit',
                    title: '充值',
                    element: <MyBalanceDepositPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            title: '理财产品',
            element: <ProductListPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
