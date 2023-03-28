import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const InstallationForm = Loadable(lazy(() => import('./InstallationForm')));

const InstallRouters = [
    { path: '/InstallationForm', element: <InstallationForm />, auth: authRoles.admin },
];

export default InstallRouters;