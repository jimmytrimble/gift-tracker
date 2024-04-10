/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([

    {name: 'Jamiel', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'jimmytrimble', password: 'pass', birthdate: '1995-06-25', interests: 'Sports', friendslist: '2,3,4,5'},
    {name: 'Stephen', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'stephen-milburn', password: 'pass', birthdate: '1995-06-28', interests: 'Coding', friendslist: '3,5'},
    {name: 'Will', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'thedigitalnode', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: '1,4'},
    {name: 'Nikki', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'RARA2D', password: 'pass', birthdate: '2000-04-08', interests: 'Cyber', friendslist: '2'},
    {name: 'Noel', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'Gnoel01', password: 'pass', birthdate: '2000-04-08', interests: 'Sports', friendslist: 'empty'},
    {name: 'Avery', image: 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG', username: 'avery-cha', password: 'pass', birthdate: '2000-04-08', interests: 'Fitness', friendslist: 'empty'}

  ]);
};



