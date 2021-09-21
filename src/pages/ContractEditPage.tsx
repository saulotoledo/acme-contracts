import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ContractEdit from '../components/ContractEdit/';

import Page from '../components/Page';
import ContractEditRouteParams from '../interfaces/ContractEditRouteParams';

const actions = [
  {
    label: 'Return to all contracts',
    link: '/',
  },
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContractEditPageProps
  extends RouteComponentProps<ContractEditRouteParams> {}

const ContractEditPage: React.FC<ContractEditPageProps> = (
  props: ContractEditPageProps
) => {
  // eslint-disable-next-line react/destructuring-assignment
  const contractId = props.match.params.id;

  return (
    <Page title="Contract details" actions={actions}>
      <ContractEdit contractId={contractId} />
    </Page>
  );
};

export default ContractEditPage;
