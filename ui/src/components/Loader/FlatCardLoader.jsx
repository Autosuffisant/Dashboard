/* eslint-disable react/jsx-props-no-spreading */
import { Container } from '@material-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';

const FlatCardLoader = (props) => (
  <Container>
    <ContentLoader
      viewBox="0 0 1360 900"
      height={900}
      width={1360}
      {...props}
    >
      <rect x="0" y="0" ry="8" width="670" height="50" />
      <rect x="690" y="0" ry="8" width="670" height="50" />
      <rect x="0" y="70" ry="8" width="670" height="50" />
      <rect x="690" y="70" ry="8" width="670" height="50" />
      <rect x="0" y="0" ry="8" width="670" height="50" />
      <rect x="690" y="0" ry="8" width="670" height="50" />
      <rect x="0" y="140" ry="8" width="670" height="50" />
      <rect x="690" y="140" ry="8" width="670" height="50" />
      <rect x="0" y="210" ry="8" width="670" height="50" />
      <rect x="690" y="210" ry="8" width="670" height="50" />
    </ContentLoader>
  </Container>
);

export default FlatCardLoader;
