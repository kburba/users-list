import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Link, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    backgroundColor: 'white',
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 2),
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'none',
      borderBottom: '2px solid black',
    },
  },
  linkActive: {
    textDecoration: 'none',
    borderBottom: '2px solid black',
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <nav>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/services"
            activeClassName={classes.linkActive}
            className={classes.link}
            exact
          >
            Services
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/clients"
            className={classes.link}
            activeClassName={classes.linkActive}
            exact
          >
            Clients
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/about"
            className={classes.link}
            activeClassName={classes.linkActive}
            exact
          >
            About Us
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/members"
            className={classes.link}
            activeClassName={classes.linkActive}
            exact
          >
            Members
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/contact"
            className={classes.link}
            activeClassName={classes.linkActive}
            exact
          >
            Contact
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
