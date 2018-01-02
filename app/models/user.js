import _head from 'lodash/head';
import knex from '../utils/knex';
import Model from './index';

class User extends Model {

  static async usernameExists(username) {
    const data = await knex('USERS').where('USERNAME', username);
    console.log(data.length > 0);
    // If the data array is greater then one it means that this username is taken
    return (data.length > 0);
  }

  static async authenticate(username, password) {
    let data = await knex('USERS').where('USERNAME', username).where('PASSWORD', password);
    data = this.camelCase(data);
    return _head(data);
  }
}

export default User;
