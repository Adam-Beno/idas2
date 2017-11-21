import knex from 'knex';

export default knex({
  client: 'oracledb',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_STRING,
  },
  migrations: {
    tableName: 'migrations',
  },
});

