import React from 'react';
import { hot } from 'react-hot-loader';
import CacheBuster from 'react-cache-buster';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { version } from '../../../package.json';
import Router from './Router';
import Theme from './Theme';
import store from '../../redux/store';
import config from '../../config';

const configuration = {
  auth: {
    clientId: config.AZURE_CLIENT_ID,
  },
};

const pca = new PublicClientApplication(configuration);

const App = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction}
      isVerboseMode={false}
    >
      <MsalProvider instance={pca}>
        <Provider store={store}>
          <Theme>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Theme>
        </Provider>
      </MsalProvider>
    </CacheBuster>
  );
};

export default hot(module)(App);
