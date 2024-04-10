/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE TABLE wishlist RESTART IDENTITY CASCADE')
  await knex('wishlist').insert([
    {gifts: 'Basketball', bought: 'false', image: 'https://snipboard.io/gZ2qHr.jpg', user_id: 1},
    // {id: 1, gifts: 'Basketball', bought: 'false'},
    // {id: 1, gifts: 'Basketball', bought: 'false'},
    // {id: 1, gifts: 'Basketball', bought: 'false'}
  ]);
};
