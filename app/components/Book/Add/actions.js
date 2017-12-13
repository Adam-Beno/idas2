import { NEXT_STEP, COMPLETED, SET_DATA, SET_INFO, SET_NEW_BOOK_ID, DROP_FILES } from './constants';

export function nextStep() {
  return {
    type: NEXT_STEP,
  };
}

export function completed() {
  return {
    type: COMPLETED,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    data,
  };
}

export function setInfo(key, value) {
  return {
    type: SET_INFO,
    key,
    value,
  };
}

export function setNewBookId(id) {
  return {
    type: SET_NEW_BOOK_ID,
    id,
  };
}

export function dropFiles(files) {
  return {
    type: DROP_FILES,
    files,
  };
}
