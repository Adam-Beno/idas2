import Promise from 'bluebird';
import { GraphQLObjectType, GraphQLSchema, GraphQLInputType } from 'graphql';

import schemas from './schemas';
import mutations from './mutations';

export default new Promise((resolve) => {
  Promise.all([
    schemas,
    mutations,
  ]).then((autoloads) => {
    const rootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: () => (autoloads[0].rootQuery),
    });

    const rootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => (autoloads[1]),
    });

    const schema = new GraphQLSchema({
      query: rootQuery,
      mutation: rootMutation,
    });
    resolve(schema);
  });
});
