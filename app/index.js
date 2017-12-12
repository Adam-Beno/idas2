import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { configureStore, history } from './store/configureStore';
import Routes from './routes';
import theme from './theme';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRoot = require('./routes'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <NextRoot />
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
