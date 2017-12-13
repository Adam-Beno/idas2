import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

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
import motiveAddReducer from '../components/Motive/Add/reducer';
import motiveReducer from '../components/Motive/reducer';
import motiveEditReducer from '../components/Motive/Edit/reducer';
import bookAddReducer from '../components/Book/Add/reducer';
import bookReducer from '../components/Book/reducer';
import homeReducer from '../components/Home/reducer';

const rootReducer = combineReducers({
  router,
  form: formReducer,
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
  motiveAdd: motiveAddReducer,
  motive: motiveReducer,
  motiveEdit: motiveEditReducer,
  bookAdd: bookAddReducer,
  book: bookReducer,
  home: homeReducer,
});

export default rootReducer;
