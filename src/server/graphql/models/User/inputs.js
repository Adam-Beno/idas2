import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { GraphQLEmail, GraphQLUUID } from 'graphql-custom-types';

/**
 * UserInput
 * GraphQL Input Object for creating a new user via mutations.
 */
const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  description: 'Input object type for creating a new User.',
  fields: {
    referralId: { type: GraphQLUUID },
    data: {
      type: new GraphQLInputObjectType({
        name: 'CreateUserData',
        description: 'User data.',
        fields: {
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLEmail) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
  },
});

/**
 * UpdateUserInput
 * GraphQL Input Object for updating user data via mutations.
 */
const updateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  description: 'User metadata.',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLUUID) },
    patch: {
      type: new GraphQLInputObjectType({
        name: 'UpdateUserPatch',
        description: 'New data.',
        fields: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLEmail },
          password: { type: GraphQLString },
        },
      }),
    },
  },
});

/**
 * DeleteUserInput
 * GraphQL Input Object for deleting a user via mutations.
 */
const deleteUserInput = new GraphQLInputObjectType({
  name: 'DeleteUserInput',
  description: 'User ID.',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLUUID) },
  },
});

const confirmUserEmailInput = new GraphQLInputObjectType({
  name: 'ConfirmUserEmailInput',
  description: 'Check users verification link',
  fields: {
    emailConfirmation: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const loginUserInput = new GraphQLInputObjectType({
  name: 'LoginUserInput',
  description: 'Attempt to login the user.',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLEmail) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const checkEmailInput = new GraphQLInputObjectType({
  name: 'CheckEmailInput',
  description: 'Check email availability',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLEmail) },
  },
});

/**
 * UpdateUserInput
 * GraphQL Input Object for updating user data via mutations.
 */
const updateUserPasswordInput = new GraphQLInputObjectType({
  name: 'UpdateUserPasswordInput',
  description: 'User password.',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLUUID) },
    patch: {
      type: new GraphQLInputObjectType({
        name: 'UpdateUserPasswordPatch',
        description: 'New data.',
        fields: {
          password: { type: new GraphQLNonNull(GraphQLString) },
          password_confirmation: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
  },
});

export default { createUserInput, updateUserInput, deleteUserInput, confirmUserEmailInput, loginUserInput, checkEmailInput, updateUserPasswordInput };
