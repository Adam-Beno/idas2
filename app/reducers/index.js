import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';

// CUSTOM REDUCERS
import appReducer from '../components/App/reducer';
import notificationReducer from '../components/Notification/reducer';
import bookCardReducer from '../components/Home/Book/reducer';

const rootReducer = combineReducers({
  router,
  app: appReducer,
  notification: notificationReducer,
  bookCard: bookCardReducer,
});

export default rootReducer;
