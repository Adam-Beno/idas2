import _omit from 'lodash/omit';
import knex from '../utils/knex';
import Model from './index';

class Author extends Model {
  static async fetchAll() {
    const data = await knex('AUTHORS');
    return this.camelCase(data);
  }

  static async fetch(id) {
    const data = await knex('AUTHORS').where('ID', id);
    return this.camelCase(data)[0];
  }

  static async create(data) {
    const newObj = this.mapKeysToSnakeCase(data);
    await knex('AUTHORS').insert(newObj);
  }

  static async delete(id) {
    await knex('AUTHORS').where('ID', id).del();
  }

  static async update(data) {
    const { id } = data;
    const newObj = this.mapKeysToSnakeCase(_omit(data, 'id'));

    await knex('AUTHORS').where('ID', id).update(newObj);
  }
}

export default Author;
