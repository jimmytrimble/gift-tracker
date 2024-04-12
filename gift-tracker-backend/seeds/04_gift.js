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
    {title: 'Food Steamer', price: 2, interests: 'cooking', link: 'https://tinyurl.com/nhzjufhv', image: 'https://m.media-amazon.com/images/I/81EMHnWPFJL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Measuring Cups', price: 2, interests: 'cooking', link: 'https://tinyurl.com/y4hz4m5f', image: 'https://m.media-amazon.com/images/I/71AH3FqnjbL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Meat Thermometer Digital', price: 1, interests: 'cooking', link: 'https://tinyurl.com/2b76pnc9', image: 'https://m.media-amazon.com/images/I/81wPoMKvkcL._SL1500_.jpg', birthday_id: 1},

    {title: 'Basting and Pastry Brush', price: 1, interests: 'cooking', link: 'https://tinyurl.com/bd2s4r6y', image: 'https://m.media-amazon.com/images/I/51T-0DrRqbL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Pan Set', price: 3, interests: 'cooking', link: 'https://tinyurl.com/2n8j54v6', image: 'https://m.media-amazon.com/images/I/81TamFWOmZL._AC_SL1500_.jpg', birthday_id: 1},
    //Soprts
    {title: 'Mouth Guard', price: 1, interests: 'sports', link: 'https://tinyurl.com/d3snnzfv', image: 'https://m.media-amazon.com/images/I/61MWUlVVJgL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Portable Home Gym', price: 2, interests: 'fitness', link: 'https://tinyurl.com/4skucmbf', image: 'https://m.media-amazon.com/images/I/71tsbPDponL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Bluetooth Headphones', price: 2, interests: 'fitness', link: 'https://tinyurl.com/7dptwm74', image: 'https://m.media-amazon.com/images/I/71G9a1iSpHL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Massage Gun', price: 3, interests: 'sports', link: 'https://tinyurl.com/2h86azvm', image: 'https://m.media-amazon.com/images/I/71CW3Q57gbL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Under Desk Elliptical', price: 3, interests: 'fitness', link: 'https://tinyurl.com/3epfc3re', image: 'https://m.media-amazon.com/images/I/71vH97+dPTL._AC_SL1500_.jpg', birthday_id: 1},
    //Fashion
    {title: 'Womans Jeans', price: 1, interests: 'fashion', link: 'https://tinyurl.com/yf82r3ta', image: 'https://m.media-amazon.com/images/I/51tjozEuQYL._AC_SY550_.jpg', birthday_id: 1},
    {title: 'Mens jeans', price: 1, interests: 'fashion', link: 'https://tinyurl.com/3w2wdmjp', image: 'https://m.media-amazon.com/images/I/811P5Y76P-L._AC_SY550_.jpg', birthday_id: 1},
    {title: 'Blouses', price: 2, interests: 'fashion', link: 'https://tinyurl.com/4de3rrsp', image: 'https://m.media-amazon.com/images/I/81Q1PgAa+-L._AC_SY550_.jpg', birthday_id: 1},
    {title: 'Pullover Fleece Hoodie', price: 2, interests: 'fashion', link: 'https://tinyurl.com/jddsyzun', image: 'https://m.media-amazon.com/images/I/71VQNKfE4jL._AC_SX569_.jpg', birthday_id: 1},
    {title: 'Womens Shoes', price: 3, interests: 'fashion', link: 'https://tinyurl.com/2tfymtnx', image: 'https://m.media-amazon.com/images/I/61fA5a1vFEL._AC_SY575_.jpg', birthday_id: 1},
    {title: 'Mens Sneakers', price: 3, interests: 'fashion', link: 'https://tinyurl.com/sbdes337', image: 'https://m.media-amazon.com/images/I/71rz98tR7uL._AC_SX575_.jpg', birthday_id: 1},
    // Jewelry
    {title: '25 Pairs Earrings', price: 1, interests: 'jewelry', link: 'https://tinyurl.com/2xyd2jrc', image: 'https://tinyurl.com/2nyppsps', birthday_id: 1},
    {title: 'Heart-decorated Necklace', price: 1, interests: 'jewelry', link: 'https://tinyurl.com/mrru3jp8', image: 'https://tinyurl.com/mtupaeym', birthday_id: 1},
    {title: 'TRIPLE METAL EARRINGS', price: 1, interests: 'jewelry', link: 'https://tinyurl.com/2k3s4pjy', image: 'https://tinyurl.com/2rmpz2vc', birthday_id: 1},
    {title: 'Crown Stud Earrings', price: 2, interests: 'jewelry', link: 'https://tinyurl.com/yck6cxvx', image: 'https://tinyurl.com/mr3axyuh', birthday_id: 1},
    {title: 'FAUX CORAL BRACELET', price: 2, interests: 'jewelry', link: 'https://tinyurl.com/2cecuwvk', image: 'https://tinyurl.com/2zztnwt5', birthday_id: 1},
    {title: 'Classic Japanese Akoya Pearl Bracelet', price: 3, interests: 'jewelry', link: 'https://tinyurl.com/59v9vxrz', birthday_id: 1},
    {title: 'Blue Sapphire & Diamond', price: 3, interests: 'jewelry', link: 'https://tinyurl.com/3naa423v', image: 'https://tinyurl.com/yka2vmvx', birthday_id: 1},
    {title: 'Crown O Snake Chain Bracelet', price: 3, interests: 'jewelry', link: 'https://tinyurl.com/39h2ac8c', image: 'https://tinyurl.com/2n6juw6r', birthday_id: 1},
    //Out Door
    {title: 'Solar Garden Lights', price: 1, interests: 'outdoors', link: 'https://tinyurl.com/mvt9vhhx', image: 'https://m.media-amazon.com/images/I/81Xc1PtujNL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'FIRE PLUGS ', price: 1, interests: 'outdoors', link: 'https://tinyurl.com/y7z9895p', image: 'https://tinyurl.com/bdz4wrn4', birthday_id: 1},
    {title: 'SUSPENSION-NXT - Knife', price: 2, interests: 'outdoors', link: 'https://tinyurl.com/bddeuuek', image: 'https://tinyurl.com/4xhp9uhb', birthday_id: 1},
    {title: 'Medical Kit', price: 2, interests: 'outdoors', link: 'https://tinyurl.com/y6yd9m7t', image: 'https://tinyurl.com/3spm7vd2', birthday_id: 1},
    {title: 'Solar powered water proof speakers', price: 3, interests: 'outdoors', link: 'https://tinyurl.com/3uetfj2t', image: 'https://m.media-amazon.com/images/I/81lCLAUJcQL._AC_SL1500_.jpg', birthday_id: 1},
    {title: 'Leatherman Multitool', price: 3, interests: 'outdoors', link: 'https://tinyurl.com/2vxwx6hu', image: 'https://tinyurl.com/fb64n2yt', birthday_id: 1},
    ]);
};
