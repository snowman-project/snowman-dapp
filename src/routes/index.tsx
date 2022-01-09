import type { RouteObject } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { MyProfilePage } from '@/pages/MyProfilePage';

export type RouteWithTitle = RouteObject & { title?: string };

const routes: RouteWithTitle[] = [
  { index: true, element: <LandingPage /> },
  {
    path: '/my/profile',
    title: 'My Profile',
    element: <MyProfilePage />,
  },
];

export default routes;
