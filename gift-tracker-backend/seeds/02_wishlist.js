/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wishlist').del()
  await knex('wishlist').insert([
    {id: 1, gifts: 'Basketball', bought: 'false'},
    // {id: 1, gifts: 'Basketball', bought: 'false'},
    // {id: 1, gifts: 'Basketball', bought: 'false'},
    // {id: 1, gifts: 'Basketball', bought: 'false'}
  ]);
};
