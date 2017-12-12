import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';

// CUSTOM REDUCERS
import appReducer from '../components/App/reducer';

const rootReducer = combineReducers({
  router,
  app: appReducer
});

export default rootReducer;
