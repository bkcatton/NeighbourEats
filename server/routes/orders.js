const express = require('express');
const router = express.Router();

module.exports = db => {
  router.post('/', async (req, res) => {
    try {
      const data = await db.query(
        `INSERT INTO orders(confirmed, customer_id)
        VALUES (false, 1) RETURNING *
          ;`
      );
      res.json(data.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/order_item', async (req, res) => {
    console.log("this is the req body", req.body)
    const { order_id, dish_id, quantity, paid_price_cents } = req.body
    try {
      const order = await db.query(
        `INSERT INTO order_items(order_id, dish_id, quantity, paid_price_cents)
          VALUES ($1, $2, $3, $4) RETURNING *;
        `, [order_id, dish_id, quantity, paid_price_cents]
      );
      // res.json(order.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  return router;
}
