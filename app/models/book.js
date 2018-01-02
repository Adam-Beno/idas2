import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';

import knex from '../utils/knex';
import Model from './index';

class Book extends Model {
  static convertImage(data) {
    return _mapValues(data, (val, key) => {
      if (key === 'photo') {
        const buff = new Buffer(val);
        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
      return val;
    });
  }

  static async fetchAll() {
    let data = await knex('BOOKS_OVERVIEW');
    data = this.camelCase(data);
    data = _map(data, (item) => this.convertImage(item));
    console.log(data);
    return data;
  }
}

Book.table = 'BOOKS';

export default Book;
