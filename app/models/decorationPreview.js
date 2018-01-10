import _map from 'lodash/map';
import _toUpper from 'lodash/toUpper';
import _snakeCase from 'lodash/snakeCase';
import _isEmpty from 'lodash/isEmpty';

import knex from '../utils/knex';
import Model from './index';

class DecorationPreview extends Model {
  static async fetch(params) {
    console.log();
    let data = {};
    if (_isEmpty(params)) {
      data = await knex(this.table);
    } else {
      const query = knex(this.table);
      _map(params, (value, key) => {
        query.where(_toUpper(_snakeCase(key)), value);
      });
      data = await query;
    }
    data = this.camelCase(data);
    data = _map(data, (item) => this.convertImage(item));
    return data;
  }
}

DecorationPreview.table = 'DECORATION_WITH_SCAN';

export default DecorationPreview;
