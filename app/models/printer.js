import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import knex from '../utils/knex';
import Model from './index';

class Printer extends Model {
  static async fetch(params) {
    if (_isEmpty(params)) {
      const data = await knex(this.table);
      return this.camelCase(data);
    }
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
}

Printer.table = 'PRINTERS';

export default Printer;
