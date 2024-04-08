const express = require('express');
const app = express();
const port = 8081;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.get('/', (req, res) => {
    res.send('testing');
})

// profile information storage
// - let the user replace their photo

// join example
//SELECT b.name, b.birthdate, w.gifts  FROM birthday b JOIN wishlist w ON b.wishlist_id = w.id;

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

app.get('/gifts', (req, res) => {
  knex('gift')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
})
// user may not have to see

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

app.listen(port, (req, res) => console.log(`Express server is listening on ${port}.`))