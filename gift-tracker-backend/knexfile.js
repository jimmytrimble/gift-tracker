// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@db:5432/db'
    // connection: {
    //   host: '127.0.0.1',
    //   port: 5432,
    //   database: 'db',
    //   user: 'postgres',
    //   password: 'docker'
    // }
  },


//   "errno": -111,
//   "code": "ECONNREFUSED",
//   "syscall": "connect",
//   "address": "127.0.0.1",
//   "port": 5432
// }

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
