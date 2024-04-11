/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE gift_wishlist RESTART IDENTITY CASCADE')
  await knex('gift_wishlist').insert([
    {gift_id: 1, wishlist_id: 4},
    {gift_id: 2, wishlist_id: 4},
    {gift_id: 3, wishlist_id: 4},
    {gift_id: 4, wishlist_id: 4},
    {gift_id: 5, wishlist_id: 4},
    {gift_id: 6, wishlist_id: 4}
  ]);
};
