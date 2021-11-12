/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import About from '../About/index';
import Layout from '../Layout/index';
import Login from '../Login/index';
import Dashboard from '../Dashboard/index';

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/dashboard',
  allowRedirectBack: false,
  authenticatedSelector: (state) => state.auth.loggedIn !== true,
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => state.auth.loggedIn === true,
  wrapperDisplayName: 'UserIsAuthenticated',
});

const WrappedRoutes = () => (
  <div>
    <Layout>
      <Switch>
        <Route exact path="/about.json" component={About} />
        <Route path="/dashboard/" component={Dashboard} />
      </Switch>
    </Layout>
  </div>
);

const Router = () => (
  <Switch>
    <Route exact path="/" component={userIsNotAuthenticated(Login)} />
    <Route path="/" component={userIsAuthenticated(WrappedRoutes)} />
  </Switch>
);

export default Router;
