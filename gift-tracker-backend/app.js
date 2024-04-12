const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 8081;
const oauthToken = `v^1.1#i^1#p^1#I^3#f^0#r^0#t^H4sIAAAAAAAAAOVYfWwTZRhf22042RjKBnNq7I4vAXt9767Xrsda0m3AKmwrazcYZCHXu/fYbde74+7tRiXEMZQgQRK+FIWQSYgaFIkmBIiRiMG4+BUIiV9/EIwSMP4Fc+EP48fdtYxuEkDWxCX2n+ae93mf9/f7vc/zfoG+wqL5Wxu23iyxTbIP9IE+u81GTAZFhQULpjjslQV5IMvBNtA3qy+/33GtRmcTksq0QF1VZB06NyQkWWcsYwBLajKjsLqoMzKbgDqDOCYaalzOkDhgVE1BCqdImDNcH8AIL8X5SJrmOU6ggJ8yrPKtmDElgPnirJcTPALL0X7KJxBGu64nYVjWESujAEYC0uMCHhdBxggvQxEM8OI+UL0ac7ZBTRcV2XDBARa04DJWXy0L692hsroONWQEwYLh0JJocyhcv7gpVuPOihXM6BBFLErqo7/qFB4621gpCe8+jG55M9Ekx0Fdx9zB9AijgzKhW2AeAL4lddzj4YBA+TkfRQCaiOdEyiWKlmDR3XGYFpF3CZYrA2UkotS9FDXUiHdBDmW+mowQ4Xqn+bciyUqiIEItgC2uDbWHIhEsGEVQ7YRyo6tW1FAnz6ZckZZ6lz/u91DVAmBdFMsLFE17MwOlo2VkHjNSnSLzoima7mxSUC00UMOx2pBZ2hhOzXKzFhKQiSjbr3pEQ3q1OanpWUyiTtmcV5gwhHBan/eegZHeCGliPIngSISxDZZEAYxVVZHHxjZauZhJnw16AOtESGXc7t7eXryXwhVtnZsEgHCvalwe5TphgsUMX7PW0/7ivTu4RIsKB42eusiglGpg2WDkqgFAXocFPX7KS9IZ3UfDCo61/sOQxdk9uiJyVSGUH/p4sprkeIr2chydiwoJZpLUbeKAcSM1E6zWDZEqsRx0cUaeJRNQE3mGogXSyFbo4r1+weXxC4IrTvNeFyFACCCMxzl/9f+pUO431aOQ0yDKSa7nLM9jcbq1FoDnGtjG+qbaVTFSCSuyf0Vbc+dK+GyilUe1HtiChAYU8QTutxruSL5OEg1lYsb4uRDArPXcidCg6Ajy46IX5RQVRhRJ5FITa4IpjY+wGkpFoSQZhnGRDKlqODdrdc7o/ctl4sF4526P+o/2pzuy0s2UnViszP66EYBVRdzcgXBOSbjNWldY4/hhmtdaqMfFWzROrhOKtUEyzVbk00dO3KKL6z0crkFdSWrGaRtvNk9gMaUbysZ+hjRFkqDWRoy7nhOJJGLjEpxohZ2DBBfZCbbZEj6C9FN+j3d8yxFnbaVrJ9qSlIulOH/pAx6r3aMv+cE860f02z4B/bYzdpsN1IDZxExQVehozXcUV+oigrjICrgurpONu6sG8W6YUllRs0/Lu3F4X0Nd5eLmV+ZvjKXOH/gsrzjrjWGgA1SMvDIUOYjJWU8O4InbLQVE6YwS0gM8BEl4jXusdzWYebs1n5ieX/bO9fId7aXrf93zzKHdRxxTz3THpi0DJSNONltBXn6/La98S7kwd+nwrJbN+y/3bD4R+evPr4bKX7reAU7t/GX7CW/v/vhvXT2s7ePfLz3uKFvVM2te5fnImkH1zdKuH+jXXhiq+3Ht3mlXh4mSSQ0nN104Wnyg49rzx+ckhEW+Qv+Cee2nzl7+eukfH875ftHrh986X7VpsO3l1o2VwxUz9lWd3X9u0qdPV+zrGfj52Iu7dq68Eln43ekjzi/B9PUVW3ls2bHdHz317czhhde7Lr/PbMfJmpNV0c6rc78prfpcGDx81d5x8aH4F7ZDp7ft+OCG79Gh9q5zcteamyunHLFfAiuKW8sOPjK4a/eegz+9XYTVzJ9z9sp7x+HFN6Y+tkM6Gikaevjd2XufHNjy6oWy9Fz+DR1vYun9EQAA`
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors(), express.json());

