/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE gift RESTART IDENTITY CASCADE')
  await knex('gift').insert([
    {title: 'Basketball', price: 1, interests: 'sports', link: 'https://tinyurl.com/3j8ejpte', image: 'https://tinyurl.com/4a893mxv', birthday_id: 1},
    {title: 'Diamond Earrings', price: 3, interests: 'jewelry', link: 'https://tinyurl.com/mrru3jp8', image: 'https://m.media-amazon.com/images/I/61XkJBrSNZL._AC_SY395_.jpg', birthday_id: 1},
    {title: 'Knife', price: 2, interests: 'cooking', link: 'https://tinyurl.com/4w735nn4', image: 'https://m.media-amazon.com/images/I/71MbxKHsQLL._AC_SX425_.jpg', birthday_id: 1},
    {title: 'Food Steamer', price: 35, interests: 'cooking', link: 'https://tinyurl.com/nhzjufhv', image: 'https://m.media-amazon.com/images/I/81EMHnWPFJL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Measuring Cups', price: 22, interests: 'cooking', link: 'https://tinyurl.com/y4hz4m5f', image: 'https://m.media-amazon.com/images/I/71AH3FqnjbL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Meat Thermometer Digital', price: 10, interests: 'cooking', link: 'https://tinyurl.com/2b76pnc9', image: 'https://m.media-amazon.com/images/I/81wPoMKvkcL._SL1500_.jpg', birthday_id: 1},
    ]);
};
