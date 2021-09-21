import { AxiosError, AxiosResponse } from 'axios';

import axios from '../axios';
import Contract from '../interfaces/Contract';
import ContractsList from '../interfaces/ContractsList';

export const getContract = async (id: string): Promise<Contract> =>
  new Promise(
    (
      // eslint-disable-next-line no-unused-vars
      resolve: (value: Contract | PromiseLike<Contract>) => void,
      // eslint-disable-next-line no-unused-vars
      reject: (reason: Error) => void
    ): void => {
      axios.get(`/contract/${id}`).then(
        (result: AxiosResponse<Contract>) => {
          const contract = result.data;
          contract.negotiationRenewalDate = new Date(
            contract.negotiationRenewalDate
          );
          contract.periodStart = new Date(contract.periodStart);
          contract.periodEnd = new Date(contract.periodEnd);

          resolve(contract);
        },
        (error: AxiosError<{ code: number }>) => {
          let errorMessage = error.message;
          if (error.response && error.response.status === 404) {
            errorMessage = 'The informed contract was not found';
          }
          reject(new Error(errorMessage));
        }
      );
    }
  );

export const getContracts = async (
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

export const updateContract = async (data: Contract): Promise<Contract> =>
  new Promise(
    (
      // eslint-disable-next-line no-unused-vars
      resolve: (value: Contract | PromiseLike<Contract>) => void,
      // eslint-disable-next-line no-unused-vars
      reject: (reason: Error) => void
    ): void => {
      // Ensuring ISO date format on update:
      data.negotiationRenewalDate = new Date(data.negotiationRenewalDate);
      data.periodStart = new Date(data.periodStart);
      data.periodEnd = new Date(data.periodEnd);

      axios
        .put(`/contract/${data.contractId}`, data)
        .then((result: AxiosResponse<Contract>) => {
          resolve(result.data);
        }, reject);
    }
  );