// --- FUNCTIONS ---
let priority = 4;
const handlePriority = (relationship) => {
  switch(relationship) {
    case 'family':
      priority = 1;
      break;
    case 'friend':
      priority = 2;
      break;
    case 'coworker':
      priority = 3;
      break;
    default:
      priority = 4;
  }
}

const handlePrice = (price) => {
  if (price > 0 && price <= 25) return 1
  else if (price > 25 && price <= 100) return 2
  else if (price > 100) return 3
  else return 0;
}

app.get('/', (req, res) => {
  res.send('testing');
})

app.get('/birthday/:id', (req, res) => {
  const { id } = req.params;
  knex('birthday')
    .select('birthday.name', 'wishlist.gifts')
    .join('wishlist', 'birthday.wishlist_id', '=', 'wishlist.id')
    .where('wishlist.id', id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})

app.get('/admin/event', (req, res) => {
  knex('birthday')
      .select('*')
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
})

app.get('/users/event', (req, res) => {
    knex('birthday')
        .select('name', 'birthdate', 'relationship', 'priority')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).send(err))
})

app.get('/birthday', (req, res) => {
  knex('birthday')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})

app.get('/admin/gifts', (req, res) => {
  knex('gift')
    .select('*')
    // .where('birthday_id', id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})


app.get('/admin/gifts', (req, res) => {
  knex('gift')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))

})

app.get('/gifts/:id', (req, res) => {
  const { id } = req.params;
  knex('gift')
    .select('*')
    .where('birthday_id', id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})

app.get('/wishlist/:id', (req, res) => {

    const { id } = req.params;
    knex('wishlist')
      .select('users.name', 'wishlist.gifts', 'wishlist.image')
      .join('users', 'wishlist.user_id', '=', 'users.id')
      .where('users.id', id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
})

// GET all users
// Necessary to see if a user exists in the database when they login via their Github account
app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .select('*')
    .where('id', id)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).send(`User not found.`)
      }
      res.status(200).json(data)
    })
    .catch(err => res.status(404).send(err))
})

// --- POST ---
// handled by front end
app.post('/users/new', (req, res) => {
  const { name, image, birthdate, interests, username, password } = req.body;
  knex('users')
    .insert({ name, image, birthdate, interests, username, password })
    .then(response => {
      res.status(201).json({ name, image, birthdate, interests })
    })
})

// --- PUT ---
// change image in user profile
app.patch('/users/update/:id', (req, res) => {
  const { name, image, birthdate, interests, username, password } = req.body;
  const { id } = req.params
  let updates = {};
  if (name) updates.name = name
  if (image) updates.image = image
  if (birthdate) updates.birthdate = birthdate
  if (interests) updates.interests = interests
  if (username) updates.username = username
  if (password) updates.password = password
  knex('users')
    .where('id', id)
    .update(updates)
    .then(response => {
      res.status(201).send('Updated successfully.')
    })
})

// --- DELETE ---

app.delete('/users/remove/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .where('id', req.params.id)
    .del()
    .then(deleted => {
      if (deleted) res.status(202).json(`User ${id} deleted.`)
      else res.status(404).json(`User ${id} not found.`)
    })
})

app.get('/search', (req, res) => {
  const query = req.query.query || 'drone';
  const limit = req.query.limit || 3;
  const ebayApiEndpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${limit}`

  axios.get(ebayApiEndpoint, {
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
    }
  })
    .then(response => {
      const items = response.data.itemSummaries;
      const extractedData = items.map(item => ({
        title: item.title,
        imageUrl: item.image.imageUrl,
        price: handlePrice(parseInt(item.price.value, 10)),
        ebayUrl: item.itemWebUrl
      }));
      res.status(200).send(extractedData)
    })
    .catch(error => {
      console.log(error);
      const link = `http://amazon.com/s?k=${query}`;
      res.status(500).send(`Item, ${query}, does not exist in our marketplace. Please visit Amazon to purchase: ${link}`);
    });
});

// --- POST ---
// handled by front end
app.post('/users/new', (req, res) => {
    const { name, image, birthdate, interests, username, password } = req.body;
    knex('users')
      .insert({ name, image, birthdate, interests, username, password })
      .then(response => {
        res.status(201).json({ name, image, birthdate, interests })
      })
      .catch(error => {
        res.status(500).send('Unable to create user.');
      });
})

app.post('/update/wishlist/:user_id', (req, res) => {
  const { gifts, image } = req.body;
  const { user_id } = req.params
  knex('wishlist')
    // .where('user_id', user_id)
    .insert({ gifts, image, user_id})
    .then(response => {
      res.status(201).send(`Item ${gifts} added to your wishlist`)
  })
    .catch(error => {
      res.status(500).send(`Unable to add ${gifts} to your wishlist.`);
    })
})


