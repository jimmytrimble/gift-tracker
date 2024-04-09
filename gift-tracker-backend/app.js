const express = require('express');
const app = express();
const port = 8081;
const knex = require("knex")(require("./knexfile.js")["development"]);


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
    // .where('birthday_id', id)
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
    .select('birthday.name', 'wishlist.gifts')
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

app.listen(port, (req, res) => console.log(`Express server is listening on ${port}.`))