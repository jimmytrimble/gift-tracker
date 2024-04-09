/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('gift_wishlist', table => {
    table.integer('gift_id')
    table.integer('wishlist_id')
    table.foreign('gift_id').references('gift.id')
    table.foreign('wishlist_id').references('wishlist.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('gift_wishlist', table => {
      table.dropForeign('gift_id');
      table.dropForeign('wishlist_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("gift_wishlist")
    })
};
