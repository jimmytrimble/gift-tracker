const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 8081;
const oauthToken = `v^1.1#i^1#r^0#p^1#f^0#I^3#t^H4sIAAAAAAAAAOVYf2wTVRxv1226wDYjiGQB0x0QFWn77nrtteda0q5srW5rWbsBM0Le3b1bj7V35e7VUVBcFkMI/CGJzl8oIfyhxggEDAKBoJlBNGqG+IM/hIAEiEYTCcEJEhPv2jG6SQBZE5fYf5r7vu/7vs/n877f9753oK+yav768Po/qs33lG3rA31lZjM5BVRVVjxWYymrqzCBIgfztr65feX9lp8aNJhOZdh2pGUUWUPW1emUrLF5o4/IqjKrQE3SWBmmkcZino0HWltYyg7YjKpghVdShDUS8hFuimE8AuOmXIBjOM6jW+XrMROKj0AiDV3Q7WGcjJP2AqCPa1oWRWQNQxn7CApQtA3QNpJMUIClaNbJ2Ckn3UVYO5GqSYqsu9gB4c/DZfNz1SKst4YKNQ2pWA9C+COBpng0EAktaks0OIpi+Ud0iGOIs9rYp0ZFQNZOmMqiWy+j5b3ZeJbnkaYRDn9hhbFB2cB1MHcBvyC1VyABKTIcolwCR5dGyiZFTUN8axyGRRJsYt6VRTKWcO52iupqcCsRj0ee2vQQkZDV+FuchSlJlJDqIxYFA8sCsRjhj2OUSSK51RaUVJwUYM4Waw/ZvJyXdnpEAG1OKIhOl8s9slAh2ojM41ZqVGRBMkTTrG0KDiIdNRqvDVmkje4UlaNqQMQGomI/alRD0GVsamEXszgpG/uK0roQ1vzj7XdgdDbGqsRlMRqNMH4gL5GPgJmMJBDjB/O5OJI+qzUfkcQ4wzocvb299l6nXVG7HRQApGNpa0ucT6I0JHRfo9YL/tLtJ9ikPBUe6TM1icW5jI5ltZ6rOgC5m/DTXqde6SO6j4XlH2/9h6GIs2NsRZSqQhAFvCLJMR5AiwwQYCkqxD+SpA4DB+L01ExDtQfhTAryyMbreZZNI1USWKdLpPRsRTbB7RVttFcUbZxLcNtIESGAEMfxXs//qVDuNNXjiFcRLkmulyzPE5yrIwjAmjBsDbUFlyYoJaLI3sWd0eQS9ES6Q8BBGrVjMYxjtO9Oq+Gm5BtTkq5MQl+/FAIYtV46EcKKhpEwIXpxXsmgmJKS+Nzk2mCnKsSginNxlErphgmRDGQykdKc1SWj9y+PibvjXbo76j+6n27KSjNSdnKxMuZregCYkezGDWTnlbTDqHUF6u2HYV6RRz0h3pLeuU4q1jrJAltJKLSc9jxdu/YMb1eRpmRVvdu2R40OLKH0IFm/z7CqpFJI7SQnXM/pdBZDLoUmW2GXIMElOMkuW5IhKY+bAQwzIV58/ipdMdmOpFIcxeXNd9lWO8a+5PtN+R/Zbx4E/ebDZWYzaADzyDmgvtLSUW6ZWqdJGNklKNo1qVvW311VZO9BuQyU1LJppkvbB8KNdYuir8xfm8gd23LUNLXoG8O2p8HM0a8MVRZyStEnBzDrxkgFWftgNUUDmiSNFtLJdIE5N0bLyRnl088dXDC0uOm9P03DjMs1e/iFyt2Xh0H1qJPZXGEq7zebVl7c4Q5Frn0R9b27YOEMd9L98asPcw+9LLy97wFw5JNh/6HH+0Ov//b50LRVLbEPL7gfOdMMBltg777Z0WMH3zofOzqd2/7+wg0b93R3np71xvI1nz1aO2X273vMwaHw5U0nwKdXO7vO7T9l2f/cj/dZPdQuZeeltmMz8fGTNa3gA0uNe8nyKxdiA/LgCRfz0snTc5tT6747cLr3nc3ssiPz988r++tNuPujwWu/7hw8/1Tw/P2HX6zZdLa9mupOD6z9uW7g1I4tRz1dF+u/pJv6Nsi13/ywqrFq1ZXauq/2doR/WXPIdKm5YV2/9uS9e63P99RvfG0rf43Z+Gz9gtyuQ98eOH4GfX1169nvhwp7+Te9uQbD/REAAA==`;
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
      .select('users.name', 'wishlist.gifts', 'wishlist.image', 'wishlist.bought')
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

app.patch('/update/:name', (req, res) => {
  const { bought } = req.body;
  const { name } = req.params
  let updates = {};
  if (bought) updates.bought = bought;
  knex('birthday')
    // .join('users', 'wishlist.user_id', '=', 'users.id')
    .first()
    .where('name', name)
    .update(updates)
    .then(response => {
      res.status(201).send(`Bought = ${updates.bought}`)
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

app.delete('/remove/event/:name', (req, res) => {
  const { name } = req.params;
  knex('birthday')
    .where('name', name)
    .first()
    .del()
    .then(deleted => {
      if (deleted) res.status(202).send(`Event ${id} deleted.`)
      else res.status(404).send(`Event ${id} not found.`)
    })
})


app.listen(port, (req, res) => console.log(`Express server is listening on ${port}.`))
