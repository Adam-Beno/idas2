import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import map from 'lodash/map';
import { persistStore } from 'redux-persist-immutable';

import routes from './routes';

import App from './containers/App';

class AppComponent extends React.Component {
  static contextTypes = {
    store: propTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = { rehydrated: false };
  }

  componentDidMount() {
    persistStore(this.context.store, {
      whitelist: ['app'],
      blacklist: ['notification'],
    }, () => this.setState({ rehydrated: true }));
  }

  render() {
    if (!this.state.rehydrated) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <App>
          <Switch>
            {map(routes, (route, key) => <Route {...route} key={key} />)}
          </Switch>
        </App>
      </div>
    );
  }
}

export default AppComponent;
