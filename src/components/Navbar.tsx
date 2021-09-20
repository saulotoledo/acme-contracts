import * as React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toolbar: {
    '& a': {
      fontWeight: 700,
    },
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem',
    textAlign: 'left',
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Acme S/A</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
