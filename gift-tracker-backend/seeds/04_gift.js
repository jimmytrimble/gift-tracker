/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('gift').del()
  await knex('gift').insert([
    {id: 1, title: 'Basketball', price: 1, interests: 'Sports', link: 'https://tinyurl.com/3j8ejpte', image: 'https://tinyurl.com/4a893mxv', birthday_id: 1},
    // {id: 2, title: 'rowValue1', price: 1, interests: '', link: '', image: '', birthday_id: 1},
    // {id: 3, title: 'rowValue1', price: 1, interests: '', link: '', image: '', birthday_id: 1},
    // {id: 4, title: 'rowValue1', price: 1, interests: '', link: '', image: '', birthday_id: 1},
  ]);
};
