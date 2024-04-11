// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const seeding = 'postgres://postgres:docker@127.0.0.1:5432/db'
const building = 'postgres://postgres:docker@db:5432/db'

module.exports = {

  development: {
    client: 'pg',
    connection: building
  },

  seeding: {
    client: 'pg',
    connection: seeding
  }

};
