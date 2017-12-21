import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, router, saga);

function configureStore(initialState = Map()) {
  const store = createStore(rootReducer, initialState, enhancer);
  saga.run(rootSaga);
  return store;
}

export default { configureStore, history };
