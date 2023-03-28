import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const TrainingForm = Loadable(lazy(() => import('./TrainingForm')));

const TrainRouters = [
    { path: '/TrainingForm', element: <TrainingForm />, auth: authRoles.admin },
];

export default TrainRouters;