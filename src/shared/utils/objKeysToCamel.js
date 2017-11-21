import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export default obj => mapKeys(obj, (value, key) => camelCase(key));
