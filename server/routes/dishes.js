const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/information', (req, res) => {
    db.query(
      `SELECT *
      FROM dishes
      JOIN users ON users.id = dishes.user_id
      JOIN addresses ON users.id = addresses.user_id
      ;`
    )
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get('/reviews', (req, res) => {
    db.query(
      `SELECT *
        FROM reviews;
        ;`
    )
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });

  return router;
};
