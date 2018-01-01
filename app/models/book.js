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
    let data = await knex.raw('SELECT * FROM ( SELECT  b.ID, b.NAME, b.BARCODE, S.PHOTO, a.NAME || \' \' || a.SURNAME AS AUTHOR_NAME, b.PERIOD_OF_ISSUE, b.YEAR_OF_ISSUE, b.DESCRIPTION, ROW_NUMBER() OVER (PARTITION BY b.ID ORDER BY s.BOOK_ID DESC) AS rn FROM BOOK b JOIN SCAN s ON b.ID = s.BOOK_ID JOIN AUTHOR a ON b.AUTHOR_ID = a.ID) WHERE rn = 1');
    data = this.camelCase(data);
    data = _map(data, (item) => this.convertImage(item));
    console.log(data);
    return data;
  }
}

export default Book;
