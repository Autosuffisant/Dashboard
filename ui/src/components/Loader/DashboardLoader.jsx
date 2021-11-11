/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from '@material-ui/core';
import ContentLoader from 'react-content-loader';

const DashboardLoader = (props) => (
  <Container style={{ marginTop: '2em' }}>
    <ContentLoader
      viewBox="0 0 1360 900"
      height={900}
      width={1360}
      {...props}
    >
      <rect x="0" y="0" ry="8" width="1200" height="600" />
    </ContentLoader>
  </Container>
);

export default DashboardLoader;
