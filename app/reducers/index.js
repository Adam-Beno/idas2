import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

// CUSTOM REDUCERS
import appReducer from '../components/App/reducer';
import notificationReducer from '../components/Notification/reducer';
import bookCardReducer from '../components/Home/Book/reducer';
import authorReducer from '../components/Author/reducer';
import printerReducer from '../components/Printer/reducer';
import categoryReducer from '../components/Category/reducer';
import motiveReducer from '../components/Motive/reducer';
import bookAddReducer from '../components/Book/Add/reducer';
import bookReducer from '../components/Book/reducer';
import bookEditReducer from '../components/Book/Edit/reducer';
import homeReducer from '../components/Home/reducer';
import userReducer from '../components/User/reducer';
import crudReducer from '../crud/reducer';
import catalogReducer from '../components/Catalog/reducer';
import detailReducer from '../components/Detail/reducer';
import decorationReducer from '../components/Decoration/reducer';

const rootReducer = combineReducers({
  router,
  form: formReducer,
  app: appReducer,
  notification: notificationReducer,
  bookCard: bookCardReducer,
  author: authorReducer,
  printer: printerReducer,
  category: categoryReducer,
  motive: motiveReducer,
  bookAdd: bookAddReducer,
  bookEdit: bookEditReducer,
  book: bookReducer,
  home: homeReducer,
  user: userReducer,
  crud: crudReducer,
  catalog: catalogReducer,
  detail: detailReducer,
  decoration: decorationReducer,
});

export default rootReducer;
