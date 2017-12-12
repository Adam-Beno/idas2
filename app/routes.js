/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

// Components
import Home from './components/Home';
import App from './components/App';


export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
