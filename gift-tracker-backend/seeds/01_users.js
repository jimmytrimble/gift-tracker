/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    // {id: 1, username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    // {id: 1, username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    // {id: 1, username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'}

  ]);
};



