import type { RouteObject } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { MyProfilePage } from '@/pages/MyProfilePage';

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
        path: '/my/profile',
        title: '个人信息',
        element: <MyProfilePage />,
      },
    ],
  },
];

export default routes;
