import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';
import _toUpper from 'lodash/toUpper';
import _snakeCase from 'lodash/snakeCase';

class Model {
  static camelCase(data) {
    return _map(data, (item) => _mapKeys(item, (val, key) => _camelCase(key)));
  }

  static mapKeysToSnakeCase(obj) {
    return _mapKeys(obj, (value, key) => _toUpper(_snakeCase(key)));
  }
}

export default Model;
