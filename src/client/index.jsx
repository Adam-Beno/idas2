import 'normalize-css/normalize.css';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist-immutable';
import config from 'shared/config';
import apolloClient from './apollo';
import IntlProvider from './intl';

import App from './app';
import getStore from './store';
import theme from './theme';

const Intl = new IntlProvider();
const IntlProv = Intl.getProvider();
const IntlLocale = Intl.getLocale();

const rootEl = document.getElementById(config.APP_CONTAINER_ID); // eslint-disable-line

const history = createHistory();

const store = getStore(undefined, apolloClient, history);

const wrapApp = (AppComponent, reduxStore) => {
  return (
    <ApolloProvider client={apolloClient} store={reduxStore}>
      <Provider store={reduxStore}>
        <IntlProv locale={IntlLocale}>
          <ConnectedRouter history={history}>
            <AppContainer>
              <MuiThemeProvider theme={theme}>
                <AppComponent />
              </MuiThemeProvider>
            </AppContainer>
          </ConnectedRouter>
        </IntlProv>
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}

