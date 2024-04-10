/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name')
    table.string('bio')
    table.string('image')
    table.date('birthdate')
    table.string('interests')
    table.string('username')
    table.string('password')
    table.string('friendslist')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
