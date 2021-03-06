import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';

import knex from '../utils/knex';
import Model from './index';

class Book extends Model {
  static async fetchCardPreviews(id = null) {
    console.log(id);
    let data = null;
    const query = knex('BOOKS_OVERVIEW');
    if (id !== null) {
      query.where('ID', id);
    }
    data = await query;
    data = this.camelCase(data);
    data = _map(data, (item) => this.convertImage(item));
    return data;
  }
}

Book.table = 'BOOKS';

export default Book;
