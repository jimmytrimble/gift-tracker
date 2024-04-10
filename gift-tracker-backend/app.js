const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 8081;
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

const cors = require('cors');
app.use(cors(), express.json());

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
      .select('birthday.name', 'wishlist.gifts', 'wishlist.image', 'wishlist.bought')
      .join('birthday', 'wishlist.id', '=', 'birthday.wishlist_id')
      .join('users', 'birthday.user_id', '=', 'users.id')
      .where('users.id', id)
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
  const query = req.query.query || 'iphone';
  const limit = req.query.limit || 10;

  const oauthToken = `v^1.1#i^1#f^0#r^0#I^3#p^3#t^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`;
  const ebayApiEndpoint = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${limit}`;

  axios.get(ebayApiEndpoint, {
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
      'Content-Type': 'application/json',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
    }
  })
    .then(response => {
      const itemSummaries = response.data.itemSummaries;
      const extractedData = itemSummaries.map(item => ({
        title: item.title,
        imageUrl: item.image.imageUrl,
        price: '$' + item.price.value
      }));
      res.status(200).json(extractedData);
    })
    .catch(error => {
      const link = `link`;
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

// app.post('/update/database', (req, res) => {
//   const query = req.query.query || 'iphone';
//   const limit = req.query.limit || 5;

//   const oauthToken = `v^1.1#i^1#f^0#r^0#I^3#p^3#t^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`;
//   const ebayApiEndpoint = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${limit}`;

//   axios.get(ebayApiEndpoint, {
//     headers: {
//       'Authorization': `Bearer ${oauthToken}`,
//       'Content-Type': 'application/json',
//       'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
//     }
//   })
//     .then(response => {
//       const itemSummaries = response.data.itemSummaries;
//       const extractedData = itemSummaries.map(item => ({
//         title: item.title,
//         image: item.image.imageUrl,
//         price: '$' + item.price.value
//       }));
//       // res.status(200).json(extractedData);
//     })
//     knex('gift')
//     .insert({ title, price, image })
//     .then(response => {
//       res.status(201).send(`Item ${title} added.`)
//     })
//     .catch(error => {
//       res.status(500).send(`Unable to add item ${title}.`);
//     });
// });




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

// --- DELETE ---

app.delete('/users/remove/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .where('id', id)
    .del()
    .then(deleted => {
      if (deleted) res.status(202).send(`User ${id} deleted.`)
      else res.status(404).send(`User ${id} not found.`)
    })
})

app.listen(port, (req, res) => console.log(`Express server is listening on ${port}.`))