
import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import CommRoutes from './views/dashboard/CommRouters';
import ConnectionRouters from './views/dashboard/ConnectionRouters';
import HardRouters from './views/dashboard/HardRouters';
import InstallRouters from './views/dashboard/InstalRouters';
import SoftwareRouters from './views/dashboard/SoftwareRouters';
import TableViewRouter from './views/dashboard/TableViewRouters'
import TableRouters from './views/dashboard/TableRouter'
import TrainRouters from './views/dashboard/TrainRouters';
import ProjectRouter from './views/dashboard/ProjectRouter';







const routes = [
  {
    element: (
          <AuthGuard>
            
                  <MatxLayout />
              
      </AuthGuard>
        ),
        children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...TableRouters, ...CommRoutes, ...HardRouters, ...ConnectionRouters, ...SoftwareRouters
            , ...InstallRouters, ...TrainRouters, ...TableViewRouter, ...ProjectRouter],
  },
  ...sessionRoutes,
    { path: '/', element: <Navigate to="/CommForm" /> },
    { path: '*', element: <NotFound /> }
];

export default routes;
