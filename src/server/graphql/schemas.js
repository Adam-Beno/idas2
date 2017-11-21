import map from 'lodash/map';
import filter from 'lodash/filter';
import autoloader from 'shared/utils/autoloader';
import merge from 'lodash/merge';
import path from 'path';
import Promise from 'bluebird';

export default new Promise((resolve) => {
  autoloader(`${path.join(__dirname, 'models')}/**/schema.js`).then(schemas => resolve(
    {
      schema: map(schemas, 'schema'),
      rootQuery: merge(...map(filter(schemas, 'rootQuery'), 'rootQuery')),
      rootMutation: merge(...map(filter(schemas, 'rootMutation'), 'rootMutation')),
    },
  ));
});

