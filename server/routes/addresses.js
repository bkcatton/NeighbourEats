const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM addresses;`)
  .then((data) => {
    const addresses = data.rows;
    res.json({ addresses });
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  });
  
    //res.redirect("/");
  });
  return router;
};