import knex from 'knex';

export default knex({
  client: 'oracledb',
  connection: {
    user: 'C##ST49613',
    password: '956423178',
    connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=fei-sql1.upceucebny.cz)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=idas12)))',
  },
  migrations: {
    tableName: 'migrations',
  },
});
