import { RouteProps } from 'react-router-dom';

import ContractEditPage from '../pages/ContractEditPage';
import ContractListPage from '../pages/ContractListPage';

export interface MyRouteProps extends RouteProps {
  name: string;
  label: string;
}

const routes: MyRouteProps[] = [
  {
    name: 'contracts',
    label: 'Contracts',
    path: '/',
    component: ContractListPage,
    exact: true,
  },
  {
    name: 'contract',
    label: 'Contract details',
    path: '/contract/:id',
    component: ContractEditPage,
    exact: true,
  },
];

export default routes;
