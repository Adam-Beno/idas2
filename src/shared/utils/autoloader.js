/* eslint-disable */
import glob from 'glob';
import map from 'lodash/map';
import Promise from 'bluebird';

export default pattern => new Promise((resolve, reject) => {
  glob(pattern, (err, files) => {
    if (err) {
      reject(err);
    }
    resolve(map(files, file => require(file).default));
  });
});
