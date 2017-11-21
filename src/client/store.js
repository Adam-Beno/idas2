import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';
import { autoRehydrate } from 'redux-persist-immutable';

import appReducer from 'client/containers/App/reducer';
import registerReducer from 'client/containers/Register/reducer';
import loginReducer from 'client/containers/Login/reducer';
import notificationReducer from 'client/containers/Notification/reducer';

function getStore(preloadedState, apolloClient, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [
    sagaMiddleware,
    routerMiddleware(history),
    apolloClient.middleware(),
  ];
  const composeEnhancers = Boolean(typeof window !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose; // eslint-disable-line

  const initialState = Map();
  const rootReducer = combineReducers({
    graphql: apolloClient.reducer(),
    routing: routerReducer,
    form,
    app: appReducer,
    register: registerReducer,
    login: loginReducer,
    notification: notificationReducer,
  });
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWares), autoRehydrate()));
}

export default getStore;
