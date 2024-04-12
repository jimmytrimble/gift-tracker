/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {name: 'Jamiel', bio: 'Im a cool kid', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'jimmytrimble', password: 'pass', birthdate: '1995-06-25', interests: 'Sports', friendslist: '2,3,4,5,'},
    {name: 'Stephen', bio: 'i like to go to the movies', image: 'https://static.vecteezy.com/system/resources/previews/010/421/819/original/gift-box-kawaii-icon-free-vector.jpg', username: 'stephen-milburn', password: 'pass', birthdate: '1995-06-28', interests: 'Coding', friendslist: '3,5,'},
    {name: 'Will', bio: 'i have a lot of puppies', image: 'https://static.vecteezy.com/system/resources/previews/010/421/819/original/gift-box-kawaii-icon-free-vector.jpg', username: 'thedigitalnode', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: '2,4,'},
    {name: 'Nikki', bio: 'my seashell collection is better than yours...', image: 'https://static.vecteezy.com/system/resources/previews/010/421/819/original/gift-box-kawaii-icon-free-vector.jpg', username: 'RARA2D', password: 'pass', birthdate: '2000-04-08', interests: 'Cyber', friendslist: '1,3,'},
    {name: 'Noel', bio: 'I love to Travel the World', image: 'https://static.vecteezy.com/system/resources/previews/010/421/819/original/gift-box-kawaii-icon-free-vector.jpg', username: 'Gnoel01', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: ''},
    {name: 'Avery', bio: 'my real name is Stacey', image: 'https://static.vecteezy.com/system/resources/previews/010/421/819/original/gift-box-kawaii-icon-free-vector.jpg', username: 'avery-cha', password: 'pass', birthdate: '2000-04-08', interests: 'Fitness', friendslist: ''}
  ]);
};