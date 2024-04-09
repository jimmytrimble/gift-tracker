/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('birthday').del()
  await knex('birthday').insert([
    {id: 1, name: 'Avery', birthdate: '1995-06-28', interests: 'Sports', relationship: 'brudah', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1},
    // {id: 1, name: 'Basketball', birthday: '1995-06-28', interests: 'Sports', relationship: 'brudah', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1},
    // {id: 1, name: 'Basketball', birthday: '1995-06-28', interests: 'Sports', relationship: 'brudah', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1},
    // {id: 1, name: 'Basketball', birthday: '1995-06-28', interests: 'Sports', relationship: 'brudah', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1}
  ]);
};


