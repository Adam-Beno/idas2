import { CHECK_AGE_REQUIREMENT, SET_ERROR_MESSAGES, UNSERT_ERROR_MESSAGES } from './constants';

export function checkAgeRequirement(checked = false) {
  return {
    type: CHECK_AGE_REQUIREMENT,
    checked,
  };
}

export function setErrorMessages(errors) {
  return {
    type: SET_ERROR_MESSAGES,
    errors,
  };
}

export function unsetErrorMessages() {
  return {
    type: UNSERT_ERROR_MESSAGES,
  };
}

