import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';

class Model {
  static camelCase(data) {
    return _map(data, (item) => _mapKeys(item, (val, key) => _camelCase(key)));
  }
}

export default Model;
