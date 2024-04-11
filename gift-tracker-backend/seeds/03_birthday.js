/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE birthday RESTART IDENTITY CASCADE')
  await knex('birthday').insert([
    {name: 'Averys Housewarming', birthdate: '2024-10-14', interests: 'Fitness', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 6, wishlist_id: 1},
    {name: 'Jamiel Trimble', birthdate: '2024-06-25', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 1, wishlist_id: 1},
    {name: 'Stephen Milburn', birthdate: '2024-06-28', interests: 'Coding', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 2, wishlist_id: 1},
    {name: 'Nikki Khurshed', birthdate: '2024-09-25', interests: 'Cyber', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 4, wishlist_id: 1},
    {name: 'G. Noel', birthdate: '2024-11-25', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 5, wishlist_id: 1},
    {name: 'Will Dallmanns Promotion Party', birthdate: '2024-09-01', interests: 'Sports', relationship: 'family', priority: 1, gift_ideas: 'gift ideas here', notes: 'notes entered here', user_id: 3, wishlist_id: 1},
  ]);
};