/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wishlist', table => {
    table.increments('id')
    table.string('gifts')
    table.string('image')
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('wishlist', table => {
      table.dropForeign('user_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("wishlist")
    })
};