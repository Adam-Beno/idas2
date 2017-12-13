import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';

// CUSTOM REDUCERS
import appReducer from '../components/App/reducer';
import notificationReducer from '../components/Notification/reducer';
import bookCardReducer from '../components/Home/Book/reducer';
import authorAddReducer from '../components/Author/Add/reducer';
import authorReducer from '../components/Author/reducer';
import authorEditReducer from '../components/Author/Edit/reducer';

const rootReducer = combineReducers({
  router,
  app: appReducer,
  notification: notificationReducer,
  bookCard: bookCardReducer,
  authorAdd: authorAddReducer,
  author: authorReducer,
  authorEdit: authorEditReducer,
});

export default rootReducer;
