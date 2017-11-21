import knex from 'knex';

export default knex({
  client: 'oracledb',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: 'jdbc:oracle:thin:@fei-sql1.upceucebny.cz:1521:idas12',
  },
  migrations: {
    tableName: 'migrations',
  },
});
