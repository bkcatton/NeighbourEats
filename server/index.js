const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
console.log(`dbParams = ${JSON.stringify(dbParams)}`);
const db = new Pool(dbParams);
db.connect();

//DATABASE QUERIES
const addressRoutes = require("./routes/addresses");
const dishesRoutes = require("./routes/dishes");

//api routes
app.use("/api/addresses", addressRoutes(db));
app.use("/api/dishes", dishesRoutes(db));


// user routes
// 1. users can log in
app.get('/login/:id', (req, res) => {
  const { id } = req.params;

  // set cookie = id
  // redirect to "/"
});

// 2. users can log out
app.get('/logout', (req, res) => {
  // clear cookie
  // redirect to "/"
});

// 3. users can browse all dishes and filter by culture, location, price, type [Google Maps API]
app.get('/browse', (req, res) => {
 
  
});

app.get('/browse/:id', (req, res) => {
 
  
});

// api routes
// users can send a message over text using twilio
// app.use('/api/sendText', sendTextQuery(db));
// app.use('/api/receiveText', sendTextQuery(db));

// set-up
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
