/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {name: 'Jamiel', bio: 'Im a cool kid', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'jimmytrimble', password: 'pass', birthdate: '1995-06-25', interests: 'Sports', friendslist: '2,3,4,5'},
    {name: 'Stephen', bio: 'i like to go to the movies', image: 'placeholder', username: 'stephen-milburn', password: 'pass', birthdate: '1995-06-28', interests: 'Coding', friendslist: '3,5'},
    {name: 'Will', bio: 'i have a lot of puppies', image: 'placeholder', username: 'thedigitalnode', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: '2,4'},
    {name: 'Nikki', bio: '', image: 'placeholder', username: 'RARA2D', password: 'pass', birthdate: '2000-04-08', interests: 'Cyber', friendslist: '1,3'},
    {name: 'Noel', bio: '', image: 'placeholder', username: 'Gnoel01', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: ''},
    {name: 'Avery', bio: '', image: 'placeholder', username: 'avery-cha', password: 'pass', birthdate: '2000-04-08', interests: 'Fitness', friendslist: ''}

  ]);
};



