import merge from 'lodash/merge';
import autoloader from 'shared/utils/autoloader';
import path from 'path';
import Promise from 'bluebird';

export default new Promise((resolve) => {
  autoloader(`${path.join(__dirname, 'models')}/**/mutations.js`).then(mutations => resolve(
    merge(...mutations),
  ));
});
