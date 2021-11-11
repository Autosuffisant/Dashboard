import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => (
  <>
    <Typography variant="body1" color="textSecondary" align="center">
      <code>
        v
        {process.env.REACT_APP_VERSION}
      </code>
      <br />
      Copyright ©
      <Link color="textPrimary" href="https://huguenin.dev/">
        Autosuffisant
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  </>
);

export default Copyright;
