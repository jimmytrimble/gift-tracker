
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex.raw('TRUNCATE TABLE wishlist RESTART IDENTITY CASCADE')
  await knex('wishlist').insert([
    {gifts: 'Basketball', image: 'https://tinyurl.com/4a893mxv',  user_id: 6},
    {gifts: 'New Car', image: 'https://media.muckrack.com/groups/icons/auto-squareco.jpeg',  user_id: 6},
    {gifts: 'Jet', image: 'https://www.shutterstock.com/image-photo/jet-aircraft-sky-after-sunset-600nw-92901616.jpg', user_id: 6},
    {gifts: 'Jeff Hittin The Sprinkler', image: `https://snipboard.io/HKtP5R.jpg`, user_id:1},
    {gifts: 'Puppy', image: 'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/1280x1280/square-1500566326-gettyimages-512366437-1.jpg?resize=1200:*', user_id: 6},
    {gifts: 'Jeff Riding Imaginary Motorcycle', image: `https://snipboard.io/kVJ5Yg.jpg`, user_id: 2},
    {gifts: 'Jeff Is Not Impressed', image: `https://snipboard.io/lkQV1e.jpg`, user_id: 2},
    {gifts: 'Jeff Smells Something', image: `https://snipboard.io/ACiFHN.jpg`, user_id: 1},
    {gifts: 'Fresh Lemonade', image: 'https://princesspinkygirl.com/wp-content/uploads/2023/06/Blue-Lemonade-55.jpg', user_id: 1},
    {gifts: 'Heelys', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UZOv6CY-I4L3kZQ3BTidqTij2qkRY3ShgBzBlp1Gcg&s', user_id: 1}
  ]);
};
