import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const ProjectAssign = Loadable(lazy(() => import('./ProjectAssign')));
const ProjectAdd = Loadable(lazy(() => import('./ProjectAdd')));

const ProjectRouter = [
    { path: '/ProjectAssign', element: <ProjectAssign />, auth: authRoles.admin },
    { path: '/ProjectAdd', element: <ProjectAdd />, auth: authRoles.admin },
];

export default ProjectRouter;