const resolvers = {
  Query: {
    user: () => ({
      id: 'placeholder',
      firstName: 'placeholder',
      lastName: 'placeholder',
      email: 'placeholder',
      password: 'placeholder',
    }),
  },
  User: {
    machines: () => ([
      {
        id: 'placeholder',
        mac: 'placeholder',
        ip: 'placeholder',
        fingerPrint: 'placeholder',
      },
      {
        id: 'placeholder',
        mac: 'placeholder',
        ip: 'placeholder',
        fingerPrint: 'placeholder',
      },
    ]),
    node: () => ({
      id: 'placeholder',
      user: 'placehoder',
      branch: 'placeholder',
    }),
  },
};

export default resolvers;
