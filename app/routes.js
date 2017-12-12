/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

// Components
import Home from './components/Home';
import App from './components/App';
import Author from './components/Author';
import AuthorAdd from './components/Author/Add';


export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/authors" component={Author} exact />
      <Route path="/authors/add-form" component={AuthorAdd} exact />
    </Switch>
  </App>
);
