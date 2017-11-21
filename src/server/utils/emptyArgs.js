import forOwn from 'lodash/forOwn';
import includes from 'lodash/includes';

// Check if args object has empty values
export default (args, excludedFields = []) => {
  let isEmpty = true;
  // For each object property
  forOwn(args, (val, key) => {
    // Check if the key is not on the list of excluded keys
    if (!includes(excludedFields, key)) {
      if (val) isEmpty = false;
    }
  });
  return isEmpty;
};
