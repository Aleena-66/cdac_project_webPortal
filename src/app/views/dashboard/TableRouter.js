import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Table = Loadable(lazy(() => import('./Table')));

const TableRouter = [
    { path: '/Table', element: <Table />, auth: authRoles.admin },
];

export default TableRouter;