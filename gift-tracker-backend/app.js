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
      .select('birthday.name', 'wishlist.gifts', 'wishlist.image', 'wishlist.bought')
      .join('birthday', 'wishlist.id', '=', 'birthday.wishlist_id')
      .join('users', 'birthday.user_id', '=', 'users.id')
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
  const oauthToken = `v^1.1#i^1#f^0#I^3#r^0#p^1#t^H4sIAAAAAAAAAOVYa2wUVRTebbc1lSIGieiGmGWQR0pmdmZ2ZndnYNfstiW7SNstu63l0eDszJ126O7MOHOXsihSSoQfagKaSiLyEH+oBWKtUX6YSECjwWjCDwNUjfHBSxKQYAyCmnhnupRtJYB0E5u4fzb33HPPPd93zrn3zCV7KqtqNsc2X5nsvKdsTw/ZU+Z0UpPIqsqK+feVl7krHGSRgnNPz6M9rt7ycwtNIZvR+aXA1DXVBJ612Yxq8rYwhOUMldcEUzF5VcgCk4cin4w0LOFpguR1Q4OaqGUwT7wuhMmMkGZlkaR8MhMIUBySqtdtprQQ5udk4OfSgshKHBADLJo3zRyIqyYUVBjCaJJmcJLBKSpFsTzL8RRHIDPLMU8rMExFU5EKQWJh213eXmsU+XprVwXTBAZERrBwPLIo2RSJ19U3phZ6i2yFCzwkoQBz5uhRrSYBT6uQyYFbb2Pa2nwyJ4rANDFveHiH0Ub5yHVn7sJ9m2qaStN0kKY50cekRbokTC7SjKwAb+2GJVEkXLZVeaBCBeZvRygiI70aiLAwakQm4nUe6685J2QUWQFGCKuPRpZFEgksnIRA7wRqAx5VDNgpCXk8sbQO59Ic4wvKpID7BEn2say/sNGwtQLLY3aq1VRJsTgzPY0ajALkNRjLDVPEDVJqUpuMiAwtj4r1AiMcMsutmA4HMQc7VSusIIuI8NjD20dgZDWEhpLOQTBiYeyETVEIE3RdkbCxk3YqFrJnrRnCOiHUea+3u7ub6PYRmtHhpUmS8rY1LEmKnSArYJauVeu2vnL7BbhiQxEBWmkqPMzryJe1KFWRA2oHFmY4n59mC7yPdis8VvoPQRFm7+iCKFWBBFlZ9sk+wNA+2S+QUikqJFxIUq/lB0ij1MwKRheAekYQAS6iPMtlgaFIvI+VaZStAJfQkYcznCzjaVby45QMAAlAOi1ywf9TodxpqieBaABYmlwvVZ6n0mxLlCTXxYSGusZoW4rW4prKNbc2dT4BFmdbJBhlwFIox2CCCd1pNdwUfG1GQcyk0P4lIcCq9ZKRENNMCKRxwUuKmg4SWkYR8xMrwD5DSggGzCdBJoME4wIZ0fV4ic7qUsH7l8fE3eEu4R3139xPN0VlWik7sVBZ601kQNAVwrqBCFHLejWr1gXUfljiVbbX48KtoMZ1QqFGIIfRKtJwy0loFlzCXCMSBjC1nIGabaLJ6sBSWhdQ0X0GDS2TAUYrNe56zmZzUEhnwEQr7BIkuCJMsMuWClB0kKUolhsXLtG+SldNtCOpJEexa9HdtdXe0d/4YYf9o3qdR8he50dlTie5kJxNzSJnVpa3uMqr3aYCAaEIMmEqHSr6dDUA0QXyuqAYZQ84Lu/ti9W665teqXk6lT+24zNHddETw5528qGRR4aqcmpS0YsDOePGTAU1ZfpkmiEZCgWc5VBnSc66MeuiHnRNm/raH3H5x7MDgxuD36jbdq0+enXncXLyiJLTWeFw9Tod691zVn7554XVwdqz8NRbmy71be9/t8p58KCvf8aUz6/E5wVi0ccGHjl79V5mkHvOe3Hw6y9ePXWtuqrj+58u7V5x7rA4+1pz2ZxDT/GzD3Rsvew4/kw0vrl3xfttnsXEvK/21X/c+17/4/rpExvmSD//Esa7Fmwxuv66cCAScF+e9vuSDy/+tqZm7mDti5Ub539X/vL+BQOM+7w/xe9mE9k3hZkbjn7ANZ9vP9S+L/L6yb0vDD25v7+OPtkXHJp6+odvh9xXtfnb47HzW47sdBy8f921xEB0+5n49BPxHdOe3ZFqqanZ6vr0+bdXBg43nGkbcs9dYfS1H/PmPnnp4fXrJ73jylcvk9/4Vdu1aTiWfwN0p+iW/BEAAA==`
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

  const oauthToken = `v^1.1#i^1#f^0#I^3#r^0#p^1#t^H4sIAAAAAAAAAOVYa2wUVRTebbc1lSIGieiGmGWQR0pmdmZ2ZndnYNfstiW7SNstu63l0eDszJ126O7MOHOXsihSSoQfagKaSiLyEH+oBWKtUX6YSECjwWjCDwNUjfHBSxKQYAyCmnhnupRtJYB0E5u4fzb33HPPPd93zrn3zCV7KqtqNsc2X5nsvKdsTw/ZU+Z0UpPIqsqK+feVl7krHGSRgnNPz6M9rt7ycwtNIZvR+aXA1DXVBJ612Yxq8rYwhOUMldcEUzF5VcgCk4cin4w0LOFpguR1Q4OaqGUwT7wuhMmMkGZlkaR8MhMIUBySqtdtprQQ5udk4OfSgshKHBADLJo3zRyIqyYUVBjCaJJmcJLBKSpFsTzL8RRHIDPLMU8rMExFU5EKQWJh213eXmsU+XprVwXTBAZERrBwPLIo2RSJ19U3phZ6i2yFCzwkoQBz5uhRrSYBT6uQyYFbb2Pa2nwyJ4rANDFveHiH0Ub5yHVn7sJ9m2qaStN0kKY50cekRbokTC7SjKwAb+2GJVEkXLZVeaBCBeZvRygiI70aiLAwakQm4nUe6685J2QUWQFGCKuPRpZFEgksnIRA7wRqAx5VDNgpCXk8sbQO59Ic4wvKpID7BEn2say/sNGwtQLLY3aq1VRJsTgzPY0ajALkNRjLDVPEDVJqUpuMiAwtj4r1AiMcMsutmA4HMQc7VSusIIuI8NjD20dgZDWEhpLOQTBiYeyETVEIE3RdkbCxk3YqFrJnrRnCOiHUea+3u7ub6PYRmtHhpUmS8rY1LEmKnSArYJauVeu2vnL7BbhiQxEBWmkqPMzryJe1KFWRA2oHFmY4n59mC7yPdis8VvoPQRFm7+iCKFWBBFlZ9sk+wNA+2S+QUikqJFxIUq/lB0ij1MwKRheAekYQAS6iPMtlgaFIvI+VaZStAJfQkYcznCzjaVby45QMAAlAOi1ywf9TodxpqieBaABYmlwvVZ6n0mxLlCTXxYSGusZoW4rW4prKNbc2dT4BFmdbJBhlwFIox2CCCd1pNdwUfG1GQcyk0P4lIcCq9ZKRENNMCKRxwUuKmg4SWkYR8xMrwD5DSggGzCdBJoME4wIZ0fV4ic7qUsH7l8fE3eEu4R3139xPN0VlWik7sVBZ601kQNAVwrqBCFHLejWr1gXUfljiVbbX48KtoMZ1QqFGIIfRKtJwy0loFlzCXCMSBjC1nIGabaLJ6sBSWhdQ0X0GDS2TAUYrNe56zmZzUEhnwEQr7BIkuCJMsMuWClB0kKUolhsXLtG+SldNtCOpJEexa9HdtdXe0d/4YYf9o3qdR8he50dlTie5kJxNzSJnVpa3uMqr3aYCAaEIMmEqHSr6dDUA0QXyuqAYZQ84Lu/ti9W665teqXk6lT+24zNHddETw5528qGRR4aqcmpS0YsDOePGTAU1ZfpkmiEZCgWc5VBnSc66MeuiHnRNm/raH3H5x7MDgxuD36jbdq0+enXncXLyiJLTWeFw9Tod691zVn7554XVwdqz8NRbmy71be9/t8p58KCvf8aUz6/E5wVi0ccGHjl79V5mkHvOe3Hw6y9ePXWtuqrj+58u7V5x7rA4+1pz2ZxDT/GzD3Rsvew4/kw0vrl3xfttnsXEvK/21X/c+17/4/rpExvmSD//Esa7Fmwxuv66cCAScF+e9vuSDy/+tqZm7mDti5Ub539X/vL+BQOM+7w/xe9mE9k3hZkbjn7ANZ9vP9S+L/L6yb0vDD25v7+OPtkXHJp6+odvh9xXtfnb47HzW47sdBy8f921xEB0+5n49BPxHdOe3ZFqqanZ6vr0+bdXBg43nGkbcs9dYfS1H/PmPnnp4fXrJ73jylcvk9/4Vdu1aTiWfwN0p+iW/BEAAA==`
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
