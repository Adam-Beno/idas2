import knex from '../utils/knex';

import Model from './index';

class DecorationMotive extends Model {
  static async create(data) {
    const newObj = this.mapKeysToSnakeCase(data);
    await knex(this.table).insert(newObj);
  }

}

DecorationMotive.table = 'DECORATION_MOTIVE';

export default DecorationMotive;
