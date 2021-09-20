import { RouteProps } from 'react-router-dom';

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
];

export default routes;
