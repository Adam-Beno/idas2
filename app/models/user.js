import _head from 'lodash/head';
import knex from '../utils/knex';
import Model from './index';

class User extends Model {

  static async usernameExists(username) {
    const data = await knex(this.table).where('USERNAME', username);
    console.log(data.length > 0);
    // If the data array is greater then one it means that this username is taken
    return (data.length > 0);
  }

  static async authenticate(username, password) {
    let data = await knex(this.table).where('USERNAME', username).where('PASSWORD', password);
    data = this.camelCase(data);
    return _head(data);
  }

  static async authorization(userId) {
    let data = await knex(this.table)
    .join('ROLE_USER', 'USERS.ID', '=', 'ROLE_USER.USERS_ID')
    .join('ROLES', 'ROLES.ID', '=', 'ROLE_USER.ROLES_ID')
    .select('ROLES.LEVEL AS AUTHORIZATION')
    .where('USERS.ID', userId);
    data = this.camelCase(data);
    return _head(data).authorization;
  }

}

User.table = 'USERS';

export default User;
