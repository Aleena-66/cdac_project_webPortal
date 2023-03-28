import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const SoftwareForm = Loadable(lazy(() => import('./SoftwareForm')));

const SoftwareRouters = [
    { path: '/SoftwareForm', element: <SoftwareForm />, auth: authRoles.admin },
];

export default SoftwareRouters;