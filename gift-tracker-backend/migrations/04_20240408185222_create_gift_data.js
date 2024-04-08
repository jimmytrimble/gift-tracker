/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('gift', table => {
    table.increments("id");
    table.string('title')
    table.integer('price')
    table.string('interests')
    table.string('link', 700)
    table.string('image', 700)
    table.integer('birthday_id')
    table.foreign('birthday_id').references('birthday.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('gift', table => {
      table.dropForeign('birthday_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("gift")
    })
};
