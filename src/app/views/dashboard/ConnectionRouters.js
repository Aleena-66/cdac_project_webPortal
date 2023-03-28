import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const ConnectionForm = Loadable(lazy(() => import('./ConnectionForm')));

const ConnectionRouters = [
    { path: '/ConnectionForm', element: <ConnectionForm />, auth: authRoles.guest },
];

export default ConnectionRouters;