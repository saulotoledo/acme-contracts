import { AxiosResponse } from 'axios';

import axios from '../axios';
import Contract from '../interfaces/Contract';
import ContractsList from '../interfaces/ContractsList';

const getContracts = async (
  page: number,
  limit: number
): Promise<ContractsList> =>
  new Promise(
    (
      // eslint-disable-next-line no-unused-vars
      resolve: (value: ContractsList | PromiseLike<ContractsList>) => void,
      // eslint-disable-next-line no-unused-vars
      reject: (reason: Error) => void
    ): void => {
      axios
        .get('/contracts', {
          params: {
            _page: page + 1,
            _limit: limit,
          },
        })
        .then((result: AxiosResponse<Contract[]>) => {
          resolve({
            total: parseInt(result.headers['x-total-count'], 10),
            data: result.data.map((contract) => {
              contract.negotiationRenewalDate = new Date(
                contract.negotiationRenewalDate
              );
              contract.periodStart = new Date(contract.periodStart);
              contract.periodEnd = new Date(contract.periodEnd);

              return contract;
            }),
          });
        }, reject);
    }
  );

const ContractsService = {
  getContracts,
};

export default ContractsService;
