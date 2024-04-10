/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([

    {name: 'Jamiel', bio: '', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'jtrimble', password: 'pass', birthdate: '1995-06-25', interests: 'Sports', friendslist: ''},
    {name: 'Stephen', bio: '', image: 'placeholder', username: 'smilburn', password: 'pass', birthdate: '1995-06-28', interests: 'Coding', friendslist: ''},
    {name: 'Will', bio: '', image: 'placeholder', username: 'wdallman', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: ''},
    {name: 'Nikki', bio: '', image: 'placeholder', username: 'nkhurshed', password: 'pass', birthdate: '2000-04-08', interests: 'Cyber', friendslist: ''},
    {name: 'Noel', bio: '', image: 'placeholder', username: 'gnoel', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: ''},
    {name: 'Avery', bio: '', image: 'placeholder', username: 'aeveans', password: 'pass', birthdate: '2000-04-08', interests: 'Fitness', friendslist: ''}

  ]);
};



