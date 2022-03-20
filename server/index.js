const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();

// app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');

const db = new Pool(dbParams);
db.connect();

//DATABASE QUERIES
const dishesRoutes = require('./routes/dishes');
const ordersRoutes = require('./routes/orders');

//api routes
app.use('/api/dishes', dishesRoutes(db));
app.use('/api/orders', ordersRoutes(db));

// api routes
// users can send a message over text using twilio
// app.use('/api/sendText', sendTextQuery(db));
// app.use('/api/receiveText', sendTextQuery(db));

// set-up
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
