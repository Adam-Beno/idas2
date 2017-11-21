import joinMonster from 'join-monster';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import knex from 'server/utils/db';

import {
  GraphQLEmail,
  GraphQLUUID,
} from 'graphql-custom-types';

const User = new GraphQLObjectType({
  name: 'User',
  sqlTable: 'users',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLUUID) },
    firstName: {
      type: GraphQLString,
      sqlColumn: 'first_name',
    },
    lastName: {
      type: GraphQLString,
      sqlColumn: 'last_name',
    },
  }),
});

const rootQuery = {
  user: {
    type: User,
    description: 'Finds User by their ID or Email address.',
    // Let client search for users by their ID or Email
    args: {
      id: { type: GraphQLUUID },
      email: { type: GraphQLEmail },
    },
    where: (usersTable, args) => {
      if (args.id) return `${usersTable}.id = '${args.id}'`;
      if (args.email) return `${usersTable}.email = '${args.email}'`;
    },
    resolve: (parent, args, context, resolveInfo) => joinMonster(resolveInfo, {}, sql => knex.raw(sql)),
  },
  test: {
    type: GraphQLString,
    async resolve(parent, args) {
      const val = await knex().raw('SELECT NOW()');

      return val;
    },
  },
};

export default { schema: User, rootQuery };
