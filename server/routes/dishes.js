const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/new", (req, res) => {
    const { title, description, price, imageLink, countryStyle, userId } =
      req.body;
    db.query(
      `INSERT INTO dishes (
          title, 
          dish_description, 
          price_cents, 
          image_link, 
          country_style, 
          user_id)
        VALUES ($1, $2, $3, $4, $5, $6);`,
      [title, description, +price, imageLink, countryStyle, +userId]
    ).then((data) => {
      res.json(data.rows[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  });

  router.get("/details/:id", (req, res) => {
    db.query(
      `SELECT *
        FROM dishes
        WHERE id = $1;`,
      [req.params.id]
    )
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  router.get("/information", (req, res) => {
    db.query(
      `SELECT *
      FROM dishes
      JOIN users ON users.id = dishes.user_id
      JOIN addresses ON users.id = addresses.user_id;`
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/reviews", (req, res) => {
    db.query(
      `SELECT *
        FROM reviews;`
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  router.get("/reviews/:id", async (req, res) => {
    try {
      const data = await db.query(
        `SELECT content, star_rating, full_name, reviews.id
          FROM reviews
          JOIN users on reviewer_id = users.id
          WHERE dish_id = $1;`,
        [req.params.id]
      );
      res.json(data.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
