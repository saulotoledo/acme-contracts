import React, { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import Contract from '../../interfaces/Contract';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import ContractsService from '../../services/contracts.service';
import ContractsList from '../../interfaces/ContractsList';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 700,
  },
  loader: {
    margin: theme.spacing(5, 'auto'),
  },
}));

const ContractsTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    parseInt(process.env.REACT_APP_DEFAULT_PAGINATION_LIMIT as string, 10)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Contract[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    ContractsService.getContracts(page, rowsPerPage).then(
      (result: ContractsList) => {
        setItems(result.data);
        setTotal(result.total);
        setIsLoading(false);
      },
      (error: Error) => {
        setIsLoading(false);
        setMessage(error.message);
      }
    );
  }, [page, rowsPerPage]);

  const classes = useStyles();

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="ContractsTable" component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: 60 }}>
              <Typography variant="body1">ID</Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>
              <Typography variant="body1">Company</Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: 120 }}>
              <Typography variant="body1">Period Start</Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: 120 }}>
              <Typography variant="body1">Period End</Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: 60 }}>
              <Typography variant="body1">Scheduled for renewal?</Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: 120 }}>
              <Typography variant="body1">Renewal Date?</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={6}>
                <CircularProgress className={classes.loader} />
              </StyledTableCell>
            </StyledTableRow>
          )}
          {!isLoading && (message || items.length === 0) && (
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={6}>
                <Typography variant="body1" color="error" component="p">
                  {message || 'No contracts in the database'}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          )}
          {!isLoading &&
            items.map(
              ({
                contractId,
                company,
                periodStart,
                periodEnd,
                scheduledForRenewal,
                negotiationRenewalDate,
              }) => (
                <StyledTableRow key={contractId}>
                  <StyledTableCell>
                    <Typography variant="body1">
                      <Link to={`/contract/${contractId}`}>{contractId}</Link>
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body1">{company}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body1">
                      {periodStart.toLocaleString()}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body1">
                      {periodEnd.toLocaleString()}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {scheduledForRenewal ? (
                      <CheckIcon style={{ color: green[500] }} />
                    ) : (
                      <ClearIcon color="error" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body1">
                      {negotiationRenewalDate.toLocaleString()}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={6}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ContractsTable;
