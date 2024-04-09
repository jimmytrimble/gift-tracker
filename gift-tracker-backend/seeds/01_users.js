/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Jamiel', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    {id: 2, name: 'Stephen', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    {id: 3, name: 'Will', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    {id: 4, name: 'Nikki', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'user', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
  ]);
};



