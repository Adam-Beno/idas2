import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';
import _toUpper from 'lodash/toUpper';
import map from 'lodash/map';
import knex from '../utils/knex';
import Model from './index';

class Printer extends Model {
  static async fetch(params) {
    let data = {};
    if (_isEmpty(params)) {
      data = await knex(this.table);
    } else {
      const query = knex(this.table);
      map(params, (value, key) => {
        query.where(_toUpper(_snakeCase(key)), value);
      });
      data = await query;
    }
    return this.camelCase(data);
  }

  static async create(data) {
    const newObj = this.mapKeysToSnakeCase(data);
    await knex(this.table).insert(newObj);
  }

  static async delete(id) {
    await knex(this.table).where('ID', id).del();
  }

  static async update(data) {
    const { id } = data;
    const newObj = this.mapKeysToSnakeCase(_omit(data, 'id'));

    await knex(this.table).where('ID', id).update(newObj);
  }

  static getTable() {
    return _camelCase(this.table);
  }
}

Printer.table = 'PRINTERS';

export default Printer;
