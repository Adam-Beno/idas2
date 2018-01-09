import _mapValues from 'lodash/mapValues';
import Model from './index';

class Scan extends Model {
  static convertImage(data) {
    return _mapValues(data, (val, key) => {
      if (key === 'photo') {
        const buff = new Buffer(val);
        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
      return val;
    });
  }
}

Scan.table = 'SCANS';

export default Scan;
