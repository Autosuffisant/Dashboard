/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ContentLoader from 'react-content-loader';

const ThemesLoader = (props) => (
  <ContentLoader
    viewBox="0 0 1360 900"
    height={900}
    width={1360}
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="325" height="250" />
    <rect x="345" y="0" rx="8" ry="8" width="325" height="250" />
    <rect x="690" y="0" rx="8" ry="8" width="325" height="250" />
    <rect x="1035" y="0" rx="8" ry="8" width="325" height="250" />
    <rect x="0" y="270" rx="8" ry="8" width="325" height="250" />
    <rect x="345" y="270" rx="8" ry="8" width="325" height="250" />
    <rect x="690" y="270" rx="8" ry="8" width="325" height="250" />
    <rect x="1035" y="270" rx="8" ry="8" width="325" height="250" />
    <rect x="0" y="540" rx="8" ry="8" width="325" height="250" />
    <rect x="345" y="540" rx="8" ry="8" width="325" height="250" />
  </ContentLoader>
);

export default ThemesLoader;
