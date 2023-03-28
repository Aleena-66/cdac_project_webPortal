import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AppTable = Loadable(lazy(() => import('./AppTable')));

const TableViewRouters = [
    { path: '/AppTable', element: <AppTable />, auth: authRoles.admin },
];

export default TableViewRouters;