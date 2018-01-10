import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';
import _toUpper from 'lodash/toUpper';
import _snakeCase from 'lodash/snakeCase';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import _mapValues from 'lodash/mapValues';
import knex from '../utils/knex';

class Model {
  static camelCase(data) {
    return _map(data, (item) => _mapKeys(item, (val, key) => _camelCase(key)));
  }

  static mapKeysToSnakeCase(obj) {
    return _mapKeys(obj, (value, key) => _toUpper(_snakeCase(key)));
  }

  static getTable() {
    return _camelCase(this.table);
  }

  static convertImage(data) {
    return _mapValues(data, (val, key) => {
      if (key === 'photo') {
        const buff = new Buffer(val);
        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
      return val;
    });
  }

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
    return this.camelCase(data);
  }

  static async create(data) {
    const newObj = this.mapKeysToSnakeCase(data);
    const ID = await knex(this.table).returning('ID').insert(newObj);
    return Number(ID[0]);
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

export default Model;
