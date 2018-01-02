import { FETCH_PRINTERS_SUCCEEDED } from './constants';

export function fetchPrintersSucceeded(data) {
  return {
    type: FETCH_PRINTERS_SUCCEEDED,
    data,
  };
}
