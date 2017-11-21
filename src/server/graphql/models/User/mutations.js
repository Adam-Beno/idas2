import knex from 'server/utils/db';
import { GraphQLNonNull, GraphQLString, GraphQLError } from 'graphql';
import objKeysToCamel from 'shared/utils/objKeysToCamel';
import resolveUpdateObject from 'server/utils/resolveUpdateObject';
import hashPassword from 'server/utils/hashPassword';
import validator from 'validator';
import logger from 'shared/utils/logger';

import User from '../User/schema';
import Inputs from '../User/inputs';

const sqlTable = User.schema._typeConfig.sqlTable;
const uniqueKey = User.schema._typeConfig.uniqueKey;

const rootMutation = {
  updateUser: {
    type: User.schema,
    description: 'Update user data.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.updateUserInput) },
    },
    where: (usersTable, args) => {
      if (args.input.id) return `${usersTable}.id = '${args.input.id}'`;
    },
    resolve: (parent, args, context, resolveInfo) => {
      if (context.user.sub === args.input.id) {
        return resolveUpdateObject(User.schema, parent, args, context, resolveInfo);
      }

      return null;
    },
  },
  createUser: {
    type: User.schema,
    description: 'Add new user.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.createUserInput) },
    },
    resolve: (parent, args) => new Promise((resolve) => {
    }),
  },
  deleteUser: {
    type: User.schema,
    description: 'Delete user from the DB.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.deleteUserInput) },
    },
    resolve: (parent, args) => new Promise((resolve) => {
      knex.first().table('users').where('id', '=', args.input.id).then((data) => {
        knex('users').where('id', '=', args.input.id).del().then(() => {
          resolve(objKeysToCamel(data));
        });
      });
    }),
  },
  confirmUserEmail: {
    type: GraphQLString,
    description: 'Verify user email address.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.confirmUserEmailInput) },
    },
    async resolve(parent, args) {
      return { parent, args };
    },
  },
  loginUser: {
    type: GraphQLString,
    description: 'Attempt to login the user.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.loginUserInput) },
    },
    async resolve(parent, args) {
      // Check if there is any user with given Email and Password combination
      const user = await knex(sqlTable).first().where({ email: args.input.email, password: hashPassword(args.input.password) });

      // User not found, throw error
      throw new GraphQLError('Incorrect Email and Password combination.');
    },
  },
  updateUserPassword: {
    type: GraphQLString,
    description: 'Update user password.',
    args: {
      input: { type: new GraphQLNonNull(Inputs.updateUserPasswordInput) },
    },
    where: (usersTable, args) => {
      if (args.input.id) return `${usersTable}.id = '${args.input.id}'`;
    },
    async resolve(parent, args, context) {
      // Check permissions
      if (args.input.id !== context.user.sub) {
        return 'You don\'t have the permissions to change the password for this user.';
      }

      // Check if passwords match
      if (args.input.patch.password !== args.input.patch.password_confirmation) {
        return 'Password confirmation doesn\'t match.';
      }

      // Validate the password
      if (!validator.isLength(args.input.patch.password, { min: 8 })) {
        return 'Password validation failed.';
      }

      // Attempt to update the password
      try {
        await knex('users').update({ password: hashPassword(args.input.patch.password) }).where({ id: args.input.id });
        return 'Password changed!';
      } catch (e) {
        logger.error(`Failed to change password for user: ${args.input.id}. Error: ${e}`);
        return 'Failed to change the password.';
      }
    },
  },
};

export default rootMutation;
