const express = require('express');
const router = express.Router();

module.exports = db => {
  router.post('/new', (req, res) => {
    const { title, description, price, servingSize, imageLink, countryStyle, availableStock, userId } = req.body
    db.query(
      `INSERT INTO dishes (
          title, 
          dish_description, 
          price_cents, 
          serving_size, 
          image_link, 
          country_style, 
          available_stock, 
          user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [title, description, price, servingSize, imageLink, countryStyle, availableStock, userId])
      .then(data => {
        db.query(
          `INSERT INTO addresses (
              street_name, 
              street_number, 
              city, 
              state_code, 
              country, 
              postal_code, 
              user_id)
            VALUES ('Church St', 260, 'New York', 'NY', 'USA', 10013, 1);`)
        res.json(data.rows[0]);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });

  router.get('/details/:id', (req, res) => {
    db.query(
      `SELECT *
        FROM dishes
        WHERE id = $1;`, [req.params.id])
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });

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

  router.get('/reviews/:id', async (req, res) => {
    try {
      const data = await db.query(
        `SELECT content, star_rating, full_name, reviews.id
          FROM reviews
          JOIN users on reviewer_id = users.id
          WHERE dish_id = $1
          ;`, [req.params.id]
          );
      res.json(data.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/ratings', (req, res) => {
    db.query(
      `SELECT (ROUND( (AVG(star_rating)), 2)) as average_rating, dishes.id, title, dish_description, price_cents, country_style, user_id
        FROM dishes
        JOIN reviews ON reviews.reviewer_id = dishes.user_id
        GROUP BY dishes.id
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
