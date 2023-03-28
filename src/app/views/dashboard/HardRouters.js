import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const Hardwareform = Loadable(lazy(() => import('./Hardwareform')));

const HardRouters = [
    { path: '/Hardwareform', element: <Hardwareform />, auth: authRoles.admin },
];

export default HardRouters;