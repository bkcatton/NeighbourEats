const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/:id', async (req, res) => {
    try {
      const data = await db.query(
        `SELECT * FROM users
          WHERE users.id = $1
          ;`,
        [req.params.id]
      );
      res.json(data.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
