import forOwn from 'lodash/forOwn';
import includes from 'lodash/includes';
import snakeCase from 'lodash/snakeCase';

export default (queryObject, args, excludedFields = []) => {
  forOwn(args, (value, key) => {
    if (!includes(excludedFields, key)) {
      queryObject.update(snakeCase(key), value);
    }
  });
  return queryObject;
};
