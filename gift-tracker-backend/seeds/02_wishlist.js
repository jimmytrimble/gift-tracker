/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex.raw('TRUNCATE TABLE wishlist RESTART IDENTITY CASCADE')
  await knex('wishlist').insert([
    {gifts: 'Basketball', image: 'https://tinyurl.com/4a893mxv', bought: 'false', image: 'https://tinyurl.com/3j8ejpte'},
    {gifts: 'New Car', image: 'https://en.wikipedia.org/wiki/Lamborghini_Hurac%C3%A1n#/media/File:2017_Lamborghini_Huracan_LP610.jpg', bought: 'true'},
    {gifts: 'Jet', image: 'https://images.aircharterservice.com/blog/a-bombardier-global-5000-in-a-dark-hangar.jpg', bought: 'false'},
    {gifts: 'Puppy', image: 'https://media.4-paws.org/f/3/9/1/f39115c5c798651f95141c37b692f76b669af761/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.webp', bought: 'true'},

  ]);
};
