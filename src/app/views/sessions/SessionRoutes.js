import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));


const sessionRoutes = [
  { path: '/session/signup', element: <JwtRegister /> },
    { path: '/session/signin', element: <JwtLogin /> },
    { path: '/session/404', element: <NotFound /> },
 
];

export default sessionRoutes;
