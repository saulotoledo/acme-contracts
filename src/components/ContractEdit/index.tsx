import React, { ReactElement, useEffect, useState } from 'react';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AxiosError } from 'axios';

import Message from '../../interfaces/Message';
import Contract from '../../interfaces/Contract';
import { getContract, updateContract } from '../../services/ContractsService';
import ContractForm from './ContractForm';

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    margin: theme.spacing(5, 'auto'),
  },
  message: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

interface ContractEditProps {
  contractId: string;
}

const ContractEdit: React.FC<ContractEditProps> = ({
  contractId,
}: ContractEditProps) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>();
  const [errors, setErrors] = useState<Record<string, unknown>>();
  const [contractData, setContractData] = useState<Contract>();

  useEffect(() => {
    setIsLoading(true);
    setMessage(undefined);
    getContract(contractId).then(
      (result: Contract) => {
        setContractData(result);
        setIsLoading(false);
      },
      (error: Error) => {
        setIsLoading(false);
        setMessage({
          type: 'error',
          body: error.message,
        });
      }
    );
  }, [contractId]);

  const onSubmit = async (data: Contract): Promise<void> => {
    setMessage(undefined);
    return updateContract(data).then(
      (result): void => {
        setMessage({
          type: 'success',
          body: 'Contract updated successfully!',
        });
        setContractData(result);
      },
      (error: AxiosError & { errors?: Record<string, unknown> }) => {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setMessage({
            type: 'error',
            body: error.message,
          });
        }
      }
    );
  };

  const getMessageAlert = (): ReactElement => (
    <Alert className={classes.message} severity={message?.type}>
      {message?.body}
    </Alert>
  );

  const getLoader = (): ReactElement => (
    <Grid container item direction="row" justifyContent="space-between">
      <CircularProgress className={classes.loader} />
    </Grid>
  );

  return (
    <Paper className={classes.paper}>
      {message && getMessageAlert()}
      {isLoading && getLoader()}
      {contractData && (
        <ContractForm
          contractData={contractData}
          initialErrors={errors}
          onSubmit={onSubmit}
          onTouch={() => setMessage(undefined)}
        />
      )}
    </Paper>
  );
};

export default ContractEdit;
