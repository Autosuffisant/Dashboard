/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ContentLoader from 'react-content-loader';

const ResumeWidgetLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={240}
    viewBox="0 0 400 240"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="6" y="0" rx="2" ry="2" width="300" height="150" />
    <rect x="7" y="180" rx="0" ry="0" width="300" height="57" />
  </ContentLoader>
);

export default ResumeWidgetLoader;
