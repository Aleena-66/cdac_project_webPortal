import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const CommForm = Loadable(lazy(() => import('./CommForm')));

const CommRouters = [
    { path: '/CommForm', element: <CommForm />, auth: authRoles.guest },
];

export default CommRouters;
