/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE gift_wishlist RESTART IDENTITY CASCADE')
  await knex('gift_wishlist').insert([
    {gift_id: 1, wishlist_id: 1},
    // {gift_id: 1, wishlist_id: 1},
    // {gift_id: 1, wishlist_id: 1},
    // {gift_id: 1, wishlist_id: 1}
  ]);
};
