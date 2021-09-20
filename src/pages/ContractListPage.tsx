import React from 'react';
import ContractsTable from '../components/ContractsTable/';

import Page from '../components/Page';

const ContractListPage: React.FC = () => (
  <Page title="Contracts">
    <ContractsTable />
  </Page>
);

export default ContractListPage;
