import casual from 'casual';

const mocks = {
  User: () => ({
    id: casual.uuid,
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    password: casual.password,
  }),
  Query: () => ({
    users: (obj, params) => {
      const users = [];

      for (let index = 0; index < params.first; index += 1) {
        users.push({
          id: casual.uuid,
          firstName: casual.first_name,
          lastName: casual.last_name,
          email: casual.email,
          password: casual.password,
        });
      }

      return users;
    },
  }),
};

export default mocks;
