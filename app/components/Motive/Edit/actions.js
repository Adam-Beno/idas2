import { EDIT_VALUE, CLEAR_STORE, SET_DATA } from './constants';

export function editValue(key, value, kind = 'string') {
  return {
    type: EDIT_VALUE,
    key,
    value,
    kind,
  };
}

export function clearStore() {
  return {
    type: CLEAR_STORE,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    data
  };
}
