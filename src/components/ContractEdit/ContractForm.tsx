import * as Yup from 'yup';
import React from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
  Theme,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { DateTime } from 'luxon';

import Contract from '../../interfaces/Contract';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  switch: {
    marginLeft: theme.spacing(2),
  },
  progress: {
    marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ContractFormProps {
  contractData: Contract;
  initialErrors?: Record<string, unknown>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Contract) => Promise<void>;
  onTouch: () => void;
}

const ContractForm: React.FC<ContractFormProps> = ({
  contractData,
  initialErrors,
  onSubmit,
  onTouch,
}: ContractFormProps) => {
  const classes = useStyles();

  const onFormSubmit = (
    data: Contract,
    { setSubmitting }: FormikHelpers<Contract>
  ): void => {
    setSubmitting(true);
    onSubmit(data).then(
      () => setSubmitting(false),
      () => setSubmitting(false)
    );
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required('Please inform a value'),
    periodStart: Yup.date().required('Please inform a value'),
    periodEnd: Yup.date().required('Please inform a value'),
    scheduledForRenewal: Yup.boolean(),
    negotiationRenewalDate: Yup.date().required('Please inform a value'),
  });

  const formatDate = (date: string | Date): string => {
    const dateString = date instanceof Date ? date.toISOString() : date;
    return DateTime.fromISO(dateString)
      .toFormat('yyyy-MM-dd T')
      .replace(' ', 'T');
  };

  return (
    <Formik
      initialValues={contractData}
      initialErrors={initialErrors}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contractId"
                  name="contractId"
                  autoComplete="contractId"
                  disabled
                  fullWidth
                  label="Contract ID"
                  variant="outlined"
                  value={values.contractId}
                  onFocus={() => onTouch()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="company"
                  name="company"
                  autoComplete="company"
                  fullWidth
                  label="Company"
                  required
                  disabled={isSubmitting}
                  variant="outlined"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => onTouch()}
                  error={!!errors.company && touched.company}
                  helperText={
                    errors.company && touched.company && errors.company
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="periodStart"
                  name="periodStart"
                  autoComplete="periodStart"
                  fullWidth
                  label="Period Start"
                  required
                  disabled={isSubmitting}
                  type="datetime-local"
                  variant="outlined"
                  value={formatDate(values.periodStart)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => onTouch()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.periodStart}
                  helperText={
                    errors.periodStart &&
                    touched.periodStart &&
                    errors.periodStart
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="periodEnd"
                  name="periodEnd"
                  autoComplete="periodEnd"
                  fullWidth
                  label="Period End"
                  required
                  disabled={isSubmitting}
                  type="datetime-local"
                  variant="outlined"
                  value={formatDate(values.periodEnd)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => onTouch()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.periodEnd}
                  helperText={
                    errors.periodEnd && touched.periodEnd && errors.periodEnd
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <FormControlLabel
                        control={
                          <Switch
                            id="scheduledForRenewal"
                            name="scheduledForRenewal"
                            className={classes.switch}
                            checked={values.scheduledForRenewal}
                            onChange={handleChange}
                          />
                        }
                        disabled={isSubmitting}
                        onFocus={() => onTouch()}
                        labelPlacement="end"
                        label={values.scheduledForRenewal ? 'Yes' : 'No'}
                      />
                    }
                    labelPlacement="start"
                    label="Scheduled for renewal?"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="negotiationRenewalDate"
                  name="negotiationRenewalDate"
                  autoComplete="negotiationRenewalDate"
                  fullWidth
                  label="Date for Renewal Negotiation"
                  required
                  disabled={isSubmitting}
                  type="datetime-local"
                  variant="outlined"
                  value={formatDate(values.negotiationRenewalDate)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => onTouch()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.negotiationRenewalDate}
                  helperText={
                    errors.negotiationRenewalDate &&
                    touched.negotiationRenewalDate &&
                    errors.negotiationRenewalDate
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.submit}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <CircularProgress
                  className={classes.progress}
                  size={20}
                  color="secondary"
                />
              )}
              {isSubmitting ? 'Updating contract' : 'Update contract'}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

ContractForm.defaultProps = {
  initialErrors: undefined,
};

export default ContractForm;
