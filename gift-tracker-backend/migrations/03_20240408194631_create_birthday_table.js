/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('birthday', table => {
    table.increments("id")
    table.string("name")
    table.string("interests")
    table.date("birthdate")
    table.string('relationship')
    table.integer("priority")
    table.string("gift_ideas")
    table.string("notes")
    table.integer("user_id")
    table.foreign('user_id').references('users.id')
    table.integer("wishlist_id")
    table.foreign('wishlist_id').references('wishlist.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('birthday', table => {
      table.dropForeign('user_id');
      table.dropForeign('wishlist_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("birthday")
    })
};
