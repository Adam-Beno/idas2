/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

// Components
import Home from './components/Home';
import App from './components/App';
import Author from './components/Author';
import AuthorAdd from './components/Author/Add';
import AuthorEdit from './components/Author/Edit';
import Printer from './components/Printer';
import PrinterAdd from './components/Printer/Add';
import PrinterEdit from './components/Printer/Edit';
import Category from './components/Category';
import CategoryAdd from './components/Category/Add';
import CategoryEdit from './components/Category/Edit';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/authors" component={Author} exact />
      <Route path="/authors/add-form" component={AuthorAdd} />
      <Route path="/authors/edit/:id" component={AuthorEdit} />
      <Route path="/printers" component={Printer} exact />
      <Route path="/printers/add-form" component={PrinterAdd} />
      <Route path="/printers/edit/:id" component={PrinterEdit} />
      <Route path="/categories" component={Category} exact />
      <Route path="/categories/add-form" component={CategoryAdd} />
      <Route path="/categories/edit/:id" component={CategoryEdit} />
    </Switch>
  </App>
);