app.post('/birthday/new', (req, res) => {
  const { name, birthdate, relationship, user_id } = req.body;
  const interests = '';
  const gift_ideas = '';
  const notes = '';
  // somehow get User ID and Wishlist ID
  const wishlist_id = 1;
  handlePriority(relationship);
  knex('birthday')
    .insert({ name, birthdate, interests, relationship, priority, gift_ideas, notes, user_id, wishlist_id })
    .then(response => {
      res.status(201).send(`Event ${name} created.`)
    })
    .catch(error => {
      res.status(500).send(`Unable to create event ${name}.`);
    });
})



app.post('/update/search', (req, res) => {
  const query = req.query.query || 'iphone';
  const limit = req.query.limit || 5;
  var { title, image } = req.body

  const ebayApiEndpoint = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${limit}`

  axios.get(ebayApiEndpoint, {
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
    }
  })
    .then(response => {
      const itemSummaries = response.data.itemSummaries;
      const extractedData2 = itemSummaries.map(item => ({
        title : item.title,
        price: handlePrice(parseInt(item.price.value, 10)),
        link: item.itemWebUrl,
        image: item.image.imageUrl,
      }));
      console.log(extractedData2)
      let fullExtract = extractedData2[0]
      var title = fullExtract.title
      var image = fullExtract.image
      var price = fullExtract.price
      var link = fullExtract.link
            // res.status(200).json(extractedData);
      knex('gift')
      .insert({title, price, link, image})
      .then(response => {
      res.status(201).send(`Item added.`)
    })
    .catch(error => {
      res.status(500).send(`Unable to add item.`);
    });
  })
});




// --- PUT ---
// change info within birthday
app.patch('/birthday/update/:id/:name', (req, res) => {
  const { newName, birthdate, relationship } = req.body;
  const { id, name } = req.params
  let updates = {};
  if (newName) updates.name = newName
  if (birthdate) updates.birthdate = birthdate
  if (relationship) updates.relationship = relationship
  knex('birthday')
    .where('user_id', id)
    .where('name', name)
    .update(updates)
    .then(response => {
      res.status(201).send('Updated successfully.')
    })
})
// change image in user profile
app.patch('/users/update/:id', (req, res) => {
  const { name, image, birthdate, interests, username, password } = req.body;
  const { id } = req.params
  let updates = {};
  if (name) updates.name = name
  if (image) updates.image = image
  if (birthdate) updates.birthdate = birthdate
  if (interests) updates.interests = interests
  if (username) updates.username = username
  if (password) updates.password = password
  knex('users')
    .where('id', id)
    .update(updates)
    .then(response => {
      res.status(201).send('Updated successfully.')
    })
  })

app.patch('/update/:id', (req, res) => {
  const { bought, birthdate } = req.body;
  const { id } = req.params
  let updates = {};
  if (bought) updates.bought = bought;
  if (birthdate) updates.birthdate = birthdate;
  knex('birthday')
    .first()
    .where('id', id)
    .update(updates)
    .then(response => {
      res.status(201).send(`Bought/birthdate updated.`)
  })
})

app.patch('/update/friends/:id', (req, res) => {
  const { friendToAdd } = req.body;
  const { id } = req.params
  knex('users')
        .select('friendslist')
        .where('id', id)
        .first()
        .then(user => {
            if (!user) {
                return res.status(404).send(`User with ID ${id} not found.`);
            }
            let updatedFriendsList = `${user.friendslist}${friendToAdd},`;
            knex('users')
                .where('id', id)
                .update({ friendslist: updatedFriendsList })
                .then(response => {
                    res.status(200).send(`Added ${friendToAdd} to friendslist.`);
                })
                .catch(error => {
                    console.error('Error updating friendslist:', error);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(error => {
            console.error('Error retrieving user:', error);
            res.status(500).send('Internal Server Error');
        });
})

// --- DELETE ---

app.delete('/users/remove/:name', (req, res) => {
  const { id } = req.params;
  knex('birthday')
    .where('name', name)
    .del()
    .then(deleted => {
      if (deleted) res.status(202).send(`User ${id} deleted.`)
      else res.status(404).send(`User ${id} not found.`)
    })
})

app.delete('/remove/event/:name', (req, res) => {
  const { name } = req.params;
  knex('birthday')
    .where('name', name)
    .first()
    .del()
    .then(deleted => {
      if (deleted) res.status(202).send(`Event ${name} deleted.`)
      else res.status(404).send(`Event ${name} not found.`)
    })
})


app.listen(port, (req, res) => console.log(`Express server is listening on ${port}.`))
