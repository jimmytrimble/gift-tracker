// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const seeding = 'postgres://postgres:docker@127.0.0.1:5432/db'
const building = 'postgres://postgres:docker@db:5432/db'

module.exports = {

  development: {
    client: 'pg',

    // create an environment variable to handle this
    connection: building
    // connection: seeding

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
