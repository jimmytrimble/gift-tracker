/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('birthday').del()
  await knex('birthday').insert([
    {id: 1, name: 'Avery', birthdate: '1995-06-28', interests: 'Fitness', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 6, wishlist_id: 1},
    {id: 2, name: 'Jamiel', birthdate: '1995-06-25', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1},
    {id: 3, name: 'Stephen', birthdate: '1995-06-28', interests: 'Coding', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 2, wishlist_id: 1},
    {id: 4, name: 'Nikki', birthdate: '1995-06-25', interests: 'Cyber', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 4, wishlist_id: 1},
    {id: 5, name: 'Noel', birthdate: '1995-06-25', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 5, wishlist_id: 1},
    {id: 6, name: 'Will', birthdate: '1995-06-25', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 3, wishlist_id: 1},
  ]);
};


