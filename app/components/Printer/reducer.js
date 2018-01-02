import { fromJS } from 'immutable';

import { FETCH_PRINTERS_SUCCEEDED } from './constants';

const initialState = fromJS({
  printers: [],
});

function printerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRINTERS_SUCCEEDED:
      return state
        .set('printers', fromJS(action.data));
    default:
      return state;
  }
}

export default printerReducer;
