import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';

// CUSTOM REDUCERS
import appReducer from '../components/App/reducer';
import notificationReducer from '../components/Notification/reducer';
import bookCardReducer from '../components/Home/Book/reducer';
import authorAddReducer from '../components/Author/Add/reducer';
import authorReducer from '../components/Author/reducer';
import authorEditReducer from '../components/Author/Edit/reducer';
import printerAddReducer from '../components/Printer/Add/reducer';
import printerReducer from '../components/Printer/reducer';
import printerEditReducer from '../components/Printer/Edit/reducer';
import categoryAddReducer from '../components/Category/Add/reducer';
import categoryReducer from '../components/Category/reducer';
import categoryEditReducer from '../components/Category/Edit/reducer';

const rootReducer = combineReducers({
  router,
  app: appReducer,
  notification: notificationReducer,
  bookCard: bookCardReducer,
  authorAdd: authorAddReducer,
  author: authorReducer,
  authorEdit: authorEditReducer,
  printerAdd: printerAddReducer,
  printer: printerReducer,
  printerEdit: printerEditReducer,
  categoryAdd: categoryAddReducer,
  category: categoryReducer,
  categoryEdit: categoryEditReducer,
});

export default rootReducer;
